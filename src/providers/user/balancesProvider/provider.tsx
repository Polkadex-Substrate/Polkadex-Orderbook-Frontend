// TODO: Check useCalback
import { useReducer, useEffect, useCallback } from "react";
import { API } from "aws-amplify";

import { useProfile } from "../profile/useProfile";
import { useAssetsProvider } from "../../public/assetsProvider/useAssetsProvider";
import * as queries from "../../../graphql/queries";
import { useSettingsProvider } from "../../public/settings";
import * as subscriptions from "../../../graphql/subscriptions";

import * as A from "./actions";
import { Provider } from "./context";
import { balancesReducer, initialState } from "./reducer";
import * as T from "./types";

import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";
import { READ_ONLY_TOKEN, USER_EVENTS } from "@polkadex/web-constants";

export const BalancesProvider: T.BalancesComponent = ({ children }) => {
  const [state, dispatch] = useReducer(balancesReducer, initialState);
  const {
    selectedAccount: { mainAddress, tradeAddress },
  } = useProfile();
  const { list: assetsList, success: isAssetData, selectGetAsset } = useAssetsProvider();
  const { onHandleError } = useSettingsProvider();

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
    []
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
      onHandleError(`Balances fetch error: ${error?.message ?? error}`);
    }
  }, [mainAddress, isAssetData, assetsList, fetchbalancesAsync, onHandleError]);

  const getFreeProxyBalance = (assetId: string) => {
    const balance = state.balances?.find(
      (balance) => balance?.assetId?.toString() === assetId
    );
    if (!balance?.assetId) return "0";
    return balance.free_balance;
  };

  const updateBalanceFromEvent = useCallback(
    (msg: T.BalanceUpdatePayload): T.Balance => {
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

  useEffect(() => {
    onBalancesFetch();
  }, [onBalancesFetch, mainAddress, isAssetData]);

  useEffect(() => {
    console.log(
      "created User Events Channel...with main address for balances provider",
      mainAddress
    );

    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: mainAddress },
      authToken: READ_ONLY_TOKEN,
      // ignore type error here as its a known bug in aws library
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        console.log("got raw event", data);
        const eventData = JSON.parse(data.value.data.websocket_streams.data);
        console.info("User Event: ", eventData);
        const eventType = eventData.type;
        if (eventType === USER_EVENTS.SetBalance) {
          onBalanceUpdate(eventData);
        }
      },
      error: (err) => {
        console.log("subscription error", err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [mainAddress, onBalanceUpdate]);

  useEffect(() => {
    console.log(
      "created User Events Channel... with trade address for balances",
      tradeAddress
    );

    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: tradeAddress },
      authToken: READ_ONLY_TOKEN,
      // ignore type error here as its a known bug in aws library
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        console.log("got raw event", data);
        const eventData = JSON.parse(data.value.data.websocket_streams.data);
        console.info("User Event: ", eventData);
        const eventType = eventData.type;
        if (eventType === USER_EVENTS.SetBalance) {
          onBalanceUpdate(eventData);
        }
      },
      error: (err) => {
        console.log("subscription error", err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onBalanceUpdate, tradeAddress]);

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
