/**
 * This hook manages state and actions related to:
 * - Asset selection
 * - Asset modal
 * - Deposit/withdrawal interaction
 * - Toggle switch between deposit between Polkadex accounts
 */

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { filterBlockedAssets } from "@orderbook/core/helpers";
import { useAssets, useFunds } from "@orderbook/core/hooks";
import { useDepositProvider } from "@orderbook/core/providers/user/depositProvider";
import { useWithdrawsProvider } from "@orderbook/core/providers/user/withdrawsProvider";
import { useRouter } from "next/router";
import { BalanceFormatter } from "@orderbook/format";

import * as T from "./types";

const onChangeState = (onCallback: Dispatch<SetStateAction<boolean>>) => {
  onCallback((prevValue) => !prevValue);
};

export function useTransfer() {
  const toHuman = BalanceFormatter.toHuman;
  const { query, locale, push } = useRouter();
  const { assets: list } = useAssets(locale);
  const { balances } = useFunds();
  const { loading: depositLoading } = useDepositProvider();
  const { loading: withdrawLoading } = useWithdrawsProvider();

  const [assetsInteraction, setAssetsInteraction] = useState(false);
  const [switchEnable, setSwitchEnable] = useState(false);

  const [type, setType] = useState<T.SwitchType>("deposit");

  const onAssetsInteraction = (callback?: () => void) => {
    if (typeof callback === "function" && callback) callback();
    onChangeState(setAssetsInteraction);
  };
  const onChangeAsset = (asset: T.FilteredAssetProps) => {
    push({
      href: "/transfer",
      query: {
        token: asset.ticker,
      },
    });
    onAssetsInteraction();
  };

  const filteredNonBlockedAssets = useMemo(
    () =>
      filterBlockedAssets(list)?.map((e) => {
        const tokenBalance = balances?.find((value) => value.asset.id === e.id);
        const free_balance =
          String(tokenBalance?.free) === "0"
            ? "0.00"
            : String(tokenBalance?.free) || "0.00";

        const onChainBalance =
          tokenBalance?.onChainBalance === "0"
            ? "0.00"
            : tokenBalance?.onChainBalance || "0.00";

        return {
          ...e,
          free_balance: toHuman(Number(free_balance), 8, locale),
          onChainBalance: toHuman(Number(onChainBalance), 8, locale),
        } as T.FilteredAssetProps;
      }),
    [list, balances, locale, toHuman]
  );

  /* Select default asset */
  const selectedAsset = useMemo(() => {
    const foundAsset = filteredNonBlockedAssets?.find(
      ({ ticker }) => ticker === query?.token
    );

    return foundAsset ?? filteredNonBlockedAssets?.[0];
  }, [filteredNonBlockedAssets, query?.token]);

  return {
    loading: depositLoading || withdrawLoading,
    assetsInteraction,
    onAssetsInteraction,
    onChangeAsset,
    onChangeType: (v: T.SwitchType) => setType(v),
    type,
    selectedAsset,
    switchEnable,
    onDisableSwitch: (v = false) => setSwitchEnable(v),
  };
}
