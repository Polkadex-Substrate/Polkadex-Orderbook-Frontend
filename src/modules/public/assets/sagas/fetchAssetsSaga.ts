import { call, put } from "redux-saga/effects";
import { API } from "aws-amplify";

import { assetsData } from "../actions";
import { IPublicAsset } from "../types";
import { alertPush } from "../../../";

import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { getAllAssets } from "@polkadex/orderbook/graphql/queries";

export function* fetchAssetsSaga() {
  try {
    const assetsList: IPublicAsset[] = yield call(() => fetchAllAssetMetadata());
    // const allowedList = assetsList.filter((asset) =>
    //   ALLOWED_ASSET_IDS.includes(asset.assetId)
    // );
    const assetIdMap = assetsList.reduce((acc, asset) => {
      acc[asset.asset_id] = asset;
      return acc;
    }, {});
    yield put(assetsData({ list: assetsList, assetIdMap }));
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (fetchAssets)..",
          description: `${error.name}: ${error.message}`,
        },
        type: "Error",
      })
    );
  }
}

async function fetchAllAssetMetadata(): Promise<IPublicAsset[]> {
  const assetEntries: any = await sendQueryToAppSync({ query: getAllAssets });
  const assets = assetEntries.data.getAllAssets.items;
  return assets;
}
