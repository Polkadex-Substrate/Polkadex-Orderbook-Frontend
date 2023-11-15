import { useEffect, useCallback, useMemo } from "react";
import { ApiPromise } from "@polkadot/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useAssetsMetaData } from "@orderbook/core/hooks";
import {
  fetchOnChainBalance,
  eventHandler,
  fetchOnChainBalances,
} from "@orderbook/core/helpers";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { QUERY_KEYS } from "@orderbook/core/constants";

import { useProfile } from "../profile";

import { Provider } from "./context";
import * as T from "./types";
import { fetchTradingBalancesAsync } from "./helper";

export const BalancesProvider: T.BalancesComponent = ({ children }) => {
  const queryClient = useQueryClient();
  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const {
    list: assetsList,
    success: isAssetsFetched,
    selectGetAsset,
  } = useAssetsMetaData();
  const { api, connected } = useNativeApi();
  const { onHandleError } = useSettingsProvider();

  const assets = useMemo(
    () => (isAssetsFetched ? assetsList.map((a) => a.id) : []),
    [isAssetsFetched, assetsList]
  );

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

  const {
    isLoading: isTradingBalanceLoading,
    isSuccess: isTradingBalanceSuccess,
    data: tradingBalances,
  } = useQuery<T.IBalanceFromDb[]>({
    queryKey: QUERY_KEYS.tradingBalances(mainAddress),
    queryFn: async () => await fetchTradingBalancesAsync(mainAddress),
    enabled: shouldFetchTradingBalance,
    onError: onHandleError,
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
    onError: onHandleError,
  });

  const balances: T.Balance[] = useMemo(() => {
    if (!isAssetsFetched) return [];

    return assetsList.map((asset) => {
      const currentAssetId = asset.id;

      // Default Balance Object
      const defaultBalance: T.Balance = {
        assetId: currentAssetId,
        symbol: asset.ticker,
        name: asset.name,
        reserved_balance: "0",
        free_balance: "0",
        onChainBalance: "0",
      };

      // Get trading balance object for current assetId
      const tradingBalance = tradingBalances?.find((balance) => {
        const asset = selectGetAsset(balance.asset_type);
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
      (balance) => balance?.assetId?.toString() === assetId
    );
    if (!balance?.assetId) return "0";
    return balance.free_balance;
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
    async (msg: T.BalanceUpdatePayload): Promise<T.Balance> => {
      const assetId = msg.asset.asset;

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
    async (payload: T.BalanceUpdatePayload) => {
      try {
        const { onChainBalance, ...updateBalance } =
          await updateBalanceFromEvent(payload);

        // Update trading balance
        queryClient.setQueryData(
          QUERY_KEYS.tradingBalances(mainAddress),
          (oldData) => {
            const prevData = [...(oldData as T.IBalanceFromDb[])];
            const old = prevData.find(
              (i) =>
                selectGetAsset(i.asset_type)?.id.toString() ===
                updateBalance.assetId.toString()
            );
            if (!old) {
              return oldData;
            }
            const newBalance: T.IBalanceFromDb = {
              ...old,
              ...updateBalance,
            };

            // Filter out old balances from the balance state
            const balanceFiltered = prevData?.filter(
              (balance) =>
                selectGetAsset(balance.asset_type)?.id.toString() !==
                updateBalance.assetId.toString()
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
    [
      updateBalanceFromEvent,
      onHandleError,
      mainAddress,
      queryClient,
      selectGetAsset,
      assets,
    ]
  );

  // balance updates are give to main address
  useEffect(() => {
    if (mainAddress) {
      const subscription = eventHandler({
        cb: onBalanceUpdate,
        name: mainAddress,
        eventType: "SetBalance",
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [mainAddress, onBalanceUpdate]);

  return (
    <Provider
      value={{
        balances,
        loading: Boolean(
          (isTradingBalanceLoading || isOnChainBalanceLoading) &&
            mainAddress.length
        ),
        success: isTradingBalanceSuccess || isOnChainBalanceSuccess,
        timestamp: new Date().getTime(),

        getFreeProxyBalance,
        onChangeChainBalance,
      }}
    >
      {children}
    </Provider>
  );
};
