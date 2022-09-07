import { put } from "redux-saga/effects";

import {
  UserTrade,
  UserTradeEvent,
  userTradesUpdateData,
  UserTradesUpdateEvent,
} from "../actions";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";
import { Utils } from "@polkadex/web-helpers";

export function* userTradeUpdateSaga(action: UserTradesUpdateEvent) {
  try {
    const trade = processTradeData(action.payload);
    yield put(userTradesUpdateData(trade));
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (order updates channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

function processTradeData(eventData: UserTradeEvent): UserTrade {
  const [base, quote] = eventData.m.split("-");
  return {
    market_id: eventData.m,
    price: eventData.p,
    qty: eventData.q,
    baseAsset: base,
    quoteAsset: quote,
    timestamp: eventData.t,
    side: "Bid",
  };
}
