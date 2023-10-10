// TODO: Improve this provider, The market should come through the query, there shouldn't be redirection based on the market

import { useCallback, useEffect, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "aws-amplify";
import _ from "lodash";
import { useRouter } from "next/router";
import { GraphQLSubscription } from "@aws-amplify/api";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import * as subscriptions from "@orderbook/core/graphql/subscriptions";
import * as queries from "@orderbook/core/graphql/queries";
import { defaultConfig } from "@orderbook/core/config";
import { Websocket_streamsSubscription } from "@orderbook/core/API";
import {
  decimalPlaces,
  convertToTicker,
  isAssetPDEX,
  buildFilterPrice,
} from "@orderbook/core/helpers";
import { sendQueryToAppSync } from "@orderbook/core/helpers/appsync";
import { getAllMarkets } from "@orderbook/core/graphql/queries";
import {
  POLKADEX_ASSET,
  QUERY_KEYS,
  READ_ONLY_TOKEN,
} from "@orderbook/core/constants";

import { useSettingsProvider } from "../settings";
import { IPublicAsset } from "../assetsProvider";

import { setCurrentTicker } from "./actions";
import {
  Market,
  MarketQueryResult,
  MarketsComponent,
  Ticker,
  TickerQueryResult,
} from "./types";
import { initialMarketsState, marketsReducer } from "./reducer";
import * as A from "./actions";
import { Provider } from "./context";

export const MarketsProvider: MarketsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(marketsReducer, initialMarketsState);
  const { list: allAssets } = useAssetsProvider();
  const { onHandleError } = useSettingsProvider();

  const router = useRouter();
  const defaultMarket = router.query.id as string;

  const fetchMarkets = useCallback(
    async (assets: IPublicAsset[]): Promise<Market[]> => {
      const res = await sendQueryToAppSync({ query: getAllMarkets });
      const pairs: MarketQueryResult[] = res.data.getAllMarkets.items;
      const markets = pairs?.map(
        async (pair: MarketQueryResult): Promise<Market> => {
          const [baseAsset, quoteAsset] = pair.market.split("-");
          const { ticker: baseSymbol } = findAsset(assets, baseAsset);
          const { ticker: quoteSymbol } = findAsset(assets, quoteAsset);

          return {
            id: pair.market,
            name: baseSymbol + "/" + quoteSymbol,
            m: pair.market,
            base_ticker: baseSymbol,
            quote_ticker: quoteSymbol,
            baseAssetId: baseAsset,
            quoteAssetId: quoteAsset,
            base_precision: Number(pair.quote_asset_precision),
            quote_precision: Number(pair.quote_asset_precision),
            min_price: Number(pair.min_order_price),
            max_price: Number(pair.max_order_price),
            min_amount: Number(pair.min_order_qty),
            max_amount: Number(pair.max_order_qty),
            tokenTickerName: baseSymbol,
            price_tick_size: Number(pair.price_tick_size),
            qty_step_size: Number(pair.qty_step_size),
          };
        }
      );
      return await Promise.all(markets);
    },
    []
  );

  const onMarketsFetch = async (allAssets: IPublicAsset[]) => {
    if (allAssets.length > 0) {
      const markets = await fetchMarkets(allAssets);
      const validMarkets = markets.filter(
        (market) =>
          !defaultConfig.blockedAssets.some(
            (item) => item === market.baseAssetId
          ) &&
          !defaultConfig.blockedAssets.some(
            (item) => item === market.quoteAssetId
          )
      );
      return validMarkets;
    }
    return [];
  };

  const shouldFetchMarkets = Boolean(allAssets.length > 0);

  const { data: markets, isLoading: isMarketsLoading } = useQuery({
    queryKey: QUERY_KEYS.markets(JSON.stringify(allAssets)),
    enabled: shouldFetchMarkets,
    queryFn: async () => await onMarketsFetch(allAssets),
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
  });

  const shouldFetchTickers = Boolean(markets && markets?.length > 0);

  const { data: tickers, isLoading: isTickersLoading } = useQuery({
    queryKey: QUERY_KEYS.tickers(),
    enabled: shouldFetchTickers,
    queryFn: async () => await onMarketTickersFetch1(),
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
    onSettled: (data) => {
      if (markets?.length && defaultMarket) {
        const findMarket = markets?.find((v) =>
          v.name
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
            .includes(defaultMarket.toLowerCase())
        );
        const defaultMarketSelected = findMarket ?? markets[0];
        const currentTickerSelected = data?.find(
          (x) => x.m === defaultMarketSelected.m
        );
        onSetCurrentMarketIfUnset(defaultMarketSelected, currentTickerSelected);
      }
    },
  });

  const onMarketTickersFetch1 = async () => {
    if (!markets || markets?.length === 0) return [];

    const tickersPromises = markets.map((m) => fetchMarketTickers(m));
    return await Promise.all(tickersPromises);
  };

  const filters =
    markets?.reduce((result, market: Market) => {
      result[market.id] = result[market.id] || [];

      if (market.filters) {
        result[market.id] = market.filters.map(buildFilterPrice);
      }

      return result;
    }, {}) ?? {};

  const findAsset = (
    assets: IPublicAsset[],
    id: string
  ): { name: string; ticker: string; assetId: string } => {
    if (isAssetPDEX(id)) {
      const { name, symbol, assetId } = POLKADEX_ASSET;
      return { name, ticker: symbol, assetId };
    }
    const asset = assets?.find(({ assetId }) => assetId === id);
    if (asset?.name && asset?.symbol && asset?.assetId)
      return {
        name: asset.name,
        ticker: asset.symbol,
        assetId: asset.assetId,
      };
    else throw new Error(`cannot find asset id: ${id}`);
  };

  const fetchMarketTickers = useCallback(
    async ({
      m: market,
      price_tick_size: priceTickSize,
      qty_step_size: qtyStepSize,
    }: Market): Promise<Ticker> => {
      // TODO: check sendQueryToAppSync market variable
      const to = new Date().toISOString();
      // tickers are fetched for the last 24 hours
      const from = new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toISOString();
      const res = await sendQueryToAppSync({
        query: queries.getMarketTickers,
        variables: { market, from, to },
      });
      const item: TickerQueryResult = res.data.getMarketTickers.items;
      const priceChange = Number(item.c) - Number(item.o);
      const priceChangePercent = (priceChange / Number(item.o)) * 100;

      const pricePrecision = decimalPlaces(priceTickSize);
      const quotePrecision = decimalPlaces(qtyStepSize);

      return {
        m: market,
        priceChange24Hr: _.round(priceChange, pricePrecision),
        priceChangePercent24Hr: _.round(
          isNaN(priceChangePercent) ? 0 : priceChangePercent,
          pricePrecision
        ),
        open: _.round(Number(item.o), pricePrecision),
        close: _.round(Number(item.c), pricePrecision),
        high: _.round(Number(item.h), pricePrecision),
        low: _.round(Number(item.l), pricePrecision),
        volumeBase24hr: _.round(
          isNaN(Number(item.vb)) ? 0 : Number(item.vb),
          quotePrecision
        ),
        volumeQuote24Hr: _.round(Number(item.vq), quotePrecision),
      };
    },
    []
  );

  useEffect(() => {
    if (!state?.currentMarket?.m) {
      return;
    }
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: subscriptions.websocket_streams,
      variables: { name: state.currentMarket.m + "-ticker" },
      authToken: READ_ONLY_TOKEN,
    }).subscribe({
      next: (data) => {
        if (
          data?.value?.data?.websocket_streams?.data &&
          state?.currentMarket?.m
        ) {
          const dataParsed: TickerQueryResult = JSON.parse(
            data.value.data.websocket_streams.data
          );

          const tickerData: Ticker = convertToTicker(
            dataParsed,
            state.currentMarket.m
          );
          dispatch(A.marketsTickersChannelData(tickerData));
        }
      },
      error: (err) => {
        console.warn(err);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [state?.currentMarket?.m]);

  const setCurrentMarket = (market: Market) => {
    dispatch(A.setCurrentMarket(market));
  };

  const onSetCurrentMarketIfUnset = (market: Market, ticker?: Ticker) => {
    dispatch(A.setCurrentMarketIfUnset({ market, ticker }));
  };

  // set current ticker on market change
  useEffect(() => {
    if (
      !state?.currentMarket?.m ||
      !state?.tickers ||
      state?.tickers.length === 0
    ) {
      return;
    }
    dispatch(setCurrentTicker(state.currentMarket.m));
  }, [state?.currentMarket?.m, state?.tickers]);

  return (
    <Provider
      value={{
        ...state,

        /** Markets **/
        list: markets ?? [],
        loading: isMarketsLoading,
        filters,
        timestamp: Math.floor(Date.now() / 1000),

        /** Tickers **/
        tickers: tickers ?? [],
        tickerLoading: isTickersLoading,
        tickersTimestamp: Math.floor(Date.now() / 1000),

        setCurrentMarket,
      }}
    >
      {children}
    </Provider>
  );
};
