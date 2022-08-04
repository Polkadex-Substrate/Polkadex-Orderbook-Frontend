import { API } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import { PublicTrade, recentTradesData, sendError } from "../../../";
import { recentTradesError, RecentTradesFetch } from "../actions";

import { getRecentTrades } from "@polkadex/orderbook/graphql/queries";

export function* recentTradesFetchSaga(action: RecentTradesFetch) {
  try {
    const market = action.payload?.m;
    if (market) {
      const res: any = yield call(() => fetchRecentTrade(market));
      const trades: PublicTrade[] = res.map((x) => ({
        market_id: x.m,
        price: x.p,
        amount: x.q,
        timestamp: x.t,
      }));
      yield put(recentTradesData(trades));
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: recentTradesError,
        },
      })
    );
  }
}

const fetchRecentTrade = async (market: string, limit = 50) => {
  const res: any = await API.graphql({
    query: getRecentTrades,
    variables: { m: market, limit },
  });
  return res.data.getRecentTrades.items;
};
