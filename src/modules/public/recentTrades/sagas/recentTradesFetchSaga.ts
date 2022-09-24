import { call, put } from "redux-saga/effects";

import { PublicTrade, recentTradesData, sendError } from "../../../";
import { recentTradesError, RecentTradesFetch } from "../actions";

import { getRecentTrades } from "@polkadex/orderbook/graphql/queries";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

type RawTrades = {
  m: string;
  p: string;
  q: string;
  t: string;
};
export function* recentTradesFetchSaga(action: RecentTradesFetch) {
  try {
    const market = action.payload?.m;
    if (market) {
      const res: RawTrades[] = yield call(() => fetchRecentTrade(market));
      const trades: PublicTrade[] = res.map((x) => ({
        market_id: x.m,
        price: x.p,
        amount: x.q,
        timestamp: new Date(Number(x.t)).toISOString(),
      }));
      yield put(recentTradesData(trades));
    }
  } catch (error) {
    console.log("recent trades", error);
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

const fetchRecentTrade = async (market: string, limit = 50): Promise<RawTrades[]> => {
  const res: any = await sendQueryToAppSync(getRecentTrades, { m: market, limit });
  return res.data.getRecentTrades.items;
};
