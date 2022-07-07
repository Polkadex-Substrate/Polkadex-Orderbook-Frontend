import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { UserTrade, userTradesData, userTradesError } from "..";
import * as queries from "../../../../graphql/queries";

import {
  selectUserInfo,
  selectUserSession,
  sendError,
  UserSessionPayload,
} from "@polkadex/orderbook-modules";

export function* fetchTradesSaga() {
  try {
    const { address } = yield select(selectUserInfo);
    if (address) {
      const userSession: UserSessionPayload = yield select(selectUserSession);
      const { dateFrom, dateTo } = userSession;
      const tradesRaw = yield call(fetchUserTrades, address, dateFrom, dateTo);
      const trades: UserTrade[] = tradesRaw.map((trade) => ({
        market_id: trade.m,
        price: trade.p,
        qty: trade.q,
        side: trade.s,
        timestamp: new Date(trade.time).getTime(),
        baseAsset: trade.m.split("-")[0],
        quoteAsset: trade.m.split("-")[1],
      }));
      yield put(userTradesData(trades));
    }
  } catch (error) {
    console.log(error);
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

type TradesDb = {
  main_account: string;
  m: string;
  p: string;
  q: string;
  time: string;
};

const fetchUserTrades = async (
  proxy_account: string,
  dateFrom: string,
  dateTo: string
): Promise<TradesDb> => {
  const res: any = await API.graphql({
    query: queries.listTradesByMainAccount,
    variables: {
      main_account: proxy_account,
      from: dateFrom,
      to: dateTo,
    },
  });

  return res.data.listTradesByMainAccount.items;
};
