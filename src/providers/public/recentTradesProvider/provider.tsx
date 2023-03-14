import { ApiPromise, ApiRx } from "@polkadot/api";
import { useCallback, useEffect, useReducer } from "react";

import * as A from "./actions";
import { Provider } from "./context";
import { recentTradesReducer, initialState } from "./reducer";
import * as T from "./types";
import { getRecentTrades } from "@polkadex/orderbook/graphql/queries";
import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import { PublicTrade } from "./types";
import { Market } from "@polkadex/orderbook-modules";
import { API } from "aws-amplify";
import * as subscriptions from "../../../graphql/subscriptions";
import { READ_ONLY_TOKEN } from "@polkadex/web-constants";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectCurrentMarket } from "@polkadex/orderbook-modules";
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
  const fetchRecentTrade = async (market: string, limit = 50): Promise<RawTrades[]> => {
    const res = await fetchAllFromAppSync(
      getRecentTrades,
      { m: market, limit },
      "getRecentTrades"
    );
    return res;
  };

  const market = useReduxSelector(selectCurrentMarket);

  useEffect(() => {
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: `${market?.m}-recent-trades` },
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
  }, [market?.m]);

  useEffect(() => {
    const recentTradesFetch = async (market: Market) => {
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
    };

    recentTradesFetch(market);
  }, [market?.m]);

  return (
    <Provider
      value={{
        ...state,
      }}>
      {children}
    </Provider>
  );
};
