/**
 * This hook manages state and actions related to:
 * - Asset selection
 * - Asset modal
 * - Deposit/withdrawal interaction
 * - Toggle switch between deposit between Polkadex accounts
 */

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { filterBlockedAssets, formatBalances } from "@orderbook/core/helpers";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useBalancesProvider } from "@orderbook/core/providers/user/balancesProvider";
import { useDepositProvider } from "@orderbook/core/providers/user/depositProvider";
import { useWithdrawsProvider } from "@orderbook/core/providers/user/withdrawsProvider";
import { useProfile } from "@orderbook/core/providers/user/profile";

import * as T from "./types";

const onChangeState = (onCallback: Dispatch<SetStateAction<boolean>>) => {
  onCallback((prevValue) => !prevValue);
};

export function useTransfer() {
  const { list } = useAssetsProvider();
  const { balances } = useBalancesProvider();
  const { loading: depositLoading } = useDepositProvider();
  const { loading: withdrawLoading } = useWithdrawsProvider();
  const { selectedAccount } = useProfile();

  const [selectedAsset, setSelectedAsset] = useState<T.FilteredAssetProps>();
  const [assetsInteraction, setAssetsInteraction] = useState(false);
  const [switchEnable, setSwitchEnable] = useState(false);

  const [type, setType] = useState<T.SwitchType>("deposit");

  const onAssetsInteraction = () => onChangeState(setAssetsInteraction);
  const onChangeAsset = (asset: T.FilteredAssetProps) => {
    setSelectedAsset(asset);
    onAssetsInteraction();
  };

  const filteredNonBlockedAssets = useMemo(
    () =>
      filterBlockedAssets(list)?.map((e) => {
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

        return {
          ...e,
          free_balance: formatBalances(free_balance),
          onChainBalance: formatBalances(onChainBalance),
        } as T.FilteredAssetProps;
      }),
    [list, balances]
  );

  /* Select default asset */
  useEffect(() => {
    if (!selectedAsset) {
      setSelectedAsset(filteredNonBlockedAssets?.[0]);
    } else if (selectedAccount && !!selectedAsset)
      setSelectedAsset((prev) => {
        const foundAsset = filteredNonBlockedAssets?.find(
          ({ assetId }) => assetId === prev?.assetId
        );
        return foundAsset || prev;
      });
  }, [selectedAsset, filteredNonBlockedAssets, selectedAccount]);

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
