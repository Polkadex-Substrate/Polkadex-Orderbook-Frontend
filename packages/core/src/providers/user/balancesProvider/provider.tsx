// TODO: Check useCalback
import { useReducer, useEffect, useCallback, useMemo } from "react";
import { ApiPromise } from "@polkadot/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import {
  fetchOnChainBalance,
  eventHandler,
  fetchOnChainBalances,
} from "@orderbook/core/helpers";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { QUERY_KEYS } from "@orderbook/core/constants";

import { useProfile } from "../profile";

import * as A from "./actions";
import { Provider } from "./context";
import { balancesReducer, initialState } from "./reducer";
import * as T from "./types";
import { fetchTradingBalancesAsync } from "./helper";

export const BalancesProvider: T.BalancesComponent = ({ children }) => {
  // const [state, dispatch] = useReducer(balancesReducer, initialState);
  const queryClient = useQueryClient();
  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const {
    list: assetsList,
    success: isAssetsFetched,
    selectGetAsset,
  } = useAssetsProvider();
  const { api, connected } = useNativeApi();
  const { onHandleError } = useSettingsProvider();

  const assets = useMemo(
    () => (isAssetsFetched ? assetsList.map((a) => a.assetId) : []),
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
      const currentAssetId = asset.assetId;

      // Default Balance Object
      const defaultBalance: T.Balance = {
        ...asset,
        reserved_balance: "0",
        free_balance: "0",
        onChainBalance: "0",
      };

      // Get trading balance object for current assetId
      const tradingBalance = tradingBalances?.find((balance) => {
        const asset = selectGetAsset(balance.asset_type);
        if (!asset) return {};
        return asset.assetId === currentAssetId;
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

  // const onBalancesFetch = useCallback(async () => {
  //   dispatch(A.balancesFetch());
  //   try {
  //     if (mainAddress && isAssetsFetched && api?.isConnected) {
  //       await api.isReady;
  //       const assetMap = assetsList?.reduce((acc, asset) => {
  //         acc[asset.assetId] = asset;
  //         return acc;
  //       }, {});

  //       const balances = await fetchTradingBalancesAsync(mainAddress);

  //       const list = balances?.map(async (balance: T.IBalanceFromDb) => {
  //         const asset = assetMap[balance.asset_type];
  //         const chainBalance = await fetchOnChainBalance(
  //           api,
  //           asset.assetId,
  //           mainAddress
  //         );
  //         return {
  //           assetId: asset.assetId.toString(),
  //           name: asset.name,
  //           symbol: asset.symbol,
  //           reserved_balance: balance.reserved_balance,
  //           free_balance: balance.free_balance,
  //           onChainBalance: chainBalance.toString(),
  //         };
  //       });
  //       dispatch(
  //         A.balancesData({
  //           balances: await Promise.all(list),
  //           timestamp: new Date().getTime(),
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     onHandleError(`Balances fetch error: ${error?.message ?? error}`);
  //     dispatch(A.balancesError(error));
  //   } finally {
  //     if (!mainAddress) {
  //       const error = {
  //         code: -1,
  //         message: ["No main address detected"],
  //       };

  //       dispatch(A.balancesError(error));
  //     }
  //   }
  // }, [mainAddress, isAssetsFetched, assetsList, onHandleError, api]);

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
        symbol: selectGetAsset(assetId)?.symbol || "",
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
                selectGetAsset(i.asset_type)?.assetId.toString() ===
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
                selectGetAsset(balance.asset_type)?.assetId.toString() !==
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

  // useEffect(() => {
  //   if (isAssetsFetched && mainAddress) onBalancesFetch();
  // }, [onBalancesFetch, isAssetsFetched, mainAddress]);

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
        // ...state,
        balances,
        loading: isTradingBalanceLoading || isOnChainBalanceLoading,
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
