import { call, put, select } from "redux-saga/effects";
import axios from "axios";

import { ProxyAccount } from "../../..";
import { balancesData, BalancesFetch, BalanceBase } from "../actions";
import { alertPush } from "../../../public/alertHandler";
import { selectUserInfo } from "../../profile";

import {
  selectAssetsFetchSuccess,
  selectAllAssets,
  IPublicAsset,
  selectAssetIdMap,
} from "@polkadex/orderbook/modules/public/assets";
import { POLKADEX_ASSET } from "@polkadex/web-constants";

export function* balancesSaga(balancesFetch: BalancesFetch) {
  try {
    const account = yield select(selectUserInfo);
    const isAssetData = yield select(selectAssetsFetchSuccess);
    if (account.address && isAssetData) {
      const assetMap = yield select(selectAssetIdMap);
      const balances = yield call(() => fetchbalancesAsync(account));
      // very unoptimized way to map the asset data
      // TODO: improve datastructure in the future
      const list = balances.map((balance: BalanceBase) => {
        const asset =
          balance.asset_type === "PDEX" ? POLKADEX_ASSET : assetMap[balance.asset_type];
        return {
          ...asset,
          ...balance,
        };
      });
      yield put(balancesData({ balances: list, timestamp: new Date().getTime() }));
    }
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

async function fetchbalancesAsync(account: ProxyAccount): Promise<BalanceBase[]> {
  const address = account.address;
  // const res = await axios.get("/api/user/assets/" + address);
  const res: any = await axios.get("/api/user/assets/" + "148"); // for testing purposes
  console.log("fetch balance =>", res);
  return res.data.data;
}
