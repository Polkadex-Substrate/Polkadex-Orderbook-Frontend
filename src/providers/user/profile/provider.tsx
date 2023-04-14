import { useCallback, useEffect, useReducer } from "react";
import { API } from "aws-amplify";

import { useAuth } from "../auth";
import { useSettingsProvider } from "../../public/settings";
import * as subscriptions from "../../../graphql/subscriptions";
import { useExtensionWallet } from "../extensionWallet";
import { orderUpdateEvent } from "../orderHistoryProvider";
import { balanceUpdateEvent } from "../balancesProvider/actions";
import { useBalancesProvider } from "../balancesProvider/useBalancesProvider";
import { transactionsUpdateEvent } from "../transactionsProvider";
import { useTransactionsProvider } from "../transactionsProvider/useTransactionProvider";
import { useTradeWallet } from "../tradeWallet";
import { useTrades } from "../trades";
import { useOrderHistoryProvider } from "../orderHistoryProvider/useOrderHistroyProvider";
import { registerMainAccountUpdateEvent } from "../extensionWallet/actions";
import { tradeAccountUpdateEvent } from "../tradeWallet/actions";
import { userTradesUpdateEvent } from "../trades/actions";

import { Provider } from "./context";
import { initialState, profileReducer } from "./reducer";
import * as T from "./types";
import * as A from "./actions";

import { LOCAL_STORAGE_ID, READ_ONLY_TOKEN, USER_EVENTS } from "@polkadex/web-constants";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as queries from "@polkadex/orderbook/graphql/queries";

