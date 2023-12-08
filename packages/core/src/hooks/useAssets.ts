import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { defaultConfig } from "@orderbook/core/config";
import { BalanceFormatter } from "@orderbook/format";
import { Asset } from "@orderbook/core/utils/orderbookService";

import { isAssetPDEX } from "../helpers";
import { POLKADEX_ASSET } from "../constants";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

import { useFunds } from "./useFunds";
export interface AssetsProps extends Asset {
  free_balance: string;
  onChainBalance: string;
  inOrdersBalance: string;
}

export function useAssets() {
  const { locale } = useRouter();
  const [filters, setFilters] = useState({ search: "", hideZero: false });

  const { assets: assetsList, isReady } = useOrderbookService();
  const { balances, loading: balancesLoading } = useFunds();

  const selectGetAsset = useCallback(
    (assetId: string | number | Record<string, string>): Asset | undefined => {
      if (!assetId || !assetsList) {
        return;
      }
      if (typeof assetId === "object" && "asset" in assetId) {
        assetId = assetId.asset;
      }
      return isAssetPDEX(assetId.toString())
        ? POLKADEX_ASSET
        : assetsList?.find((asset) => asset.id === assetId.toString());
    },
    [assetsList]
  );

  const toHuman = BalanceFormatter.toHuman;

  const assets = useMemo(
    () =>
      assetsList
        ?.map((e: AssetsProps) => {
          const tokenBalance = balances?.find(
            (value) => value.asset.id === e.id
          );
          const free_balance =
            tokenBalance?.free.toString() === "0"
              ? "0.00"
              : tokenBalance?.free || "0.00";

          const onChainBalance =
            tokenBalance?.onChainBalance === "0"
              ? "0.00"
              : tokenBalance?.onChainBalance || "0.00";

          const inOrdersBalance =
            tokenBalance?.reserved.toString() === "0"
              ? "0.00"
              : tokenBalance?.reserved.toString() || "0.00";

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
    [filters.search, assetsList, balances, filters.hideZero, locale, toHuman]
  );

  return {
    assets,
    filters,
    loading: !isReady || balancesLoading,
    onHideZeroBalance: () =>
      setFilters({
        ...filters,
        hideZero: !filters.hideZero,
      }),
    onSearchToken: (e: ChangeEvent<HTMLInputElement>) =>
      setFilters({ ...filters, search: e.target.value }),
    selectGetAsset,
  };
}
