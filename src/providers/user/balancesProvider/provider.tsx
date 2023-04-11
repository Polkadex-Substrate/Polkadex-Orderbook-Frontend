import { useReducer, useEffect, useCallback } from "react";

import { useProfile } from "../profile/useProfile";
import { useAssetsProvider } from "../../public/assetsProvider/useAssetsProvider";
import * as queries from "../../../graphql/queries";

import * as A from "./actions";
import { Provider } from "./context";
import { balancesReducer, initialState } from "./reducer";
import * as T from "./types";

import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";

export const BalancesProvider: T.BalancesComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(balancesReducer, initialState);
  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const { list: assetsList, success: isAssetData, selectGetAsset } = useAssetsProvider();
  const fetchbalancesAsync = useCallback(
    async (account: string): Promise<T.IBalanceFromDb[]> => {
      const res: any = await sendQueryToAppSync({
        query: queries.getAllBalancesByMainAccount,
        variables: {
          main_account: account,
        },
      });
      const balancesRaw: T.BalanceQueryResult[] = res.data.getAllBalancesByMainAccount.items;
      const balances = balancesRaw?.map((val) => {
        return {
          asset_type: val.a,
          reserved_balance: val.r,
          free_balance: val.f,
          pending_withdrawal: val.p,
        };
      });
      return balances;
    },
    [sendQueryToAppSync]
  );
  const onBalancesFetch = useCallback(async () => {
    dispatch(A.balancesFetch());
    try {
      if (mainAddress && isAssetData) {
        const assetMap = assetsList?.reduce((acc, asset) => {
          acc[asset.assetId] = asset;
          return acc;
        }, {});

        const balances = await fetchbalancesAsync(mainAddress);

        const list = balances?.map((balance: T.IBalanceFromDb) => {
          const asset = assetMap[balance.asset_type];

          return {
            assetId: asset.assetId.toString(),
            name: asset.name,
            symbol: asset.symbol,
            reserved_balance: balance.reserved_balance,
            free_balance: balance.free_balance,
          };
        });
        dispatch(A.balancesData({ balances: list, timestamp: new Date().getTime() }));
      }
    } catch (error) {
      console.error(error);
      onError("Something has gone wrong (balances fetch)..");
    }
  }, [mainAddress, isAssetData, assetsList, fetchbalancesAsync, onError]);

  const getFreeProxyBalance = (assetId: string) => {
    const balance = state.balances?.find(
      (balance) => balance?.assetId?.toString() === assetId
    );
    if (!balance?.assetId) return "0";
    return balance.free_balance;
  };

  const onBalanceUpdate = (payload: T.BalanceUpdatePayload) => {
    try {
      const updateBalance = updateBalanceFromEvent(payload);
      dispatch(A.balanceUpdateEventData(updateBalance));
    } catch (error) {
      onError("Something has gone wrong while updating balance");
    }
  };

  const updateBalanceFromEvent = (msg: T.BalanceUpdatePayload): T.Balance => {
    const assetId = isAssetPDEX(msg.asset.asset) ? "PDEX" : msg.asset.asset;
    const newBalance = {
      name: selectGetAsset(assetId).name,
      symbol: selectGetAsset(assetId).symbol,
      assetId: assetId.toString(),
      free_balance: msg.free,
      reserved_balance: msg.reserved,
      pending_withdrawal: msg.pending_withdrawal,
    };
    return newBalance;
  };
  useEffect(() => {
    onBalancesFetch();
  }, [onBalancesFetch, mainAddress, isAssetData]);

  return (
    <Provider
      value={{
        ...state,
        getFreeProxyBalance,
        onBalanceUpdate,
      }}>
      {children}
    </Provider>
  );
};
