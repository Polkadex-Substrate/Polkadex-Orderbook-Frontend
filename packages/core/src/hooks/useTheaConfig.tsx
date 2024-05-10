import { useQuery } from "@tanstack/react-query";
import { Asset, BaseChainAdapter, Chain } from "@polkadex/thea";
import { useMemo } from "react";

import { QUERY_KEYS } from "../constants";

export const useTheaConfig = ({
  sourceAddress = "",
  destinationChain = null,
  selectedAsset,
  destinationAddress = "",
  connector,
}: {
  sourceAddress?: string;
  destinationChain: Chain | null;
  selectedAsset: Asset | null;
  destinationAddress?: string;
  connector: BaseChainAdapter | null;
}) => {
  const enabled = useMemo(
    () =>
      !!sourceAddress &&
      !!destinationChain &&
      !!selectedAsset &&
      !!destinationAddress,
    [sourceAddress, destinationChain, selectedAsset, destinationAddress]
  );

  return useQuery({
    queryKey: QUERY_KEYS.getTheConfig(
      sourceAddress,
      destinationAddress,
      selectedAsset?.ticker ?? "",
      destinationChain?.genesis ?? ""
    ),
    enabled,
    queryFn: async () => {
      if (!destinationChain || !selectedAsset) return;

      const res = await connector?.getTransferConfig(
        destinationChain,
        selectedAsset,
        destinationAddress,
        sourceAddress
      );
      return res;
    },
  });
};
