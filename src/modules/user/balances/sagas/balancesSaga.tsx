import { call, put, select } from "redux-saga/effects";
import axios from "axios";
import { API } from "aws-amplify";

import * as queries from "../../../../graphql/queries";
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
    const account: ProxyAccount = yield select(selectUserInfo);
    const isAssetData = yield select(selectAssetsFetchSuccess);
    if (account.address && isAssetData) {
      // const assetMap = yield select(selectAssetIdMap);
      // const balances = yield call(() => fetchbalancesAsync(account.main_addr));
      // very unoptimized way to map the asset data
      // TODO: improve datastructure in the future
      // const list = balances.map((balance: IBalanceFromDb) => {
      //   const asset =
      //     balance.asset_type === "PDEX" ? POLKADEX_ASSET : assetMap[balance.asset_type];
      //   return {
      //     assetId: asset.assetId,
      //     name: asset.name,
      //     symbol: asset.symbol,
      //     reserved_balance: balance.reserved_balance,
      //     free_balance: balance.free_balance,
      //   };
      // });
      // yield put(balancesData({ balances: list, timestamp: new Date().getTime() }));
    }
  } catch (error) {
    console.warn(error);
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (balances fetch)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

type IBalanceFromDb = {
  asset_type: string;
  reserved_balance: string;
  free_balance: string;
};

async function fetchbalancesAsync(account: string): Promise<IBalanceFromDb[]> {
  const res: any = await API.graphql({
    query: queries.getAllBalancesByMainAccount,
    variables: { main_account: account },
  });
  console.log("fetch balance =>", res);
  return res.data.data;
}
