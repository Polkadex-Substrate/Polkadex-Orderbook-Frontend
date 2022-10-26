import { call, put, select } from "redux-saga/effects";

import { UserTrade, userTradesData, userTradesError } from "..";
import * as queries from "../../../../graphql/queries";

import {
  selectUserSession,
  selectUsingAccount,
  sendError,
  UserSessionPayload,
} from "@polkadex/orderbook-modules";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

type TradesQueryResult = {
  m: string;
  p: string;
  q: string;
  s: string;
  t: string;
};

export function* fetchTradesSaga() {
  try {
    const currAccount = yield select(selectUsingAccount);
    const address = currAccount.tradeAddress;
    if (address) {
      const userSession: UserSessionPayload = yield select(selectUserSession);
      const { dateFrom, dateTo } = userSession;
      const trades = yield call(fetchUserTrades, address, dateFrom, dateTo);
      yield put(userTradesData(trades));
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
  const res: any = await sendQueryToAppSync({
    query: queries.listTradesByMainAccount,
    variables: {
      main_account: proxy_account,
      from: dateFrom.toISOString(),
      to: dateTo.toISOString(),
      limit: 1000,
    },
  });
  const tradesRaw: TradesQueryResult[] = res.data.listTradesByMainAccount.items;
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
