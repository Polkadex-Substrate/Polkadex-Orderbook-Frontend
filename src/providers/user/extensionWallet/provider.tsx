import { useCallback, useEffect, useReducer } from "react";
import { ApiPromise } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

import { ExtensionAccount } from "../../types";

import { extensionWalletReducer, initialState } from "./reducer";
import { Provider } from "./context";
import * as T from "./types";
import * as A from "./actions";
import { executeRegisterEmail, createSignedData, registerMainAccount } from "./helper";

import { ErrorMessages } from "@polkadex/web-constants";
import { useAuth } from "@polkadex/orderbook/providers/user/auth";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";
import { eventHandler, eventHandlerCallback } from "@polkadex/orderbook/helpers/eventHandler";

export const ExtensionWalletProvider: T.ExtensionWalletComponent = ({ children }) => {
  const [state, dispatch] = useReducer(extensionWalletReducer, initialState);
  const authState = useAuth();
  const {
    authInfo,
    onUserProfileMainAccountPush,
    onUserProfileAccountPush,
    onUserAccountSelectFetch,
  } = useProfile();
  const { onHandleError, onHandleNotification, hasExtension } = useSettingsProvider();
  const profileState = useProfile();
  const { mainAddress } = profileState.selectedAccount;
  const nativeApiState = useNativeApi();
  const tradeWalletState = useTradeWallet();

  // Actions
  const onLinkEmail = async (payload: A.RegisterMainAccountLinkEmailFetch["payload"]) => {
    const { mainAccount } = payload;
    try {
      const email = authState.email;

      const selectedControllerAccount = state.allAccounts?.find(
        ({ account }) => account?.address?.toLowerCase() === mainAccount?.toLowerCase()
      );

      const hasAddressAndEmail =
        !!selectedControllerAccount.account?.address?.length && !!email?.length;

      if (hasAddressAndEmail) {
        const signedData = await createSignedData(selectedControllerAccount, email);
        const data: T.LinkEmailData = signedData.data;
        const signature: string = signedData.signature;
        await executeRegisterEmail(data, signature);

        onUserProfileMainAccountPush(mainAccount);
      } else {
        throw new Error("Email or address is not valid");
      }
    } catch (error) {
      console.log("error in registration:", error.message);
      onHandleError(error?.message ?? error);
    }
  };

  const onRegisterMainAccountReset = () => {
    tradeWalletState.onRegisterTradeAccountReset();
    dispatch(A.registerMainAccountReset());
  };

  const onRegisterMainAccountUpdate = useCallback(
    (payload: A.RegisterMainAccountUpdateEvent["payload"]) => {
      try {
        const { proxy, main } = payload;
        onUserProfileMainAccountPush(main);
        onUserProfileAccountPush({
          tradeAddress: proxy,
          mainAddress: main,
        });

        onUserAccountSelectFetch({
          tradeAddress: proxy,
        });
        onHandleNotification({
          type: "Success",
          message:
            "New Account Registered, you have successfully registered a new controller account",
        });
      } catch (error) {
        console.log("error:", error);
        onHandleError(error?.message ?? error);
        dispatch(A.registerMainAccountError());
      }
    },
    [
      onHandleError,
      onHandleNotification,
      onUserAccountSelectFetch,
      onUserProfileMainAccountPush,
      onUserProfileAccountPush,
    ]
  );

  const onRegisterMainAccount = async (payload: A.RegisterMainAccountFetch["payload"]) => {
    let data: T.RegisterEmailData, signature: string;
    const { mainAccount, tradeAddress, mnemonic } = payload;
    dispatch(A.registerMainAccountFetch(payload));

    try {
      const selectedControllerAccount = state.allAccounts?.find(
        ({ account }) => account?.address?.toLowerCase() === mainAccount?.toLowerCase()
      );
      const email = authState.email;
      const api: ApiPromise = nativeApiState.api;

      // listen for events in this new registered main address
      eventHandlerCallback({
        cb: onRegisterMainAccountUpdate,
        name: mainAccount,
        eventType: "RegisterAccount",
      });

      const hasAddressAndEmail =
        !!selectedControllerAccount.account?.address?.length && !!email?.length;

      if (hasAddressAndEmail) {
        const res = await registerMainAccount(
          api,
          tradeAddress,
          selectedControllerAccount.signer,
          selectedControllerAccount.account?.address
        );

        if (res.isSuccess) {
          tradeWalletState.onRegisterTradeAccountData({
            mnemonic,
            account: {
              name: selectedControllerAccount.account.meta.name,
              address: selectedControllerAccount.account.address,
            },
          });
          dispatch(A.registerMainAccountData());
        } else {
          throw new Error("Extrinsic failed");
        }
      } else {
        throw new Error("Email or address is not valid");
      }
    } catch (error) {
      console.log("error in registration:", error.message);

      // if account is already registered , it means that that sending data to aws failed on a previous attempt
      // but it was successfully on the blockchain, since the transaction was submitted and signed by the wallet
      // it is assumed that the wallet belongs to the user, so we do a retry of sending to aws.

      if (error.message === ErrorMessages.OCEX_ALREADY_REGISTERED) {
        await retryRegisterToAppsync(data, signature, tradeAddress, mainAccount);
        return;
      }
      tradeWalletState.onRemoveTradeAccountFromBrowser(tradeAddress);
      dispatch(A.registerMainAccountError());
      onHandleNotification({
        message: `Cannot Register Account: ${error?.message ?? error}`,
        type: "Error",
      });
    }
  };

  const onPolkadotExtensionWallet = useCallback(async () => {
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
        dispatch(A.extensionWalletData({ allAccounts }));
      },
      { ss58Format: 88 }
    );
    return () => unsubscribe();
  }, []);

  const retryRegisterToAppsync = async (
    data: T.RegisterEmailData,
    signature: string,
    tradeAddress: string,
    mainAddress: string
  ) => {
    try {
      await executeRegisterEmail(data, signature);
      onUserProfileAccountPush({
        tradeAddress,
        mainAddress,
      });
      onUserProfileMainAccountPush(mainAddress);
      dispatch(A.registerMainAccountData());
    } catch (error) {
      console.log("error", error);
      dispatch(A.registerMainAccountError());
      onHandleNotification({
        message: `Cannot Register Account to Server!, ${error?.message ?? error}`,
        type: "Error",
      });
    }
  };

  const selectMainAccount = (address: string) => {
    return (
      address &&
      state.allAccounts?.find(
        ({ account }) => account?.address?.toLowerCase() === address?.toLowerCase()
      )
    );
  };
  useEffect(() => {
    if (authInfo.isAuthenticated && hasExtension) onPolkadotExtensionWallet();
  }, [onPolkadotExtensionWallet, authInfo.isAuthenticated, hasExtension]);

  useEffect(() => {
    console.log(
      "created User Events Channel... for main address from extension wallet provider",
      mainAddress
    );

    const subscription = eventHandler({
      cb: onRegisterMainAccountUpdate,
      name: mainAddress,
      eventType: "RegisterAccount",
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [mainAddress, onRegisterMainAccountUpdate]);

  return (
    <Provider
      value={{
        ...state,
        onLinkEmail,
        onRegisterMainAccountReset,
        onRegisterMainAccountUpdate,
        onRegisterMainAccount,
        onPolkadotExtensionWallet,
        selectMainAccount,
      }}>
      {children}
    </Provider>
  );
};
