import { useCallback, useEffect, useReducer } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { API } from "aws-amplify";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { LOCAL_STORAGE_ID } from "@orderbook/core/constants";
import { sendQueryToAppSync } from "@orderbook/core/helpers";
import * as queries from "@orderbook/core/graphql/queries";

import { ExtensionAccount } from "../../types";

import { Provider } from "./context";
import { initialState, profileReducer } from "./reducer";
import * as T from "./types";
import * as A from "./actions";

export const ProfileProvider: T.ProfileComponent = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { onHandleError, hasExtension } = useSettingsProvider();

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
      onUserChangeInitBanner();

      const { web3AccountsSubscribe, web3FromAddress } = await import(
        "@polkadot/extension-dapp"
      );
      const unsubscribe = await web3AccountsSubscribe(
        async (injectedAccounts: InjectedAccountWithMeta[]) => {
          const allAccounts = await Promise.all(
            injectedAccounts.map(async (account): Promise<ExtensionAccount> => {
              const { signer } = await web3FromAddress(account.address);
              return {
                account,
                signer,
              };
            })
          );
          const mainAccounts = allAccounts.map((a) => a.account.address);
          await onUserAuthentication(mainAccounts);
        },
        { ss58Format: 88 }
      );
      return () => unsubscribe();
    } catch (error) {
      onHandleError(`Accounts fetch error: ${error?.message ?? error}`);
    }
  }, [onUserAuthentication, onHandleError]);

  useEffect(() => {
    if (hasExtension) fetchDataOnUserAuth();
  }, [fetchDataOnUserAuth, hasExtension]);

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
