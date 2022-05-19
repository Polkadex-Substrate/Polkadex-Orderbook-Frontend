import { call, put } from "redux-saga/effects";
import axios from "axios";

import { sendError } from "../../../";
import { klineData, klineError, KlineFetch } from "../actions";

import { API, defaultConfig, RequestOptions } from "@polkadex/orderbook-config";
import { buildQueryString, getTimestampPeriod } from "@polkadex/web-helpers";

export function* handleKlineFetchSaga(action: KlineFetch) {
  try {
    // const { market, resolution, from, to } = action.payload;
    // TODO make the payload dynamic w.r.t the market
    const payload = {
      symbol: "BTCPDEX",
      timeframe: "5m",
      timestamp_start: -3888000,
    };
    const endPoint = `${defaultConfig.influxDBUrl}/fetchohlcv`;

    const data = yield call(() => fetchKlineAsync(payload, endPoint));
    const convertedData = data.map((elem) => {
      const { time, open, high, low, close, volume } = elem;

      return {
        time,
        open,
        high,
        low,
        close,
        volume,
      };
    });
    yield put(klineData(convertedData));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: klineError,
        },
      })
    );
  }
}

const fetchKlineAsync = async (data: any, endPoint: string) => {
  const res: any = await axios.post(endPoint, data);
  if (res.data.Fine) {
    return res.data.Fine;
  } else throw new Error(`${res.status} ${res.statusText}`);
};
