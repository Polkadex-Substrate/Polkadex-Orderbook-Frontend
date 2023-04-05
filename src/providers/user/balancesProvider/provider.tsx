import { useReducer, useEffect, useCallback } from "react";
import { useProfile } from "../profile/useProfile";

import * as A from "./actions";
import { Provider } from "./context";
import { balancesReducer, initialState } from "./reducer";
import * as T from "./types";
import { useAssetsProvider } from "../../public/assetsProvider/useAssetsProvider";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as queries from "../../../graphql/queries";

export const BalancesProvider: T.BalancesComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(balancesReducer, initialState);
  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const { list: assetsList, success: isAssetData } = useAssetsProvider();
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
  }, [mainAddress, isAssetData, assetsList, fetchbalancesAsync]);

  const dispatchBalancesFetch = () => {
    dispatch(A.balancesFetch());
  };

  const getFreeProxyBalance = (assetId: string) => {
    const balance = state.balances?.find(
      (balance) => balance?.assetId?.toString() === assetId
    );
    if (!balance?.assetId) return "0";
    return balance.free_balance;
  };

  useEffect(() => {
    console.log("effect");

    onBalancesFetch();
  }, [onBalancesFetch]);

  return (
    <Provider
      value={{
        ...state,
        dispatchBalancesFetch,
        getFreeProxyBalance,
      }}>
      {children}
    </Provider>
  );
};
