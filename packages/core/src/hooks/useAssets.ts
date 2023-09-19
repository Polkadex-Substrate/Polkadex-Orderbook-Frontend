import {
  useAssetsProvider,
  IPublicAsset,
} from "@orderbook/core/providers/public/assetsProvider";
import { useBalancesProvider } from "@orderbook/core/providers/user/balancesProvider";
import { ChangeEvent, useMemo, useState } from "react";
import { defaultConfig } from "@orderbook/core/config";

export interface AssetsProps extends IPublicAsset {
  free_balance: string;
  onChainBalance: string;
  inOrdersBalance: string;
}

export function useAssets() {
  const [filters, setFilters] = useState({ search: "", hideZero: false });

  const { list, loading } = useAssetsProvider();
  const { balances, loading: balancesLoading } = useBalancesProvider();

  const assets = useMemo(
    () =>
      list
        ?.map((e: AssetsProps) => {
          const tokenBalance = balances?.find(
            (value) => value.assetId === e.assetId
          );
          const free_balance =
            tokenBalance?.free_balance === "0"
              ? "0.00"
              : tokenBalance?.free_balance || "0.00";

          const onChainBalance =
            tokenBalance?.onChainBalance === "0"
              ? "0.00"
              : tokenBalance?.onChainBalance || "0.00";

          const inOrdersBalance =
            tokenBalance?.reserved_balance === "0"
              ? "0.00"
              : tokenBalance?.reserved_balance || "0.00";

          return {
            ...e,
            free_balance,
            onChainBalance,
            inOrdersBalance,
          };
        })
        ?.filter((e: AssetsProps) => {
          const hasZeroAmount =
            filters.hideZero && Number(e?.free_balance || 0) < 0.001;

          const matchesNameOrTicker =
            e.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            e.symbol.toLowerCase().includes(filters.search.toLowerCase());

          return (
            matchesNameOrTicker &&
            !hasZeroAmount &&
            !defaultConfig.blockedAssets?.some((value) => e.assetId === value)
          );
        })
        ?.sort((a, b) => a.name.localeCompare(b.name)),
    [filters.search, list, balances, filters.hideZero]
  );

  return {
    assets,
    filters,
    loading: loading || balancesLoading,
    onHideZeroBalance: () =>
      setFilters({
        ...filters,
        hideZero: !filters.hideZero,
      }),
    onSearchToken: (e: ChangeEvent<HTMLInputElement>) =>
      setFilters({ ...filters, search: e.target.value }),
  };
}
