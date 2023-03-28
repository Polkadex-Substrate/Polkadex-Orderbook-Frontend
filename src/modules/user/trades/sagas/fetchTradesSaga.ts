import { call, put, select } from "redux-saga/effects";

import { UserTrade, userTradesData, userTradesError } from "..";
import * as queries from "../../../../graphql/queries";

import {
  selectUserSession,
  sendError,
  UserSessionPayload,
} from "@polkadex/orderbook-modules";
import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

type TradesQueryResult = {
  m: string;
  p: string;
  q: string;
  s: string;
  t: string;
};

export function* fetchTradesSaga() {
  try {
    const profileState = useProfile();
    const currAccount = profileState.selectedAccount;
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
