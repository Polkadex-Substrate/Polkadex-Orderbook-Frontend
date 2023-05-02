import { useCallback, useReducer } from "react";
import { ApiPromise } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

import { ExtensionAccount } from "../../types";

import { extensionWalletReducer, initialState } from "./reducer";
import { Provider } from "./context";
import * as T from "./types";
import * as A from "./actions";
import { createSignedData, executeRegisterEmail, registerMainAccount } from "./helper";

import { useAuth } from "@polkadex/orderbook/providers/user/auth";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const ExtensionWalletProvider: T.ExtensionWalletComponent = ({ children }) => {
  const [state, dispatch] = useReducer(extensionWalletReducer, initialState);
  const authState = useAuth();
  const profileState = useProfile();
  const nativeApiState = useNativeApi();
  const tradeWalletState = useTradeWallet();
  const { onHandleError, onHandleNotification } = useSettingsProvider();

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
        const data = signedData.data;
        const signature: string = signedData.signature;
        await executeRegisterEmail(data, signature);

        profileState.onUserProfileMainAccountPush(mainAccount);
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
  };

  const onRegisterMainAccountUpdate = useCallback(
    (payload: A.RegisterMainAccountUpdateEvent["payload"]) => {
      try {
        const { proxy, main } = payload;
        profileState.onUserProfileMainAccountPush(main);
        profileState.onUserProfileAccountPush({
          tradeAddress: proxy,
          mainAddress: main,
        });

        profileState.onUserAccountSelectFetch({
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
    [onHandleError, onHandleNotification, profileState]
  );

  const onRegisterMainAccount = async (payload: A.RegisterMainAccountFetch["payload"]) => {
    const { mainAccount, tradeAddress, mnemonic } = payload;
    try {
      const selectedControllerAccount = state.allAccounts?.find(
        ({ account }) => account?.address?.toLowerCase() === mainAccount?.toLowerCase()
      );
      const email = authState.email;
      const api: ApiPromise = nativeApiState.api;

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
      tradeWalletState.onRemoveTradeAccountFromBrowser(tradeAddress);
      dispatch(A.registerMainAccountError());
      onHandleNotification({
        message: `Cannot Register Account: ${error?.message ?? error}`,
        type: "Error",
      });
    }
  };

  const onPolkadotExtensionWallet = useCallback(async () => {
    try {
      const allAccounts: ExtensionAccount[] = await getAllExtensionWalletAccounts();
      dispatch(A.extensionWalletData({ allAccounts }));

      const { web3AccountsSubscribe, web3FromAddress } = await import(
        "@polkadot/extension-dapp"
      );

      const unsubscribe = web3AccountsSubscribe(
        async (injectedAccounts: InjectedAccountWithMeta[]) => {
          const extensionAccountPromises: Promise<ExtensionAccount>[] = injectedAccounts.map(
            async (account): Promise<ExtensionAccount> => {
              return {
                account,
                signer: (await web3FromAddress(account.address)).signer,
              };
            }
          );
          const allAccounts = await Promise.all(extensionAccountPromises);
          dispatch(A.extensionWalletData({ allAccounts }));
        },
        { ss58Format: 88 }
      );
      return () => unsubscribe.then((fn) => fn());
    } catch (error) {
      onHandleError(error?.message ?? error);
    }
  }, [onHandleError]);

  async function getAllExtensionWalletAccounts(): Promise<ExtensionAccount[]> {
    try {
      const { web3Accounts, web3Enable, web3FromAddress, web3EnablePromise } = await import(
        "@polkadot/extension-dapp"
      );
      const isAuthGiven = await web3EnablePromise;
      if (!isAuthGiven) {
        throw new Error("Please give authorization in polkadot.js wallet");
      }
      const extensions = await web3Enable("polkadex");
      if (extensions.length === 0) {
        throw new Error("no extensions installed");
      }
      const allAccounts: InjectedAccountWithMeta[] = await web3Accounts({ ss58Format: 88 });
      const promises = allAccounts.map(async (account): Promise<ExtensionAccount> => {
        return {
          account,
          signer: (await web3FromAddress(account.address)).signer,
        };
      });
      return Promise.all(promises);
    } catch (error) {
      console.log(error.message);
    }
  }

  const selectMainAccount = (address: string) => {
    return (
      address &&
      state.allAccounts?.find(
        ({ account }) => account?.address?.toLowerCase() === address?.toLowerCase()
      )
    );
  };

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
