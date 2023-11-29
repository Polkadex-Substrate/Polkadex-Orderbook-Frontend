import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useMemo, useState, useEffect, useCallback } from "react";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { ApiPromise } from "@polkadot/api";

import { QUERY_KEYS } from "../constants";
import { appsyncOrderbookService, Balance } from "../utils/orderbookService";
import { fetchOnChainBalance, fetchOnChainBalances } from "../helpers";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

import { useAssetsMetaData } from "./useAssetsMetaData";

export function useFunds() {
  const queryClient = useQueryClient();
  const { isReady } = useOrderbookService();
  const { onHandleError } = useSettingsProvider();
  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const {
    success: isAssetsFetched,
    list: assetsList,
    selectGetAsset,
  } = useAssetsMetaData();
  const { api, connected } = useNativeApi();

  const [state, setState] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setState(e.target.value);

  const shouldFetchTradingBalance = Boolean(
    isAssetsFetched && mainAddress && mainAddress?.length > 0
  );

  const shouldFetchChainBalance = Boolean(
    mainAddress &&
      mainAddress?.length > 0 &&
      api?.isConnected &&
      connected &&
      isAssetsFetched
  );

  const assets = useMemo(
    () => (isAssetsFetched ? assetsList.map((a) => a.id) : []),
    [isAssetsFetched, assetsList]
  );

  const {
    isLoading: isTradingBalanceLoading,
    isSuccess: isTradingBalanceSuccess,
    data: tradingBalances,
  } = useQuery({
    queryKey: QUERY_KEYS.tradingBalances(mainAddress),
    queryFn: async () =>
      await appsyncOrderbookService.query.getBalance(mainAddress),
    enabled: shouldFetchTradingBalance,
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
  });

  const {
    isLoading: isOnChainBalanceLoading,
    isSuccess: isOnChainBalanceSuccess,
    data: onChainBalances,
  } = useQuery({
    queryKey: QUERY_KEYS.onChainBalances(mainAddress, assets),
    queryFn: async () =>
      await fetchOnChainBalances(api as ApiPromise, assets, mainAddress),
    enabled: shouldFetchChainBalance,
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
  });

  const balances = useMemo(() => {
    if (!isAssetsFetched) return [];

    return assetsList.map((asset) => {
      const currentAssetId = asset.id;

      // Default Balance Object
      const defaultBalance = {
        asset,
        reserved: 0,
        free: 0,
        onChainBalance: "0",
      };

      // Get trading balance object for current assetId
      const tradingBalance = tradingBalances?.find((balance) => {
        const asset = selectGetAsset(balance.asset.id);
        if (!asset) return {};
        return asset.id === currentAssetId;
      });

      // Get onChain balances for current assetId
      const onChainBalance =
        onChainBalances?.get(currentAssetId)?.toString() || "0";

      // Merge the data
      return {
        ...defaultBalance,
        ...tradingBalance,
        onChainBalance,
      };
    });
  }, [
    isAssetsFetched,
    tradingBalances,
    selectGetAsset,
    onChainBalances,
    assetsList,
  ]);

  const getFreeProxyBalance = (assetId: string) => {
    const balance = balances?.find(
      (balance) => balance?.asset?.id?.toString() === assetId
    );
    if (!balance?.asset.id) return "0";
    return balance.free;
  };

  const onChangeChainBalance = async (assetId: string) => {
    if (api) {
      const newOnChainBalance = await fetchOnChainBalance(
        api,
        assetId,
        mainAddress
      );

      // Update chain balance
      queryClient.setQueryData(
        QUERY_KEYS.onChainBalances(mainAddress, assets),
        (prevData) => {
          const oldData = new Map(prevData as Map<string, number>);
          oldData.set(assetId, Number(newOnChainBalance));
          return oldData;
        }
      );
    }
  };

  const updateBalanceFromEvent = useCallback(
    async (msg: Balance) => {
      const assetId = msg.asset.id;

      const payload = {
        name: selectGetAsset(assetId)?.name || "",
        symbol: selectGetAsset(assetId)?.ticker || "",
        assetId: assetId.toString(),
        free_balance: msg.free,
        reserved_balance: msg.reserved,
      };

      if (!api) return { ...payload, onChainBalance: "0" };

      const onChainBalance = await fetchOnChainBalance(
        api,
        assetId,
        mainAddress
      );
      return { ...payload, onChainBalance: onChainBalance.toString() };
    },
    [selectGetAsset, api, mainAddress]
  );

  const onBalanceUpdate = useCallback(
    async (payload: Balance) => {
      try {
        const { onChainBalance, ...updateBalance } =
          await updateBalanceFromEvent(payload);

        // Update trading account balance
        queryClient.setQueryData(
          QUERY_KEYS.tradingBalances(mainAddress),
          (oldData): Balance[] => {
            const prevData = [...(oldData as Balance[])];
            const old = prevData.find(
              (i) => i.asset.id.toString() === updateBalance.assetId.toString()
            );
            if (!old) {
              return prevData;
            }
            const newBalance: Balance = {
              asset: {
                decimal: 8,
                id: updateBalance.assetId,
                name: updateBalance.name,
                ticker: updateBalance.symbol,
              },
              free: updateBalance.free_balance,
              reserved: updateBalance.reserved_balance,
            };

            // Filter out old balances from the balance state
            const balanceFiltered = prevData?.filter(
              (balance) =>
                balance.asset.id.toString() !== updateBalance.assetId.toString()
            );

            // Apply updates to the balances in the state
            return [...balanceFiltered, newBalance];
          }
        );

        // Update chain balance
        queryClient.setQueryData(
          QUERY_KEYS.onChainBalances(mainAddress, assets),
          (prevData) => {
            const oldData = new Map(prevData as Map<string, number>);
            oldData.set(updateBalance.assetId, Number(onChainBalance));
            return oldData;
          }
        );
      } catch (error) {
        onHandleError("Something has gone wrong while updating balance");
      }
    },
    [assets, mainAddress, onHandleError, queryClient, updateBalanceFromEvent]
  );

  // Balance updates are give to funding address
  useEffect(() => {
    if (mainAddress && isReady) {
      const subscription = appsyncOrderbookService.subscriber.subscribeBalances(
        mainAddress,
        onBalanceUpdate
      );
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [mainAddress, onBalanceUpdate, isReady]);

  return {
    balances,
    loading: Boolean(
      (isTradingBalanceLoading || isOnChainBalanceLoading) && mainAddress.length
    ),
    success: isTradingBalanceSuccess || isOnChainBalanceSuccess,
    getFreeProxyBalance,
    onChangeChainBalance,

    searchState: state,
    handleChange,
  };
}
