import { call, put } from "redux-saga/effects";

import { UserTrade, userTradesData, userTradesError, UserTradesFetch } from "..";
import * as queries from "../../../../graphql/queries";

import { sendError } from "@polkadex/orderbook-modules";
import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";

type TradesQueryResult = {
  m: string;
  p: string;
  q: string;
  s: string;
  t: string;
};

export function* fetchTradesSaga(action: UserTradesFetch) {
  try {
    const { tradeAddress, dateFrom, dateTo } = action.payload;
    if (tradeAddress) {
      const trades = yield call(fetchUserTrades, tradeAddress, dateFrom, dateTo);
      yield put(userTradesData({ trades, tradeAddress }));
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userTradesError,
        },
      })
    );
  }
}

const fetchUserTrades = async (
  proxy_account: string,
  dateFrom: Date,
  dateTo: Date
): Promise<UserTrade[]> => {
  // TODO: make limit resonable by utilizing nextToken
  const tradesRaw: TradesQueryResult[] = await fetchAllFromAppSync(
    queries.listTradesByMainAccount,
    {
      main_account: proxy_account,
      from: dateFrom.toISOString(),
      to: dateTo.toISOString(),
      limit: 100,
    },
    "listTradesByMainAccount"
  );
  const trades: UserTrade[] = tradesRaw.map((trade) => ({
    market_id: trade.m,
    price: trade.p,
    qty: trade.q,
    side: trade.s,
    timestamp: Number(trade.t),
    baseAsset: trade.m.split("-")[0],
    quoteAsset: trade.m.split("-")[1],
  }));
  return trades;
};
