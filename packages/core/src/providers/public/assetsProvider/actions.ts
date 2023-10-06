import { CommonError } from "../../types";

import {
  PUBLIC_ASSETS_FETCH,
  PUBLIC_ASSETS_ERROR,
  PUBLIC_ASSETS_DATA,
} from "./constants";
import { IPublicAsset } from "./types";

export interface AssetsFetch {
  type: typeof PUBLIC_ASSETS_FETCH;
}
export interface AssetsData {
  type: typeof PUBLIC_ASSETS_DATA;
  payload: {
    list: IPublicAsset[];
  };
}

export interface AssetsError {
  type: typeof PUBLIC_ASSETS_ERROR;
  error: CommonError;
}

export type AssetsAction = AssetsFetch | AssetsData | AssetsError;

export const assetsFetch = (): AssetsFetch => ({
  type: PUBLIC_ASSETS_FETCH,
});

export const assetsData = (payload: AssetsData["payload"]): AssetsData => ({
  type: PUBLIC_ASSETS_DATA,
  payload,
});

export const assetsError = (error: CommonError): AssetsError => ({
  type: PUBLIC_ASSETS_ERROR,
  error,
});
