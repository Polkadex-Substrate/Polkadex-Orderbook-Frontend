import { useCallback, useEffect, useReducer } from "react";
import { Provider } from "./context";
import { initialState, profileReducer } from "./reducer";
import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";
import { API } from "aws-amplify";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as queries from "@polkadex/orderbook/graphql/queries";

import * as T from "./types";
import * as A from "./actions";
import { useAuth } from "../auth";

export const ProfileProvider: T.ProfileComponent = ({ onError, children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const authState = useAuth();

  const onUserSelectAccount = useCallback((payload: T.UserSelectAccount) => {
    const { tradeAddress } = payload;
    try {
      const mainAddress = state.userData?.userAccounts?.find(
        ({ trade_address }) => trade_address === tradeAddress
      )?.mainAddress;
      if (mainAddress) {
        const data = { tradeAddress, mainAddress };
        dispatch(A.userAccountSelectData(data));
      }
    } catch (e) {
      console.log("error: ", e);
      alert(`Invalid funding account! ${e?.message}`);
      // Notf push would be implemented later
      //   yield put(
      //     notificationPush({
      //       message: {
      //         title: "Invalid funding account!",
      //         description: e?.message,
      //       },
      //       time: new Date().getTime(),
      //     })
      //   );
    }
  }, []);

  const getAllMainLinkedAccounts = async (email: string, Api = API) => {
    try {
      const res: any = await sendQueryToAppSync({
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
    }
  };

  const getAllProxyAccounts = async (
    mainAccounts: [string],
    Api = API
  ): Promise<T.UserAccount[]> => {
    const promises = mainAccounts.map(async (main_account) => {
      try {
        const res: any = await sendQueryToAppSync({
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
        alert("Please confirm your email. Sign in again and confirm your email.");
        // Notf push would be implemented later
        // yield put(
        //   notificationPush({
        //     type: "AttentionAlert",
        //     message: {
        //       title: "Please confirm your email.",
        //       description: "Sign in again and confirm your email.",
        //     },
        //     time: new Date().getTime(),
        //   })
        // );
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (error as string);
      if (typeof onError === "function") onError(errorMessage);
      else dispatch(A.userAuthError(error));
    }
  };

  const onUserLogout = () => {
    dispatch(A.userReset());
  };

  const onUserChangeInitBanner = (payload: boolean) => {
    dispatch(A.userChangeInitBanner(payload));
  };

  const logoutIsSuccess = authState.logout.isSuccess;

  useEffect(() => {
    if (logoutIsSuccess) onUserLogout();
  }, [logoutIsSuccess]);

  return (
    <Provider
      value={{
        ...state,
        onUserSelectAccount,
        onUserAuth,
        onUserLogout,
        onUserChangeInitBanner,
      }}>
      {children}
    </Provider>
  );
};
