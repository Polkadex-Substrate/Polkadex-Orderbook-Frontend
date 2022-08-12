import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { UserTrade, userTradesData, userTradesError } from "..";
import * as queries from "../../../../graphql/queries";

import {
  selectCurrentTradeAccount,
  selectUserInfo,
  selectUserSession,
  sendError,
  UserSessionPayload,
} from "@polkadex/orderbook-modules";

type TradesQueryResult = {
  m: string;
  p: string;
  q: string;
  s: string;
  t: string;
};

export function* fetchTradesSaga() {
  try {
    const { address } = yield select(selectCurrentTradeAccount);
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
  dateFrom: string,
  dateTo: string
): Promise<UserTrade[]> => {
  const res: any = await API.graphql({
    query: queries.listTradesByMainAccount,
    variables: {
      main_account: proxy_account,
      from: dateFrom,
      to: dateTo,
    },
  });
  const tradesRaw: TradesQueryResult[] = res.data.listTradesByMainAccount.items;
  const trades: UserTrade[] = tradesRaw.map((trade) => ({
    market_id: trade.m,
    price: trade.p,
    qty: trade.q,
    side: trade.s,
    timestamp: new Date(trade.t).getTime(),
    baseAsset: trade.m.split("-")[0],
    quoteAsset: trade.m.split("-")[1],
  }));
  return trades;
};
