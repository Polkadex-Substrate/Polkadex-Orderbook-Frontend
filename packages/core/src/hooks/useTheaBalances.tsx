import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Asset, AssetAmount, BaseChainAdapter } from "@polkadex/thea";
import { useMemo } from "react";

import { QUERY_KEYS } from "../constants";

export const useTheaBalances = ({
  sourceAddress = "",
  connector,
  assets,
}: {
  sourceAddress?: string;
  connector: BaseChainAdapter | null;
  assets: Asset[];
}): UseQueryResult<AssetAmount[], Error> => {
  const enabled = useMemo(
    () => !!sourceAddress && !!assets && !!connector,
    [sourceAddress, assets, connector]
  );

  return useQuery({
    queryKey: QUERY_KEYS.getTheaBalances(sourceAddress),
    enabled,
    queryFn: async () => await connector?.getBalances(sourceAddress, assets),
  });
};
