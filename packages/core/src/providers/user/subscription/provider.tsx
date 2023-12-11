import _ from "lodash";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import {
  PublicTrade,
  appsyncOrderbookService,
  Order,
  MaybePaginated,
  PriceLevel,
  Trade,
  Transaction,
  Ticker,
  Balance,
} from "@orderbook/core/utils/orderbookService";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@orderbook/core/constants";
import { useOrderbookService } from "@orderbook/core/providers/public/orderbookServiceProvider/useOrderbookService";
import {
  decimalPlaces,
  deleteFromBook,
  fetchOnChainBalance,
  getCurrentMarket,
  replaceOrAddToBook,
} from "@orderbook/core/helpers";
import {
  removeOrderFromList,
  replaceOrPushOrder,
} from "@orderbook/core/utils/orderbookService/appsync_v1/helpers";
import { useOrderbook } from "@orderbook/core/hooks";

import { useProfile } from "../profile";
import { useSettingsProvider } from "../../public/settings";
import { useSessionProvider } from "../sessionProvider";
import { useNativeApi } from "../../public/nativeApi";

import { Provider } from "./context";
import * as T from "./types";

export const SubscriptionProvider: T.SubscriptionComponent = ({ children }) => {
  const queryClient = useQueryClient();
  const path = usePathname();
  const router = useRouter();
  const { onHandleError } = useSettingsProvider();
  const { isReady, markets, assets } = useOrderbookService();
  const { dateFrom, dateTo } = useSessionProvider();
  const {
    selectedAccount: { tradeAddress, mainAddress },
  } = useProfile();
  const { api } = useNativeApi();

  const isTradingPage = path.startsWith("/trading");
  const marketName = isTradingPage ? (router.query.id as string) : null;
  const market = getCurrentMarket(markets, marketName)?.id;

  const { asks, bids } = useOrderbook(market as string);

  const onOrderUpdates = useCallback(
    (payload: Order) => {
      try {
        // Update OpenOrders Realtime
        queryClient.setQueryData(
          QUERY_KEYS.openOrders(tradeAddress),
          (oldOpenOrders: Order[]) => {
            const prevOpenOrders = [...oldOpenOrders];

            let updatedOpenOrders: Order[] = [];
            if (payload.status === "OPEN") {
              updatedOpenOrders = replaceOrPushOrder(prevOpenOrders, payload);
            } else {
              // Remove from Open Orders if it is closed
              updatedOpenOrders = removeOrderFromList(prevOpenOrders, payload);
            }
            return updatedOpenOrders;
          }
        );

        // Update OrderHistory Realtime
        queryClient.setQueryData(
          QUERY_KEYS.orderHistory(dateFrom, dateTo, tradeAddress),
          (
            oldOrderHistory: InfiniteData<MaybePaginated<Order[]>> | undefined
          ) => {
            const prevOrderHistory = [
              ...(oldOrderHistory?.pages.flatMap((page) => page.data) ?? []),
            ];
            const oldOrderHistoryLength = oldOrderHistory
              ? oldOrderHistory?.pages.length
              : 0;

            const nextToken =
              oldOrderHistory?.pages?.at(oldOrderHistoryLength - 1)
                ?.nextToken || null;

            // Add to OrderHistory for all cases
            const updatedOrderHistory = replaceOrPushOrder(
              prevOrderHistory,
              payload
            );

            const newOrderHistory = {
              pages: [
                {
                  data: [...updatedOrderHistory],
                  nextToken,
                },
              ],
              pageParams: [...(oldOrderHistory?.pageParams ?? [])],
            };

            return newOrderHistory;
          }
        );
      } catch (error) {
        onHandleError(`Order updates channel ${error?.message ?? error}`);
      }
    },
    [dateFrom, dateTo, onHandleError, queryClient, tradeAddress]
  );

  const onRecentTradeUpdates = useCallback(
    (trade: PublicTrade) => {
      if (market) {
        queryClient.setQueryData(QUERY_KEYS.recentTrades(market), (oldData) => {
          const oldRecentTrades = oldData as PublicTrade[];
          return [trade, ...oldRecentTrades];
        });
      }
    },
    [market, queryClient]
  );

  const onOrderbookUpdates = useCallback(
    (payload: PriceLevel[]) => {
      if (!market) return;

      let book = {
        ask: [...asks],
        bid: [...bids],
      };

      const incrementalData = payload;
      incrementalData.forEach((item) => {
        if (Number(item.qty) === 0) {
          book = deleteFromBook(
            book,
            String(item.price),
            item.side.toLowerCase()
          );
        } else
          book = replaceOrAddToBook(
            book,
            String(item.price),
            String(item.qty),
            item.side.toLowerCase()
          );
      });

      queryClient.setQueryData(QUERY_KEYS.orderBook(market), () => {
        const newData = {
          asks: _.cloneDeep(book.ask),
          bids: _.cloneDeep(book.bid),
        };
        return newData;
      });
    },
    [asks, bids, market, queryClient]
  );

  const onUserTradeUpdate = useCallback(
    (trade: Trade) => {
      try {
        queryClient.setQueryData(
          QUERY_KEYS.tradeHistory(dateFrom, dateTo, tradeAddress),
          (
            oldTradeHistory: InfiniteData<MaybePaginated<Trade[]>> | undefined
          ) => {
            const payload = {
              data: [trade],
              nextToken: null,
            };
            return {
              pages: [payload, ...(oldTradeHistory?.pages ?? [])],
              pageParams: [...(oldTradeHistory?.pageParams ?? [])],
            };
          }
        );
      } catch (error) {
        onHandleError(`User trades channel error: ${error?.message ?? error}`);
      }
    },
    [dateFrom, dateTo, onHandleError, queryClient, tradeAddress]
  );

  const onTransactionsUpdate = useCallback(
    (payload: Transaction) => {
      try {
        if (payload) {
          queryClient.setQueryData(
            QUERY_KEYS.transactions(mainAddress),
            (oldData: MaybePaginated<Transaction[]> | undefined) => {
              const transactions = _.cloneDeep(oldData?.data as Transaction[]);
              const index = transactions.findIndex(
                ({ stid }) => Number(stid) === Number(payload.stid)
              );
              if (index !== -1) {
                transactions[index] = payload;
              } else {
                transactions.push(payload);
              }
              return { data: transactions, nextToken: null };
            }
          );
        }
      } catch (error) {
        onHandleError("Something has gone wrong while updating transactions");
      }
    },
    [mainAddress, onHandleError, queryClient]
  );

  const onTickerUpdates = useCallback(
    (ticker: Ticker) => {
      queryClient.setQueryData(QUERY_KEYS.tickers(), (prevData: Ticker[]) => {
        const newTickers = [...prevData];
        const idx = newTickers?.findIndex((x) => x.market === ticker.market);

        const priceChange = Number(ticker.close) - Number(ticker.open);
        const priceChangePercent = (priceChange / Number(ticker.open)) * 100;
        const market = markets?.find((market) => market.id === ticker.market);
        const pricePrecision = decimalPlaces(market?.price_tick_size || 0);

        const priceChange24Hr = _.round(priceChange, pricePrecision);
        const priceChangePercent24Hr = _.round(
          isNaN(priceChangePercent) ? 0 : priceChangePercent,
          pricePrecision
        );

        const newTickersData = {
          ...ticker,
          priceChange24Hr,
          priceChangePercent24Hr,
        };

        if (idx < 0) newTickers.push(newTickersData);
        else newTickers[idx] = newTickersData;
        return newTickers;
      });
    },
    [markets, queryClient]
  );

  const updateBalanceFromEvent = useCallback(
    async (msg: Balance) => {
      const assetId = msg.asset.id;

      const payload = {
        name: msg?.asset?.name || "",
        symbol: msg?.asset?.ticker || "",
        assetId: assetId.toString(),
        free_balance: msg.free,
        reserved_balance: msg.reserved,
      };

      if (!api) return { ...payload, onChainBalance: "0" };

      const onChainBalance = await fetchOnChainBalance(
        api,
        assetId,
        mainAddress
      );
      return { ...payload, onChainBalance: onChainBalance.toString() };
    },
    [api, mainAddress]
  );

  const onBalanceUpdate = useCallback(
    async (payload: Balance) => {
      try {
        const assetIds = assets.map((a) => a.id);
        const { onChainBalance, ...updateBalance } =
          await updateBalanceFromEvent(payload);

        // Update trading account balance
        queryClient.setQueryData(
          QUERY_KEYS.tradingBalances(mainAddress),
          (oldData): Balance[] => {
            const prevData = [...(oldData as Balance[])];
            const old = prevData.find(
              (i) => i.asset.id.toString() === updateBalance.assetId.toString()
            );
            if (!old) {
              return prevData;
            }
            const newBalance: Balance = {
              asset: {
                decimal: 8,
                id: updateBalance.assetId,
                name: updateBalance.name,
                ticker: updateBalance.symbol,
              },
              free: updateBalance.free_balance,
              reserved: updateBalance.reserved_balance,
            };

            // Filter out old balances from the balance state
            const balanceFiltered = prevData?.filter(
              (balance) =>
                balance.asset.id.toString() !== updateBalance.assetId.toString()
            );

            // Apply updates to the balances in the state
            return [...balanceFiltered, newBalance];
          }
        );

        // Update chain balance
        queryClient.setQueryData(
          QUERY_KEYS.onChainBalances(mainAddress, assetIds),
          (prevData) => {
            const oldData = new Map(prevData as Map<string, number>);
            oldData.set(updateBalance.assetId, Number(onChainBalance));
            return oldData;
          }
        );
      } catch (error) {
        onHandleError("Something has gone wrong while updating balance");
      }
    },
    [assets, mainAddress, onHandleError, queryClient, updateBalanceFromEvent]
  );

  // Recent Trades subscription
  useEffect(() => {
    if (!isReady || !market) return;

    const subscription =
      appsyncOrderbookService.subscriber.subscribeLatestTrades(
        market,
        onRecentTradeUpdates
      );

    return () => subscription.unsubscribe();
  }, [isReady, market, onRecentTradeUpdates]);

  // Orderbook subscription
  useEffect(() => {
    if (!market || !isReady) return;

    const subscription = appsyncOrderbookService.subscriber.subscribeOrderbook(
      market,
      onOrderbookUpdates
    );
    return () => subscription.unsubscribe();
  }, [isReady, market, onOrderbookUpdates, queryClient]);

  // Open Orders & Order history subscription
  useEffect(() => {
    if (tradeAddress?.length && isReady) {
      const subscription = appsyncOrderbookService.subscriber.subscribeOrders(
        tradeAddress,
        onOrderUpdates
      );

      return () => subscription.unsubscribe();
    }
  }, [tradeAddress, onOrderUpdates, isReady]);

  // Trade history subscription
  useEffect(() => {
    if (tradeAddress?.length && isReady) {
      const subscription =
        appsyncOrderbookService.subscriber.subscribeUserTrades(
          tradeAddress,
          onUserTradeUpdate
        );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [tradeAddress, isReady, onUserTradeUpdate]);

  // Transactions subscription
  useEffect(() => {
    if (mainAddress && isReady) {
      const subscription =
        appsyncOrderbookService.subscriber.subscribeTransactions(
          mainAddress,
          onTransactionsUpdate
        );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [mainAddress, onTransactionsUpdate, isReady]);

  // Tickers subscription
  useEffect(() => {
    if (!market || !isReady) return;

    const subscription = appsyncOrderbookService.subscriber.subscribeTicker(
      market,
      onTickerUpdates
    );

    return () => subscription.unsubscribe();
  }, [queryClient, markets, isReady, market, onTickerUpdates]);

  // Balances subscription
  useEffect(() => {
    if (mainAddress && isReady) {
      const subscription = appsyncOrderbookService.subscriber.subscribeBalances(
        mainAddress,
        onBalanceUpdate
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [mainAddress, onBalanceUpdate, isReady]);

  return <Provider value={{}}>{children}</Provider>;
};
