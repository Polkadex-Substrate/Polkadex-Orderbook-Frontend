// TODO: Check useCalback
import { useReducer, useEffect, useCallback } from "react";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { fetchOnChainBalance, eventHandler } from "@orderbook/core/helpers";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";

import { useProfile } from "../profile";

import * as A from "./actions";
import { Provider } from "./context";
import { balancesReducer, initialState } from "./reducer";
import * as T from "./types";
import { fetchbalancesAsync } from "./helper";

export const BalancesProvider: T.BalancesComponent = ({ children }) => {
  const [state, dispatch] = useReducer(balancesReducer, initialState);
  const {
    selectedAccount: { mainAddress },
    auth: { isLoading: isProfileFetching },
  } = useProfile();
  const {
    list: assetsList,
    success: isAssetData,
    selectGetAsset,
    loading: isAssetFetching,
  } = useAssetsProvider();
  const { api } = useNativeApi();

  const { onHandleError } = useSettingsProvider();

  const onBalancesFetch = useCallback(async () => {
    dispatch(A.balancesFetch());
    try {
      if (mainAddress && isAssetData && api?.isConnected) {
        await api.isReady;
        const assetMap = assetsList?.reduce((acc, asset) => {
          acc[asset.assetId] = asset;
          return acc;
        }, {});

        const balances = await fetchbalancesAsync(mainAddress);

        const list = balances?.map(async (balance: T.IBalanceFromDb) => {
          const asset = assetMap[balance.asset_type];
          const chainBalance = await fetchOnChainBalance(
            api,
            asset.assetId,
            mainAddress
          );
          return {
            assetId: asset.assetId.toString(),
            name: asset.name,
            symbol: asset.symbol,
            reserved_balance: balance.reserved_balance,
            free_balance: balance.free_balance,
            onChainBalance: chainBalance.toString(),
          };
        });
        dispatch(
          A.balancesData({
            balances: await Promise.all(list),
            timestamp: new Date().getTime(),
          })
        );
      }
    } catch (error) {
      console.error(error);
      onHandleError(`Balances fetch error: ${error?.message ?? error}`);
      dispatch(A.balancesError(error));
    } finally {
      if (!mainAddress) {
        const error = {
          code: -1,
          message: ["No main address detected"],
        };

        dispatch(A.balancesError(error));
      }
    }
  }, [mainAddress, isAssetData, assetsList, onHandleError, api]);

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

  useEffect(() => {
    if (!isProfileFetching && !isAssetFetching && mainAddress)
      onBalancesFetch();
  }, [onBalancesFetch, isProfileFetching, isAssetFetching, mainAddress]);

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
        getFreeProxyBalance,
        onBalanceUpdate,
        onBalancesFetch,
        onChangeChainBalance,
      }}
    >
      {children}
    </Provider>
  );
};
