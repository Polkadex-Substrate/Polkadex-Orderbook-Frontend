// TODO: Check useCalback
import { useReducer, useEffect, useCallback } from "react";

import { useProfile } from "../profile/useProfile";
import { useAssetsProvider } from "../../public/assetsProvider/useAssetsProvider";
import * as queries from "../../../graphql/queries";
import { useSettingsProvider } from "../../public/settings";

import * as A from "./actions";
import { Provider } from "./context";
import { balancesReducer, initialState } from "./reducer";
import * as T from "./types";

import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { eventHandler } from "@polkadex/orderbook/helpers/eventHandler";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";
import { fetchOnChainBalance } from "@polkadex/orderbook/helpers/fetchOnChainBalance";

export const BalancesProvider: T.BalancesComponent = ({ children }) => {
  const [state, dispatch] = useReducer(balancesReducer, initialState);
  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const { list: assetsList, success: isAssetData, selectGetAsset } = useAssetsProvider();
  const { api } = useNativeApi();

  const { onHandleError } = useSettingsProvider();

  const fetchbalancesAsync = useCallback(
    async (account: string): Promise<T.IBalanceFromDb[]> => {
      const res = await sendQueryToAppSync({
        query: queries.getAllBalancesByMainAccount,
        variables: {
          main_account: account,
        },
      });
      const balancesRaw: T.BalanceQueryResult[] = res.data.getAllBalancesByMainAccount.items;
      return balancesRaw?.map((val) => {
        return {
          asset_type: val.a,
          reserved_balance: val.r,
          free_balance: val.f,
          pending_withdrawal: val.p,
        };
      });
    },
    []
  );

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
          const chainBalance = await fetchOnChainBalance(api, asset.assetId, mainAddress);
          return {
            assetId: asset.assetId.toString(),
            name: asset.name,
            symbol: asset.symbol,
            reserved_balance: balance.reserved_balance,
            free_balance: balance.free_balance,
            onChainBalance: chainBalance.toFixed(2),
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
    }
  }, [mainAddress, isAssetData, assetsList, fetchbalancesAsync, onHandleError, api]);

  const getFreeProxyBalance = (assetId: string) => {
    const balance = state.balances?.find(
      (balance) => balance?.assetId?.toString() === assetId
    );
    if (!balance?.assetId) return "0";
    return balance.free_balance;
  };

  const updateBalanceFromEvent = useCallback(
    (msg: T.BalanceUpdatePayload): Omit<T.Balance, "onChainBalance"> => {
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

  // TODO: Add conditions..
  useEffect(() => {
    onBalancesFetch();
  }, [onBalancesFetch, mainAddress, isAssetData]);

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
      }}>
      {children}
    </Provider>
  );
};
