/**
 * This hook manages state and actions related to:
 * - Asset selection
 * - Asset modal
 * - Deposit/withdrawal interaction
 * - Toggle switch between deposit between Polkadex accounts
 */

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { filterBlockedAssets } from "@orderbook/core/helpers";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useBalancesProvider } from "@orderbook/core/providers/user/balancesProvider";
import { useDepositProvider } from "@orderbook/core/providers/user/depositProvider";
import { useWithdrawsProvider } from "@orderbook/core/providers/user/withdrawsProvider";

import * as T from "./types";

const onChangeState = (onCallback: Dispatch<SetStateAction<boolean>>) => {
  onCallback((prevValue) => !prevValue);
};

export function useTransfer() {
  const { list } = useAssetsProvider();
  const { balances } = useBalancesProvider();
  const { loading: depositLoading } = useDepositProvider();
  const { loading: withdrawLoading } = useWithdrawsProvider();

  const [selectedAsset, setSelectedAsset] = useState<T.FilteredAssetProps>();
  const [otherPolkadexAccount, setOtherPolkadexAccount] = useState(false);
  const [assetsInteraction, setAssetsInteraction] = useState(false);
  const [isDeposit, setIsDeposit] = useState(true);

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
        return {
          ...e,
          availableBalance: tokenBalance?.onChainBalance,
        } as T.FilteredAssetProps;
      }),
    [list, balances]
  );

  /* Select default asset */
  useEffect(() => {
    if (!selectedAsset) setSelectedAsset(filteredNonBlockedAssets?.[0]);
  }, [selectedAsset, filteredNonBlockedAssets]);

  return {
    loading: depositLoading || withdrawLoading,
    withdrawLoading,
    assetsInteraction,
    onAssetsInteraction,
    onChangeAsset,
    onChangeIsDeposit: () => onChangeState(setIsDeposit),
    otherPolkadexAccount,
    onChangeOtherPolkadexAccount: () => onChangeState(setOtherPolkadexAccount),
    selectedAsset,
    otherPolkadexAccountSelected: isDeposit || otherPolkadexAccount,
  };
}