export const ProfileProvider: T.ProfileComponent = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const authState = useAuth();
  const { onHandleNotification, onHandleError } = useSettingsProvider();

  const onUserSelectAccount = (payload: T.UserSelectAccount) => {
    const { tradeAddress: trade_address } = payload;
    try {
      const mainAddress = state.userData?.userAccounts?.find(
        ({ tradeAddress }) => trade_address === tradeAddress
      )?.mainAddress;
      if (mainAddress) {
        const data = { tradeAddress: trade_address, mainAddress };
        dispatch(A.userAccountSelectData(data));
      }
    } catch (e) {
      console.log("error: ", e);
      onHandleError(`Invalid funding account, ${e?.message ?? e}`);
    }
  };

  const getAllMainLinkedAccounts = async (email: string, Api = API) => {
    try {
      const res = await sendQueryToAppSync({
        query: queries.listMainAccountsByEmail,
        variables: {
          email,
        },
        token: null,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        API: Api,
      });
      return res.data.listMainAccountsByEmail ?? { accounts: [] };
    } catch (error) {
      console.log("Error: getAllMainLinkedAccounts", error.errors);
      onHandleError(`Fet all linked accounts error: ${error?.message ?? error}`);
    }
  };

  const getAllProxyAccounts = async (
    mainAccounts: [string],
    Api = API
  ): Promise<T.UserAccount[]> => {
    const promises = mainAccounts.map(async (main_account) => {
      try {
        const res = await sendQueryToAppSync({
          query: queries.findUserByMainAccount,
          variables: { main_account },
          API: Api,
        });
        const proxies = res.data.findUserByMainAccount.proxies ?? [];
        return { main_account, proxies };
      } catch (error) {
        console.log("Error: getAllProxyAccounts", error.errors);
        return { main_account, proxies: [] };
      }
    });
    const list = await Promise.all(promises);
    const accounts: T.UserAccount[] = [];
    list.forEach((item) => {
      item.proxies.forEach((proxy) => {
        accounts.push({ mainAddress: item.main_account, tradeAddress: proxy });
      });
    });
    return accounts;
  };

  const onUserAuth = async (payload: T.UserAuth) => {
    const { email, isConfirmed, isAuthenticated, userExists, jwt } = payload;
    dispatch(A.userAuthData({ isAuthenticated, userExists, jwt }));

    const userAccounts = state.userData?.userAccounts;
    const defaultTradeAddress = window.localStorage.getItem(
      LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT
    );

    try {
      if (!userAccounts?.length) {
        const { accounts } = await getAllMainLinkedAccounts(email);
        const userAccounts = await getAllProxyAccounts(accounts);
        dispatch(A.userData({ mainAccounts: accounts, userAccounts }));
      }

      if (defaultTradeAddress?.length) {
        dispatch(A.userSetDefaultTradeAccount(defaultTradeAddress));
        dispatch(A.userAccountSelectFetch({ tradeAddress: defaultTradeAddress }));
        dispatch(A.userSetAvatar());
      }

      if (!isConfirmed && userExists) {
        onHandleNotification({
          type: "Attention",
          message: "Please confirm your email, sign in again and confirm your email.",
        });
      }
    } catch (error) {
      onHandleError(`User auth error:${error?.message ?? error}`);
      dispatch(A.userAuthError(error));
    }
  };

  const onUserLogout = () => {
    dispatch(A.userReset());
  };

  const onUserChangeInitBanner = (payload = false) => {
    dispatch(A.userChangeInitBanner(payload));
  };

  const onUserAuthFetch = () => {
    dispatch(A.userAuthFetch());
  };

  const onUserProfileMainAccountPush = (payload: string) => {
    dispatch(A.userProfileMainAccountPush(payload));
  };

  const onUserProfileAccountPush = (payload: T.UserAccount) => {
    dispatch(A.userProfileAccountPush(payload));
  };

  const onUserProfileTradeAccountDelete = (payload: string) => {
    dispatch(A.userProfileTradeAccountDelete(payload));
  };

  const onUserAccountSelectFetch = (payload: A.UserAccountSelectFetch["payload"]) => {
    dispatch(A.userAccountSelectFetch(payload));
  };

  const onUserSetDefaultTradeAccount = (payload: A.UserSetDefaultTradeAccount["payload"]) => {
    dispatch(A.userSetDefaultTradeAccount(payload));
  };

  const onUserSetAvatar = (payload?: A.UserSetAvatar["payload"]) => {
    dispatch(A.userSetAvatar(payload));
  };

  const onUserFavoriteMarketPush = (payload: A.UserFavoriteMarketPush["payload"]) => {
    dispatch(A.userFavoriteMarketPush(payload));
  };

  const logoutIsSuccess = authState.logout.isSuccess;

  useEffect(() => {
    if (logoutIsSuccess) onUserLogout();
  }, [logoutIsSuccess]);

  // user event listener
  const { onRegisterMainAccountUpdate } = useExtensionWallet();
  const { onBalanceUpdate } = useBalancesProvider();
  const { onTransactionsUpdate } = useTransactionsProvider();
  const { onTradeAccountUpdate } = useTradeWallet();
  const { onUserTradeUpdate } = useTrades();
  const { onOrderUpdates } = useOrderHistoryProvider();
  const registerSuccessNotification = useCallback(
    (title: string, description: string) =>
      onHandleNotification({ type: "Success", message: description }),
    [onHandleNotification]
  );

  const createActionFromUserEvent = useCallback(
    (eventData: any) => {
      console.log("got raw event", eventData);
      const data = JSON.parse(eventData.value.data.websocket_streams.data);
      console.info("User Event: ", data);
      const eventType = data.type;
      switch (eventType) {
        case USER_EVENTS.SetBalance: {
          onBalanceUpdate(data);
          return balanceUpdateEvent(data);
        }
        case USER_EVENTS.SetTransaction: {
          onTransactionsUpdate(data);
          return transactionsUpdateEvent(data);
        }
        case USER_EVENTS.Order: {
          onOrderUpdates(data);
          return orderUpdateEvent(data);
        }
        case USER_EVENTS.RegisterAccount: {
          onRegisterMainAccountUpdate(data);
          return registerMainAccountUpdateEvent(data);
        }
        case USER_EVENTS.AddProxy: {
          onTradeAccountUpdate(data);
          return tradeAccountUpdateEvent(data);
        }

        case USER_EVENTS.TradeFormat: {
          onUserTradeUpdate(data);
          return userTradesUpdateEvent(data);
        }

        case USER_EVENTS.RemoveProxy:
          return registerSuccessNotification(
            "Trade account removed",
            "Trade account removal Confirmed"
          );
      }
    },
    [
      onBalanceUpdate,
      onOrderUpdates,
      onRegisterMainAccountUpdate,
      onTradeAccountUpdate,
      onTransactionsUpdate,
      onUserTradeUpdate,
      registerSuccessNotification,
    ]
  );
  const currentAccount: T.UserAccount = state.selectedAccount;
  const mainAddr = currentAccount.mainAddress;
  const tradeAddr = currentAccount.tradeAddress;

  useEffect(() => {
    console.log("created User Events Channel...", mainAddr);

    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: mainAddr },
      authToken: READ_ONLY_TOKEN,
      // ignore type error here as its a known bug in aws library
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        createActionFromUserEvent(data);
      },
      error: (err) => {
        console.log("subscription error", err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [createActionFromUserEvent, mainAddr]);

  useEffect(() => {
    console.log("created User Events Channel...", tradeAddr);

    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: tradeAddr },
      authToken: READ_ONLY_TOKEN,
      // ignore type error here as its a known bug in aws library
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        createActionFromUserEvent(data);
      },
      error: (err) => {
        console.log("subscription error", err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [createActionFromUserEvent, tradeAddr]);

  return (
    <Provider
      value={{
        ...state,
        onUserSelectAccount,
        onUserAuth,
        onUserLogout,
        onUserChangeInitBanner,
        onUserAuthFetch,
        onUserProfileAccountPush,
        onUserProfileTradeAccountDelete,
        onUserProfileMainAccountPush,
        onUserAccountSelectFetch,
        onUserSetDefaultTradeAccount,
        onUserSetAvatar,
        onUserFavoriteMarketPush,
      }}>
      {children}
    </Provider>
  );
};
