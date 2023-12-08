import { useCallback, useEffect, useReducer } from "react";
import { API } from "aws-amplify";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { LOCAL_STORAGE_ID } from "@orderbook/core/constants";
import { sendQueryToAppSync } from "@orderbook/core/helpers";
import * as queries from "@orderbook/core/graphql/queries";

import { useExtensionWallet } from "../extensionWallet";

import { Provider } from "./context";
import { initialState, profileReducer } from "./reducer";
import * as T from "./types";
import * as A from "./actions";

export const ProfileProvider: T.ProfileComponent = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { onHandleError } = useSettingsProvider();
  const { allAccounts } = useExtensionWallet();

  const onUserSelectAccount = useCallback(
    (payload: T.UserSelectAccount) => {
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
    },
    [onHandleError, state.userData?.userAccounts]
  );

  const getAllMainLinkedAccounts = useCallback(
    async (email: string, Api = API) => {
      try {
        const res = await sendQueryToAppSync({
          query: queries.listMainAccountsByEmail,
          variables: {
            email,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
          API: Api,
        });
        return res.data.listMainAccountsByEmail ?? { accounts: [] };
      } catch (error) {
        console.log("Error: getAllMainLinkedAccounts", error.errors);
        onHandleError(
          `Fet all linked accounts error: ${error?.message ?? error}`
        );
      }
    },
    [onHandleError]
  );

  const getAllProxyAccounts = useCallback(
    async (mainAccounts: string[], Api = API): Promise<T.UserAccount[]> => {
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
          accounts.push({
            mainAddress: item.main_account,
            tradeAddress: proxy,
          });
        });
      });
      return accounts;
    },
    []
  );

  // TODO: Refactor this function
  const onUserAuthentication = useCallback(
    async (mainAccounts: string[]) => {
      // dispatch(A.userFetch({ email: payload.email }));
      // const { email, isConfirmed, userExists } = payload;
      const userAccounts = state.userData?.userAccounts;
      const defaultTradeAccountFromStorage = window.localStorage.getItem(
        LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT
      );
      const defaultTradeAddress =
        defaultTradeAccountFromStorage === "null"
          ? null
          : defaultTradeAccountFromStorage;

      try {
        if (!userAccounts?.length) {
          const userAccounts = await getAllProxyAccounts(mainAccounts);
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
          if (mainAccounts?.length) dispatch(A.userData({ mainAccounts }));
          else
            dispatch(
              A.userError({ code: -1, message: ["No mainAccounts present"] })
            ); // Need to do it to set isLoading to false

          if (userAccounts?.length)
            dispatch(A.userData({ userAccounts: userAccounts }));
          else
            dispatch(
              A.userError({ code: -1, message: ["No userAccounts present"] })
            ); // Need to do it to set isLoading to false
        }
        if (defaultTradeAddress?.length) {
          dispatch(A.userSetDefaultTradeAccount(defaultTradeAddress));
          dispatch(
            A.userAccountSelectFetch({ tradeAddress: defaultTradeAddress })
          );
          dispatch(A.userSetAvatar());
        }
      } catch (error) {
        onHandleError(`User auth error:${error?.message ?? error}`);
        dispatch(A.userAuthError(error));
        dispatch(A.userError(error));
      }
    },
    [onHandleError, getAllProxyAccounts, state?.userData?.userAccounts]
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

  const onUserAccountSelectFetch = (
    payload: A.UserAccountSelectFetch["payload"]
  ) => {
    dispatch(A.userAccountSelectFetch(payload));
  };

  const onUserSetDefaultTradeAccount = (
    payload: A.UserSetDefaultTradeAccount["payload"]
  ) => {
    dispatch(A.userSetDefaultTradeAccount(payload));
  };

  const onUserSetAvatar = (payload?: A.UserSetAvatar["payload"]) => {
    dispatch(A.userSetAvatar(payload));
  };

  const onUserFavoriteMarketPush = (
    payload: A.UserFavoriteMarketPush["payload"]
  ) => {
    dispatch(A.userFavoriteMarketPush(payload));
  };

  const fetchDataOnUserAuth = useCallback(async () => {
    try {
      onUserAuthFetch();
      // const { attributes, signInUserSession } =
      //   await Auth.currentAuthenticatedUser();
      onUserChangeInitBanner();

      const mainAccounts = allAccounts.map((a) => a.account.address);
      // const mainAccounts = [
      //   "esq2wFkRsic8WM4nstAtkjqWdCDnTrGHMpFjaGN2rEHnQXUNm",
      // ];

      // const payload = {
      //   email: "attributes?.email",
      //   isAuthenticated: true,
      //   userExists: true,
      //   isConfirmed: true,
      //   jwt: "signInUserSession?.accessToken?.jwtToken",
      // };
      // onSetUserAuthData(payload);
      await onUserAuthentication(mainAccounts);
      // await onUserAuthentication(payload);
    } catch (error) {
      console.log("User error", error);
      // switch (error) {
      //   case "User is not confirmed.": {
      //     const payload = {
      //       email: "",
      //       isAuthenticated: false,
      //       userExists: true,
      //       isConfirmed: false,
      //     };
      //     onSetUserAuthData(payload);
      //     await onUserAuthentication(payload);
      //     break;
      //   }
      //   case "The user is not authenticated": {
      //     const payload = {
      //       email: "",
      //       isAuthenticated: false,
      //       userExists: false,
      //       isConfirmed: false,
      //     };
      //     onSetUserAuthData(payload);
      //     break;
      //   }
      //   default: {
      //     console.error("Error=>", `User data fetch error: ${error.message}`);
      //     onHandleError(`User data fetch error: ${error?.message ?? error}`);
      //     break;
      //   }
      // }
    }
  }, [onUserAuthFetch, onUserAuthentication, allAccounts]);

  console.log(state);

  useEffect(() => {
    // When User logout, do not fetch the data
    fetchDataOnUserAuth();
  }, [fetchDataOnUserAuth]);

  return (
    <Provider
      value={{
        ...state,
        onUserSelectAccount,
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
      }}
    >
      {children}
    </Provider>
  );
};
