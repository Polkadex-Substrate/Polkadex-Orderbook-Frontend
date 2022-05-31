import { call, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";

import { assetsData } from "../actions";
import { IPublicAsset } from "../types";
import { selectRangerApi, alertPush } from "../../../";

export function* fetchAssetsSaga() {
  try {
    const api = yield select(selectRangerApi);
    if (api) {
      const assetsList = yield call(() => fetchAllAssetMetadata(api));
      const assetIdMap = assetsList.reduce((acc, asset) => {
        acc[asset.assetId] = asset;
        return acc;
      }, {});
      yield put(assetsData({ list: assetsList, assetIdMap }));
    }
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

async function fetchAllAssetMetadata(api: ApiPromise): Promise<IPublicAsset[]> {
  const assetEntries = await api.query.assets.metadata.entries();
  const assets: IPublicAsset[] = assetEntries.map(
    ([
      {
        args: [key],
      },
      val,
    ]) => {
      const data: any = val.toHuman();
      return {
        assetId: key.toString(),
        ...data,
      };
    }
  );
  return assets;
}
