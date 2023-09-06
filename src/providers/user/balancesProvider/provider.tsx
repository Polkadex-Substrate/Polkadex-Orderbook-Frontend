// TODO: Check useCalback
import { useCallback, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";

import { useProfile } from "../profile/useProfile";
import { useAssetsProvider } from "../../public/assetsProvider/useAssetsProvider";
import { useSettingsProvider } from "../../public/settings";

import { Provider } from "./context";
import * as T from "./types";

import { eventHandler } from "@polkadex/orderbook/helpers/eventHandler";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";
import { fetchOnChainBalances } from "@polkadex/orderbook/helpers/fetchOnChainBalance";
import { fetchTradingBalancesAsync } from "@polkadex/orderbook/providers/user/balancesProvider/helpers";
import { QUERY_KEYS } from "@polkadex/orderbook/utils/queryKeys";

export const BalancesProvider: T.BalancesComponent = ({ children }) => {
  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const { list: assetsList, success: isAssetsFetched, selectGetAsset } = useAssetsProvider();
  const { api, connected } = useNativeApi();
  const queryClient = useQueryClient();

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
    const balance = balances?.find((balance) => balance?.assetId?.toString() === assetId);
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
      const updateBalance = updateBalanceFromEvent(payload);
      queryClient.setQueryData(QUERY_KEYS.tradingBalances(mainAddress), (old) => {
        const oldBalances = old as T.Balance[];
        const isPresent = oldBalances.find((b) => b.assetId === updateBalance.assetId);
        // if the balance is not present in the state, add it
        if (!isPresent) {
          return [...oldBalances, updateBalance];
        }
        // replace the old balance with the new one
        return oldBalances.map((balance) => {
          if (balance.assetId === updateBalance.assetId) {
            return updateBalance;
          }
          return balance;
        });
      });
    },
    [mainAddress, queryClient, updateBalanceFromEvent]
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
