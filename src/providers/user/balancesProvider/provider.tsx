import { useReducer, useEffect } from "react";
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
  // const isAssetData = yield select(selectAssetsFetchSuccess);
  const { list: assetsList, success: isAssetData } = useAssetsProvider();
  const onBalancesFetch = async () => {
    try {
      if (mainAddress && isAssetData) {
        const assetMap = assetsList.reduce((acc, asset) => {
          acc[asset.assetId] = asset;
          return acc;
        }, {});
        // const assetMap = yield select(selectAssetIdMap);
        // const balances =await(() => fetchbalancesAsync(mainAddress))();
        const balances = await fetchbalancesAsync(mainAddress);
        const list = balances.map((balance: T.IBalanceFromDb) => {
          const asset = assetMap[balance.asset_type];
          return {
            asset_id: asset.asset_id.toString(),
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
  };

  async function fetchbalancesAsync(account: string): Promise<T.IBalanceFromDb[]> {
    const res: any = await sendQueryToAppSync({
      query: queries.getAllBalancesByMainAccount,
      variables: {
        main_account: account,
      },
    });
    const balancesRaw: T.BalanceQueryResult[] = res.data.getAllBalancesByMainAccount.items;
    const balances = balancesRaw.map((val) => {
      return {
        asset_type: val.a,
        reserved_balance: val.r,
        free_balance: val.f,
        pending_withdrawal: val.p,
      };
    });
    console.log("res from balances query", res);
    return balances;
  }

  useEffect(() => {
    onBalancesFetch();
  }, []);

  return (
    <Provider
      value={{
        ...state,
      }}>
      {children}
    </Provider>
  );
};
