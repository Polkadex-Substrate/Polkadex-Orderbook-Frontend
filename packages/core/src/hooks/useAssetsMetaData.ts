import { Asset } from "@orderbook/core/utils/orderbookService";

import { POLKADEX_ASSET } from "../constants";
import { isAssetPDEX } from "../helpers";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

export function useAssetsMetaData() {
  const { assets: data, isReady } = useOrderbookService();

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
    loading: !isReady,
    selectGetAsset,
  };
}
