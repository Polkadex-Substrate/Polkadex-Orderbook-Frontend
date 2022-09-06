import { API } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import { PublicTrade, recentTradesData, sendError } from "../../../";
import { recentTradesError, RecentTradesFetch } from "../actions";

import { getRecentTrades } from "@polkadex/orderbook/graphql/queries";
import { Utils } from "@polkadex/web-helpers";
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
      const res: any = yield call(() => fetchRecentTrade(market));
      const trades: PublicTrade[] = res.map((x) => ({
        market_id: x.m,
        price: Utils.decimals.formatToString(x.p),
        amount: Utils.decimals.formatToString(x.q),
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

const fetchRecentTrade = async (market: string, limit = 50) => {
  const res: any = await sendQueryToAppSync(getRecentTrades, { m: market, limit });
  return res.data.getRecentTrades.items;
};
