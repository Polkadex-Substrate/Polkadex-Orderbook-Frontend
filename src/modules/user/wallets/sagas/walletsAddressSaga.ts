import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { walletsAddressData, walletsAddressError, WalletsAddressFetch } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";

// TODO: DISABLED UNITL DATA IS READY
export function* walletsAddressSaga(action: WalletsAddressFetch) {
  return;
  try {
    const currency = action.payload.currency.toLocaleLowerCase();
    const url = `/account/deposit_address/${currency}`;
    const { address, currencies, state } = yield call(API.get(walletsAddressOptions), url);
    yield put(walletsAddressData({ address, currencies, state }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: walletsAddressError,
        },
      })
    );
  }
}
