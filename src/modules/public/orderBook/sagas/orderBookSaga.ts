import { API } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import { alertPush, OrderBookDbState } from "../../../";
import { depthData, OrderBookFetch } from "../actions";
import * as queries from "../../../../graphql/queries";

import { getDepthFromOrderbook } from "./helper";

import { fetchAllFromAppSync, sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export function* orderBookSaga(action: OrderBookFetch) {
  try {
    const market = action.payload;
    if (market?.m) {
      const dataRaw = yield call(fetchOrderbook, market.m);
      const data = formatOrderBookData(dataRaw);
      const { asks, bids } = getDepthFromOrderbook(data);
      yield put(depthData({ asks, bids }));
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (orderbook fetch)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
const fetchOrderbook = async (market: string): Promise<OrderBookDbState[]> => {
  const data: OrderBookDbState[] = await fetchAllFromAppSync(
    queries.getOrderbook,
    { market: market },
    "getOrderbook"
  );
  return data;
};

const formatOrderBookData = (data: OrderBookDbState[]): OrderBookDbState[] => {
  return data.map((item) => ({
    ...item,
    p: item.p,
    q: item.q,
  }));
};
