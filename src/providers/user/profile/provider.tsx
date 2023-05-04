import { useCallback, useEffect, useReducer } from "react";
import { API } from "aws-amplify";

import { useAuth } from "../auth";
import { useSettingsProvider } from "../../public/settings";
import * as subscriptions from "../../../graphql/subscriptions";

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
  const registerSuccessNotification = useCallback(
    (title: string, description: string) =>
      onHandleNotification({ type: "Success", message: description }),
    [onHandleNotification]
  );

  const currentAccount: T.UserAccount = state.selectedAccount;
  const mainAddress = currentAccount.mainAddress;
  const tradeAddress = currentAccount.tradeAddress;

  useEffect(() => {
    console.log(
      "created User Events Channel... for main address from profile  provider",
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
        const eventType = eventData.type;
        console.info("User Event: ", eventData, "event type", eventType);

        if (eventType === USER_EVENTS.RemoveProxy) {
          registerSuccessNotification(
            "Trade account removed",
            "Trade account removal Confirmed"
          );
        }
      },
      error: (err) => {
        console.log("subscription error", err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [mainAddress, registerSuccessNotification]);

  useEffect(() => {
    console.log(
      "created User Events Channel... for trade address from profile  provider",
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

        const eventType = eventData.type;
        console.info("User Event: ", eventData, "event type", eventType);

        if (eventType === USER_EVENTS.RemoveProxy) {
          registerSuccessNotification(
            "Trade account removed",
            "Trade account removal Confirmed"
          );
        }
      },
      error: (err) => {
        console.log("subscription error", err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [registerSuccessNotification, tradeAddress]);

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
