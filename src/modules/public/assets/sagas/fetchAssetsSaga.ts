import { call, put } from "redux-saga/effects";

import { assetsData } from "../actions";
import { IPublicAsset } from "../types";
import { alertPush } from "../../../";

import { POLKADEX_ASSET } from "@polkadex/web-constants";
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
    assetsList.push(POLKADEX_ASSET);
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
  const assetEntries: any = await sendQueryToAppSync(getAllAssets);
  const assets = assetEntries.data.getAllAssets.items;
  return assets;
}
