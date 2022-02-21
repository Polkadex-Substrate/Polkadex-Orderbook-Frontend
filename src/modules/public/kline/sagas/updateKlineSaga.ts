import { put, select } from "redux-saga/effects";

import {
  KlineError,
  KlineEvent,
  klinePush,
  KlineState,
  KlineUpdateFetch,
  selectKline,
} from "..";
import { alertPush } from "../../alertHandler";
import { PublicTradeEvent } from "../../recentTrades";

export function* updateKlineSaga(action: KlineUpdateFetch) {
  try {
    const tradeEvent = action.payload;
    const currKline: KlineState = yield select(selectKline);
    if (currKline.last === undefined) {
      console.log("last kline undefined");
      return;
    }
    if (tradeEvent.timestamp < currKline.last.time) {
      console.log("queue lagging", new Date(tradeEvent.timestamp).toLocaleTimeString());
      return;
    }
    const coeff = currKline.period ? Number(currKline.period) * 60 : 5 * 60;
    const lastBarSec = currKline.last.time / 1000;
    const ts = tradeEvent.timestamp / 1000;
    const rounded = Math.floor(ts / coeff) * coeff;
    if (rounded > lastBarSec) {
      // create a new candle, use current price as open **PERSONAL CHOICE**
      yield put(klinePush({ kline: createNewCandle(tradeEvent, rounded) }));
      return;
    }
    if (Number(tradeEvent.price) > currKline.last.high) {
      currKline.last.high = Number(tradeEvent.price);
    } else if (Number(tradeEvent.price) < currKline.last.low) {
      currKline.last.low = Number(tradeEvent.price);
    }
    currKline.last.close = Number(tradeEvent.price);
    currKline.last.volume += Number(tradeEvent.amount);
    yield put(klinePush({ kline: currKline.last }));
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
const createNewCandle = (tradeEvent: PublicTradeEvent, rounded: number): KlineEvent => {
  const _price = Number(tradeEvent.price);
  const _amount = Number(tradeEvent.amount);
  return {
    high: _price,
    low: _price,
    close: _price,
    open: _price,
    volume: _amount,
    time: rounded * 1000,
  };
};
