import { RootState } from "../../";

import { IPublicAsset } from "./types";

import { POLKADEX_ASSET } from "@polkadex/web-constants";
import { isKeyPresentInObject } from "@polkadex/orderbook/helpers/isKeyPresentInObject";
import { Asset } from "@polkadex/orderbook/API";

export const selectAssetsFetchSuccess = (state: RootState): boolean =>
  state.public.assets.success;

export const selectAssetFetchError = (state: RootState): string => state.public.assets.error;

export const selectAssetFetchLoading = (state: RootState): boolean =>
  state.public.assets.loading;

export const selectAllAssets = (state: RootState): IPublicAsset[] => state.public.assets.list;

export const selectAllAssetIds = (state: RootState): string[] =>
  state.public.assets.list.map((asset) => asset.assetId);

export const selectAssetIdMap = (state: RootState): Record<string, IPublicAsset> =>
  state.public.assets.assetIdMap;

export const selectGetAsset =
  (state: RootState) =>
  (assetId: string | number | Record<"asset", string>): IPublicAsset | null => {
    if (!assetId) {
      return null;
    }
    if (isKeyPresentInObject(assetId, "asset")) {
      assetId = assetId.asset;
    }
    return isAssetPDEX(assetId)
      ? POLKADEX_ASSET
      : state.public.assets.list.find((asset) => asset.assetId === assetId.toString());
  };

export const isAssetPDEX = (assetId): boolean =>
  assetId === "-1" ||
  assetId === null ||
  assetId === -1 ||
  assetId === "POLKADEX" ||
  assetId === "PDEX" ||
  assetId === "polkadex";
