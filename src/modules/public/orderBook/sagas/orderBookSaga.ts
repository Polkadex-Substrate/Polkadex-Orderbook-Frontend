import { API } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import { alertPush, OrderBookDbState } from "../../../";
import { depthData, orderBookData, orderBookError, OrderBookFetch } from "../actions";
import * as queries from "../../../../graphql/queries";

import { getDepthFromOrderbook } from "./helper";

export function* orderBookSaga(action: OrderBookFetch) {
  try {
    const market = action.payload;
    if (market?.m) {
      const data = yield call(fetchOrderbook, market.m);
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
  const res: any = await API.graphql({
    query: queries.getOrderbook,
    variables: { market: market },
  });
  const data = res.data.getOrderbook.items;
  return data;
};
