import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { marketPriceData, marketPriceError, MarketPriceFetch } from "../actions";

import { buildQueryString } from "@polkadex/web-helpers";
import { API, RequestOptions } from "@polkadex/orderbook-config";

const marketPriceRequestOptions: RequestOptions = {
  apiVersion: "engine",
};

export function* marketPriceSaga(action: MarketPriceFetch) {
  try {
    const payload = action.payload ? `?${buildQueryString(action.payload)}` : "";
    const price = yield call(
      API.get(marketPriceRequestOptions),
      `/public/qe/prices${payload}`
    );
    yield put(marketPriceData(price));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: marketPriceError,
        },
      })
    );
  }
}
