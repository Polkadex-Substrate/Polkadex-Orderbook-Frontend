// TODO: Check useCalback
import { useReducer, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "react-query";

import { useProfile } from "../profile/useProfile";
import { useAssetsProvider } from "../../public/assetsProvider/useAssetsProvider";
import { useSettingsProvider } from "../../public/settings";

import * as A from "./actions";
import { Provider } from "./context";
import { balancesReducer, initialState } from "./reducer";
import * as T from "./types";

import { eventHandler } from "@polkadex/orderbook/helpers/eventHandler";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";
import { fetchOnChainBalances } from "@polkadex/orderbook/helpers/fetchOnChainBalance";
import { fetchTradingBalancesAsync } from "@polkadex/orderbook/providers/user/balancesProvider/helpers";
import { QUERY_KEYS } from "@polkadex/orderbook/utils/queryKeys";

export const BalancesProvider: T.BalancesComponent = ({ children }) => {
  const [state, dispatch] = useReducer(balancesReducer, initialState);
  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const { list: assetsList, success: isAssetsFetched, selectGetAsset } = useAssetsProvider();
  const { api, connected } = useNativeApi();

  const { onHandleError } = useSettingsProvider();
  const assets = isAssetsFetched ? assetsList.map((a) => a.assetId) : [];
  const {
    isLoading,
    isSuccess,
    data: tradingBalances,
  } = useQuery(
    QUERY_KEYS.tradingBalances(mainAddress),
    () => fetchTradingBalancesAsync(mainAddress),
    {
      enabled: Boolean(isAssetsFetched && mainAddress && mainAddress?.length > 0),
      onError: onHandleError,
      initialData: [],
    }
  );

  const balances = useMemo(() => {
    if (!isAssetsFetched) {
      return [];
    }
    return tradingBalances?.map((balance): T.Balance => {
      const asset = selectGetAsset(balance.asset_type);
      return {
        ...balance,
        assetId: balance.asset_type,
        name: asset.name,
        symbol: asset.symbol,
      };
    });
  }, [isAssetsFetched, tradingBalances, selectGetAsset]);

  const onChainBalanceQuery = useQuery(
    QUERY_KEYS.onChainBalances(mainAddress, assets),
    () => fetchOnChainBalances(api, assets, mainAddress),
    {
      enabled: Boolean(mainAddress && mainAddress?.length > 0 && connected && isAssetsFetched),
      onError: onHandleError,
      initialData: new Map(),
    }
  );

  const getFreeProxyBalance = (assetId: string) => {
    const balance = state.balances?.find(
      (balance) => balance?.assetId?.toString() === assetId
    );
    if (!balance?.assetId) return "0";
    return balance.free_balance;
  };

  const updateBalanceFromEvent = useCallback(
    (msg: T.BalanceUpdatePayload): T.Balance => {
      const assetId = msg.asset.asset;
      return {
        name: selectGetAsset(assetId).name,
        symbol: selectGetAsset(assetId).symbol,
        assetId: assetId.toString(),
        free_balance: msg.free,
        reserved_balance: msg.reserved,
      };
    },
    [selectGetAsset]
  );

  const onBalanceUpdate = useCallback(
    (payload: T.BalanceUpdatePayload) => {
      try {
        const updateBalance = updateBalanceFromEvent(payload);
        dispatch(A.balanceUpdateEventData(updateBalance));
      } catch (error) {
        onHandleError("Something has gone wrong while updating balance");
      }
    },
    [onHandleError, updateBalanceFromEvent]
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
        loading: isLoading,
        success: isSuccess,
        balances,
        getFreeProxyBalance,
        onChainBalances: {
          data: onChainBalanceQuery.data,
          isLoading: onChainBalanceQuery.isLoading,
          isSuccess: onChainBalanceQuery.isSuccess,
        },
      }}>
      {children}
    </Provider>
  );
};
