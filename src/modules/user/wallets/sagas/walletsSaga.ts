import { call, put } from "redux-saga/effects";

import { sendError, currenciesData, Currency } from "../../../";
import { walletsData, walletsError, WalletsFetch } from "../actions";
import { Wallet } from "../types";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const walletsOptions: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

const currenciesOptions: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* walletsSaga(action: WalletsFetch) {
  try {
    const accounts = yield call(API.get(walletsOptions), "/account/balances");
    const currencies = yield call(API.get(currenciesOptions), "/public/currencies");

    yield put(currenciesData(currencies));

    const accountsByCurrencies = currencies.map((currency: Currency) => {
      let walletInfo = accounts.find((wallet: Wallet) => wallet.currency === currency.id);

      if (!walletInfo) {
        walletInfo = {
          currency: currency.id,
        };
      }

      return {
        ...walletInfo,
        name: currency?.name,
        explorerTransaction: currency?.explorer_transaction,
        explorerAddress: currency?.explorer_address,
        fee: currency?.withdraw_fee,
        type: currency?.type,
        fixed: currency?.precision,
        iconUrl: currency?.icon_url,
      };
    });

    yield put(walletsData(accountsByCurrencies));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: walletsError,
        },
      })
    );
  }
}
