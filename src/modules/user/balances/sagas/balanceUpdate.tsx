import { put, select } from "redux-saga/effects";

import { alertPush, BalanceUpdatePayload } from "../../..";
import { Balance, BalancesUpdateEvent, balanceUpdateEventData } from "../actions";

import {
  IPublicAsset,
  isAssetPDEX,
  selectGetAsset,
} from "@polkadex/orderbook/modules/public/assets";
import { UNIT } from "@polkadex/web-constants";
import { Utils } from "@polkadex/web-helpers";

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
  const assetId = isAssetPDEX(msg.asset) ? "-1" : msg.asset.asset;
  const newBalance = {
    name: getAsset(assetId).name,
    symbol: getAsset(assetId).symbol,
    assetId: assetId,
    free_balance: Utils.decimals.formatToString(msg.free),
    reserved_balance: Utils.decimals.formatToString(msg.reserved),
    pending_withdrawal: Utils.decimals.formatToString(msg.pending_withdrawal),
  };
  return newBalance;
};
