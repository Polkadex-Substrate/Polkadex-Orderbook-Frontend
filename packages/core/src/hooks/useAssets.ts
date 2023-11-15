import { useRouter } from "next/router";
import { useBalancesProvider } from "@orderbook/core/providers/user/balancesProvider";
import { ChangeEvent, useMemo, useState } from "react";
import { defaultConfig } from "@orderbook/core/config";
import { BalanceFormatter } from "@orderbook/format";
import { Asset } from "@orderbook/core/utils/orderbookService";

import { useAssetsMetaData } from "./useAssetsMetaData";

export interface AssetsProps extends Asset {
  free_balance: string;
  onChainBalance: string;
  inOrdersBalance: string;
}

export function useAssets() {
  const { locale } = useRouter();
  const [filters, setFilters] = useState({ search: "", hideZero: false });

  const { list, loading } = useAssetsMetaData();
  const { balances, loading: balancesLoading } = useBalancesProvider();

  const toHuman = BalanceFormatter.toHuman;

  const assets = useMemo(
    () =>
      list
        ?.map((e: AssetsProps) => {
          const tokenBalance = balances?.find(
            (value) => value.assetId === e.id
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
            free_balance: toHuman(Number(free_balance), 8, locale),
            onChainBalance: toHuman(Number(onChainBalance), 8, locale),
            inOrdersBalance: toHuman(Number(inOrdersBalance), 8, locale),
          };
        })
        ?.filter((e: AssetsProps) => {
          const hasZeroAmount =
            filters.hideZero && Number(e?.free_balance || 0) < 0.001;

          const matchesNameOrTicker =
            e.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            e.ticker.toLowerCase().includes(filters.search.toLowerCase());

          return (
            matchesNameOrTicker &&
            !hasZeroAmount &&
            !defaultConfig.blockedAssets?.some((value) => e.id === value)
          );
        })
        ?.sort((a, b) => a.name.localeCompare(b.name)),
    [filters.search, list, balances, filters.hideZero, locale, toHuman]
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
