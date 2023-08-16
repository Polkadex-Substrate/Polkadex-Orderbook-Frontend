import { useCallback, useEffect, useReducer } from "react";
import { API, Auth } from "aws-amplify";

import { useAuth } from "../auth";
import { useSettingsProvider } from "../../public/settings";

import { Provider } from "./context";
import { initialState, profileReducer } from "./reducer";
import * as T from "./types";
import * as A from "./actions";

import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as queries from "@polkadex/orderbook/graphql/queries";

export const ProfileProvider: T.ProfileComponent = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { onUserAuth, signin, logout } = useAuth();
  const { onHandleNotification, onHandleError } = useSettingsProvider();

  const onUserSelectAccount = (payload: T.UserSelectAccount) => {
    const { tradeAddress: _tradeAddress } = payload;
    try {
      const mainAddress = state.userData?.userAccounts?.find(
        ({ tradeAddress }) => _tradeAddress === tradeAddress
      )?.mainAddress;
      if (mainAddress) {
        const data = { tradeAddress: _tradeAddress, mainAddress };
        dispatch(A.userSetDefaultTradeAccount(_tradeAddress));
        dispatch(A.userAccountSelectData(data));
      }
    } catch (e) {
      console.log("error: ", e);
      onHandleError(`Invalid funding account, ${e?.message ?? e}`);
    }
  };

  const getAllMainLinkedAccounts = useCallback(
    async (email: string, Api = API) => {
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
    },
    [onHandleError]
  );

  const getAllProxyAccounts = async (
    mainAccounts: [string],
    Api = API
  ): Promise<T.UserAccount[]> => {
    const promises = mainAccounts?.map(async (mainAccount) => {
      try {
        const res = await sendQueryToAppSync({
          query: queries.findUserByMainAccount,
          variables: { main_account: mainAccount },
          API: Api,
        });
        const proxies = res?.data?.findUserByMainAccount?.proxies ?? [];
        return { main_account: mainAccount, proxies };
      } catch (error) {
        return { main_account: mainAccount, proxies: [] };
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

  const onSetUserAuthData = ({ isAuthenticated, userExists, jwt }: T.UserAuth) => {
    dispatch(A.userAuthData({ isAuthenticated, userExists, jwt }));
  };

  // TODO: Refactor this function
  const onUserAuthentication = useCallback(
    async (payload: T.UserAuth) => {
      const { email, isConfirmed, userExists } = payload;
      const userAccounts = state.userData?.userAccounts;
      const defaultTradeAccountFromStorage = window.localStorage.getItem(
        LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT
      );
      const defaultTradeAddress =
        defaultTradeAccountFromStorage === "null" ? null : defaultTradeAccountFromStorage;

      try {
        if (!userAccounts?.length) {
          const { accounts }: { accounts: [string] } = await getAllMainLinkedAccounts(email);
          const userAccounts = await getAllProxyAccounts(accounts);
          const mainAddress = userAccounts?.find(
            ({ tradeAddress }) => defaultTradeAddress === tradeAddress
          )?.mainAddress;

          if (mainAddress && defaultTradeAddress)
            dispatch(
              A.userAccountSelectData({
                tradeAddress: defaultTradeAddress ?? null,
                mainAddress: mainAddress ?? null,
              })
            );
          if (accounts?.length) dispatch(A.userData({ mainAccounts: accounts }));
          if (userAccounts?.length) dispatch(A.userData({ userAccounts: userAccounts }));
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
    },
    [
      onHandleError,
      onHandleNotification,
      getAllMainLinkedAccounts,
      state?.userData?.userAccounts,
    ]
  );

  const onUserLogout = () => {
    dispatch(A.userReset());
  };

  const onUserChangeInitBanner = (payload = false) => {
    dispatch(A.userChangeInitBanner(payload));
  };

  const onUserAuthFetch = useCallback(() => {
    dispatch(A.userAuthFetch());
  }, []);

  const onUserProfileMainAccountPush = (payload: string) => {
    dispatch(A.userProfileMainAccountPush(payload));
  };

  const onUserProfileAccountPush = (payload: T.UserAccount) => {
    dispatch(A.userProfileAccountPush(payload));
  };

  const onUserProfileTradeAccountDelete = ({
    address,
    deleteFromBrowser = false,
  }: A.UserProfileTradeAccountDelete["payload"]) => {
    dispatch(A.userProfileTradeAccountDelete({ address, deleteFromBrowser }));
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

  const signInSuccess = signin.isSuccess;
  const logoutIsSuccess = logout.isSuccess;

  const fetchDataOnUserAuth = useCallback(async () => {
    try {
      onUserAuthFetch();
      const { attributes, signInUserSession } = await Auth.currentAuthenticatedUser();
      onUserChangeInitBanner();
      const payload = {
        email: attributes?.email,
        isAuthenticated: true,
        userExists: true,
        isConfirmed: attributes?.email_verified,
        jwt: signInUserSession?.accessToken?.jwtToken,
      };
      onUserAuth({
        email: payload.email,
        userConfirmed: payload.isConfirmed,
      });
      onSetUserAuthData(payload);
      onUserAuthentication(payload);
    } catch (error) {
      console.log("User error", error);
      switch (error) {
        case "User is not confirmed.": {
          const payload = {
            email: "",
            isAuthenticated: false,
            userExists: true,
            isConfirmed: false,
          };
          onUserAuth({
            email: payload.email,
            userConfirmed: payload.isConfirmed,
          });
          onSetUserAuthData(payload);
          onUserAuthentication(payload);
          break;
        }
        case "The user is not authenticated": {
          const payload = {
            email: "",
            isAuthenticated: false,
            userExists: false,
            isConfirmed: false,
          };
          onUserAuth({
            email: payload.email,
            userConfirmed: payload.isConfirmed,
          });
          onSetUserAuthData(payload);
          break;
        }
        default: {
          console.error("Error=>", `User data fetch error: ${error.message}`);
          onHandleError(`User data fetch error: ${error?.message ?? error}`);
          break;
        }
      }
    }
  }, [onUserAuth, onHandleError, onUserAuthFetch, onUserAuthentication]);

  useEffect(() => {
    // When User logout, do not fetch the data
    if (!logoutIsSuccess) fetchDataOnUserAuth();
  }, [logoutIsSuccess, signInSuccess, fetchDataOnUserAuth]);

  useEffect(() => {
    if (logoutIsSuccess) onUserLogout();
  }, [logoutIsSuccess]);

  return (
    <Provider
      value={{
        ...state,
        onUserSelectAccount,
        onUserAuth: onUserAuthentication,
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
