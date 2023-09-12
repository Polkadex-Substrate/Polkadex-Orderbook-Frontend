import { useCallback, useEffect, useReducer } from "react";
import { API } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";

import { useMarketsProvider, Market } from "../marketsProvider";
import { useSettingsProvider } from "../settings";

import * as A from "./actions";
import { Provider } from "./context";
import { recentTradesReducer, initialState } from "./reducer";
import * as T from "./types";
import { PublicTrade } from "./types";

import * as subscriptions from "@/graphql/subscriptions";
import { getRecentTrades } from "@/graphql/queries";
import {
  fetchFromAppSync,
  decimalPlaces,
  getIsDecreasingArray,
} from "@/helpers";
import { READ_ONLY_TOKEN } from "@/constants";
import { Websocket_streamsSubscription } from "@/API";

export const RecentTradesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recentTradesReducer, initialState);

  const { onHandleError } = useSettingsProvider();

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
    async (market: string, limit = 30): Promise<RawTrades[]> => {
      const { response: res } = await fetchFromAppSync(
        getRecentTrades,
        { m: market, limit },
        "getRecentTrades",
      );
      return res;
    },
    [],
  );

  const { currentMarket } = useMarketsProvider();

  useEffect(() => {
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: subscriptions.websocket_streams,
      variables: { name: `${currentMarket?.m}-recent-trades` },
      authToken: READ_ONLY_TOKEN,
    }).subscribe({
      next: (data) => {
        const val: RawTradeEvent = JSON.parse(
          data.value.data.websocket_streams.data,
        );
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
      return subscription.unsubscribe();
    };
  }, [currentMarket?.m]);

  const recentTradesFetch = useCallback(
    async (market: Market) => {
      dispatch(A.recentTradesFetch(market));
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
        onHandleError(error?.message ?? error);
        dispatch(A.recentTradesError(error));
      }
    },
    [fetchRecentTrade, onHandleError],
  );

  useEffect(() => {
    recentTradesFetch(currentMarket);
  }, [currentMarket?.m, recentTradesFetch, currentMarket]);

  const isDecreasing = getIsDecreasingArray(state.list);

  const getCurrentTradePrice = (): string => {
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
        pricePrecision: decimalPlaces(currentMarket?.price_tick_size),
        amountPrecision: decimalPlaces(currentMarket?.qty_step_size),
        getCurrentTradePrice,
        getLastTradePrice,
      }}
    >
      {children}
    </Provider>
  );
};
