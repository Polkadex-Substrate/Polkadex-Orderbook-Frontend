// TODO: Check useCalback
import { useReducer, useEffect, useCallback, useMemo } from "react";
import { ApiPromise } from "@polkadot/api";
import { useQuery } from "@tanstack/react-query";
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
  const [state, dispatch] = useReducer(balancesReducer, initialState);
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

  const assets = isAssetsFetched ? assetsList.map((a) => a.assetId) : [];

  const {
    isLoading: isTradingBalanceLoading,
    isSuccess: isTradingBalanceSuccess,
    data: tradingBalances,
  } = useQuery<T.IBalanceFromDb[]>({
    queryKey: QUERY_KEYS.tradingBalances(mainAddress),
    queryFn: async () => await fetchTradingBalancesAsync(mainAddress),
    enabled: Boolean(isAssetsFetched && mainAddress && mainAddress?.length > 0),
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
    enabled: Boolean(
      mainAddress &&
        mainAddress?.length > 0 &&
        api?.isConnected &&
        connected &&
        isAssetsFetched
    ),
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
    const balance = state.balances?.find(
      (balance) => balance?.assetId?.toString() === assetId
    );
    if (!balance?.assetId) return "0";
    return balance.free_balance;
  };

  const onChangeChainBalance = async (assetId: string) => {
    const newOnChainBalance = await onFetchChainBalanceForAsset(assetId);
    dispatch(
      A.onChangeChainBalance({ assetId, onChainBalance: newOnChainBalance })
    );
  };

  const onFetchChainBalanceForAsset = useCallback(
    async (assetId: string) => {
      if (api?.isConnected) {
        await api?.isReady;
        const chainBalance = await fetchOnChainBalance(
          api,
          assetId,
          mainAddress
        );
        return chainBalance.toString();
      }
      return "0";
    },
    [api, mainAddress]
  );

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

      const onChainBalance = await onFetchChainBalanceForAsset(assetId);
      return { ...payload, onChainBalance };
    },
    [selectGetAsset, onFetchChainBalanceForAsset]
  );

  const onBalanceUpdate = useCallback(
    async (payload: T.BalanceUpdatePayload) => {
      try {
        const updateBalance = await updateBalanceFromEvent(payload);
        dispatch(A.balanceUpdateEventData(updateBalance));
      } catch (error) {
        onHandleError("Something has gone wrong while updating balance");
      }
    },
    [updateBalanceFromEvent, onHandleError]
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
        ...state,
        balances,
        loading: isTradingBalanceLoading || isOnChainBalanceLoading,
        success: isTradingBalanceSuccess || isOnChainBalanceSuccess,
        timestamp: new Date().getTime(),

        getFreeProxyBalance,
        onBalanceUpdate,
        onChangeChainBalance,
      }}
    >
      {children}
    </Provider>
  );
};
