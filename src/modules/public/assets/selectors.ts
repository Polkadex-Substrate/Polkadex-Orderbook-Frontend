import { RootState } from "../../";

import { IPublicAsset } from "./types";

import { POLKADEX_ASSET } from "@polkadex/web-constants";

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
  (assetId: string | number): IPublicAsset | undefined =>
    assetId === "-1" || assetId === null || assetId === -1 || assetId === "POLKADEX"
      ? POLKADEX_ASSET
      : state.public.assets.list.find((asset) => asset.assetId === assetId.toString());
