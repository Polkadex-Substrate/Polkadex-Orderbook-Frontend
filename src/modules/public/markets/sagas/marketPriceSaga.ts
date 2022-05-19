import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { marketPriceData, marketPriceError, MarketPriceFetch } from "../actions";

import { buildQueryString } from "@polkadex/web-helpers";
import { API, RequestOptions } from "@polkadex/orderbook-config";

// TODO: remove mockData and update endpoint when we have a marketPrice endpoint available
export function* marketPriceSaga(action: MarketPriceFetch) {
  try {
    const payload = action.payload ? `?${buildQueryString(action.payload)}` : "";
    const price = mockData();
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

const mockData = () => ({
  price: "31.4132905",
  created_at: "",
  updated_at: "",
});
