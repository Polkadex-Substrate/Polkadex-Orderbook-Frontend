import { call, put, select } from "redux-saga/effects";

import * as queries from "../../../../graphql/queries";
import { balancesData, BalancesFetch } from "../actions";
import { alertPush } from "../../../public/alertHandler";

import {
  selectAssetsFetchSuccess,
  selectAssetIdMap,
} from "@polkadex/orderbook/modules/public/assets";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

type BalanceQueryResult = {
  a: string;
  f: string;
  r: string;
  p: string;
};

export function* balancesSaga(action: BalancesFetch) {
  try {
    const { mainAddress } = action.payload;
    const isAssetData = yield select(selectAssetsFetchSuccess);
    if (mainAddress && isAssetData) {
      const assetMap = yield select(selectAssetIdMap);
      const balances = yield call(() => fetchbalancesAsync(mainAddress));
      const list = balances.map((balance: IBalanceFromDb) => {
        const asset = assetMap[balance.asset_type];
        return {
          asset_id: asset.asset_id.toString(),
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
  const res: any = await sendQueryToAppSync({
    query: queries.getAllBalancesByMainAccount,
    variables: {
      main_account: account,
    },
  });
  const balancesRaw: BalanceQueryResult[] = res.data.getAllBalancesByMainAccount.items;
  const balances = balancesRaw.map((val) => {
    return {
      asset_type: val.a,
      reserved_balance: val.r,
      free_balance: val.f,
      pending_withdrawal: val.p,
    };
  });
  console.log("res from balances query", res);
  return balances;
}
