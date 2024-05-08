import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Asset, AssetAmount, BaseChainAdapter } from "@polkadex/thea";
import { useMemo } from "react";

import { QUERY_KEYS } from "../constants";

export const useTheaBalances = ({
  sourceAddress = "",
  connector,
  assets,
  chain = "",
}: {
  sourceAddress?: string;
  connector: BaseChainAdapter | null;
  assets: Asset[];
  chain?: string;
}): UseQueryResult<AssetAmount[], Error> => {
  const enabled = useMemo(
    () => !!sourceAddress && !!assets && !!connector && !!chain,
    [sourceAddress, assets, connector, chain]
  );

  return useQuery({
    queryKey: QUERY_KEYS.getTheaBalances(sourceAddress, chain),
    enabled,
    queryFn: async () => await connector?.getBalances(sourceAddress, assets),
  });
};
