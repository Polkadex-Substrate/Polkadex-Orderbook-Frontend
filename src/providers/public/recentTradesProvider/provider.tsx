import { useCallback, useEffect, useReducer } from "react";
import { API } from "aws-amplify";

import * as subscriptions from "../../../graphql/subscriptions";
import { useMarketsProvider } from "../marketsProvider/useMarketsProvider";
import { Market } from "../marketsProvider";

import * as A from "./actions";
import { Provider } from "./context";
import { recentTradesReducer, initialState } from "./reducer";
import * as T from "./types";
import { PublicTrade } from "./types";

import { getRecentTrades } from "@polkadex/orderbook/graphql/queries";
import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import { READ_ONLY_TOKEN } from "@polkadex/web-constants";
import { getIsDecreasingArray } from "@polkadex/web-helpers";

export const RecentTradesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recentTradesReducer, initialState);

  type RawTrades = {
    m: string;
    p: string;
    q: string;
    t: string;
  };
  type RawTradeEvent = {
    m: string;
    p: string;
    q: string;
    t: number;
  };
  const fetchRecentTrade = useCallback(
    async (market: string, limit = 50): Promise<RawTrades[]> => {
      const res = await fetchAllFromAppSync(
        getRecentTrades,
        { m: market, limit },
        "getRecentTrades"
      );
      return res;
    },
    []
  );

  const { currentMarket } = useMarketsProvider();

  useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: `${currentMarket?.m}-recent-trades` },
      authToken: READ_ONLY_TOKEN,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        const val: RawTradeEvent = JSON.parse(data.value.data.websocket_streams.data);
        const trade: PublicTrade = {
          price: val.p,
          amount: val.q,
          market_id: val.m,
          timestamp: Number(val.t),
        };

        dispatch(A.recentTradesPush(trade));
      },
      error: (err) => console.warn(err),
    });

    return () => {
      return subscription.unsubscribe;
    };
  }, [currentMarket?.m]);

  const recentTradesFetch = useCallback(
    async (market: Market) => {
      try {
        if (market) {
          const res = await fetchRecentTrade(market.m);
          const trades: T.PublicTrade[] = res.map((x) => ({
            market_id: market.m,
            price: x.p,
            amount: x.q,
            timestamp: Number(x.t),
          }));
          dispatch(A.recentTradesData(trades));
        }
      } catch (error) {
        dispatch(A.recentTradesError(error));
      }
    },
    [fetchRecentTrade]
  );

  useEffect(() => {
    recentTradesFetch(currentMarket);
  }, [currentMarket?.m, recentTradesFetch, currentMarket]);

  const isDecreasing = getIsDecreasingArray(state.list);

  const getCurrentTradePrice = () => {
    return state.list.length > 0 ? state.list[0].price : "0";
  };

  const getLastTradePrice = () => {
    return state.list.length > 1 ? state.list[1].price : "0";
  };

  return (
    <Provider
      value={{
        ...state,
        recentTradesFetch,
        isDecreasing,
        quoteUnit: currentMarket?.quote_ticker,
        baseUnit: currentMarket?.base_ticker,
        pricePrecision: currentMarket?.quote_precision,
        amountPrecision: currentMarket?.base_precision,
        getCurrentTradePrice,
        getLastTradePrice,
      }}>
      {children}
    </Provider>
  );
};
