import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import * as queries from "../../../../graphql/queries";
import { ProxyAccount, selectCurrentMainAccount } from "../../..";
import { balancesData, BalancesFetch, BalanceBase } from "../actions";
import { alertPush } from "../../../public/alertHandler";

import {
  selectAssetsFetchSuccess,
  selectAssetIdMap,
  isAssetPDEX,
} from "@polkadex/orderbook/modules/public/assets";
import { POLKADEX_ASSET } from "@polkadex/web-constants";
import { Utils } from "@polkadex/web-helpers";

type BalanceQueryResult = {
  a: string;
  f: string;
  r: string;
  p: string;
};

export function* balancesSaga(balancesFetch: BalancesFetch) {
  try {
    const account: ProxyAccount = yield select(selectCurrentMainAccount);
    const isAssetData = yield select(selectAssetsFetchSuccess);
    if (account.address && isAssetData) {
      const assetMap = yield select(selectAssetIdMap);
      const balances = yield call(() => fetchbalancesAsync(account.address));
      const list = balances.map((balance: IBalanceFromDb) => {
        const asset = isAssetPDEX(balance.asset_type)
          ? POLKADEX_ASSET
          : assetMap[balance.asset_type];
        return {
          assetId: asset.assetId.toString(),
          name: asset.name,
          symbol: asset.symbol,
          reserved_balance: balance.reserved_balance,
          free_balance: balance.free_balance,
        };
      });
      yield put(balancesData({ balances: list, timestamp: new Date().getTime() }));
    }
  } catch (error) {
    console.error(error);
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
  pending_withdrawal: string;
};

async function fetchbalancesAsync(account: string): Promise<IBalanceFromDb[]> {
  const res: any = await API.graphql({
    query: queries.getAllBalancesByMainAccount,
    variables: { main_account: account },
  });
  const balancesRaw: BalanceQueryResult[] = res.data.getAllBalancesByMainAccount.items;
  const balances = balancesRaw.map((val) => {
    return {
      asset_type: val.a,
      reserved_balance: Utils.decimals.formatToString(val.r),
      free_balance: Utils.decimals.formatToString(val.f),
      pending_withdrawal: Utils.decimals.formatToString(val.p),
    };
  });
  return balances;
}
