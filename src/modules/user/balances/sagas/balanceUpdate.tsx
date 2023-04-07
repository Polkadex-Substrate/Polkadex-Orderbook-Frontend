import { put, select } from "redux-saga/effects";

import { alertPush, BalanceUpdatePayload } from "../../..";
import { Balance, BalancesUpdateEvent, balanceUpdateEventData } from "../actions";

import {
  IPublicAsset,
  selectGetAsset,
} from "@polkadex/orderbook/modules/public/assets";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";

export function* balanceUpdateSaga(action: BalancesUpdateEvent) {
  try {
    const getAsset = yield select(selectGetAsset);
    const updateBalance = updateBalanceFromEvent(action.payload, getAsset);
    yield put(balanceUpdateEventData(updateBalance));
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (balances update saga)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

const updateBalanceFromEvent = (
  msg: BalanceUpdatePayload,
  getAsset: (id: string) => IPublicAsset
): Balance => {
  const assetId = isAssetPDEX(msg.asset.asset) ? "PDEX" : msg.asset.asset;
  const newBalance = {
    name: getAsset(assetId).name,
    symbol: getAsset(assetId).symbol,
    asset_id: assetId.toString(),
    free_balance: msg.free,
    reserved_balance: msg.reserved,
    pending_withdrawal: msg.pending_withdrawal,
  };
  return newBalance;
};
