import { useQuery } from "@tanstack/react-query";
import {
  Asset,
  appsyncOrderbookService,
} from "@orderbook/core/utils/orderbookService";

import { POLKADEX_ASSET, QUERY_KEYS } from "../constants";
import { useSettingsProvider } from "../providers/public/settings";
import { isAssetPDEX } from "../helpers";

export function useAssetsMetaData() {
  const { onHandleError } = useSettingsProvider();

  const { isLoading, isFetching, isSuccess, data } = useQuery({
    queryKey: QUERY_KEYS.assets(),
    queryFn: () => appsyncOrderbookService.query.getAssets(),
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
    initialData: [],
  });

  const selectGetAsset = (
    assetId: string | number | Record<string, string>
  ): Asset | undefined => {
    if (!assetId || !data) {
      return;
    }
    if (typeof assetId === "object" && "asset" in assetId) {
      assetId = assetId.asset;
    }
    return isAssetPDEX(assetId.toString())
      ? POLKADEX_ASSET
      : data.find((asset) => asset.id === assetId.toString());
  };

  return {
    list: data ?? [],
    loading: isLoading || isFetching,
    success: isSuccess,
    selectGetAsset,
  };
}
