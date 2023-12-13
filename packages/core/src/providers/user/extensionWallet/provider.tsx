import { useCallback, useEffect, useReducer } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { eventHandler, eventHandlerCallback } from "@orderbook/core/helpers";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";

import { useTradeWallet } from "../tradeWallet";
import { useProfile } from "../profile";
import { ExtensionAccount } from "../../types";

import { extensionWalletReducer, initialState } from "./reducer";
import { Provider } from "./context";
import * as T from "./types";
import * as A from "./actions";
import { registerMainAccount } from "./helper";

export const ExtensionWalletProvider: T.ExtensionWalletComponent = ({
  children,
}) => {
  const [state, dispatch] = useReducer(extensionWalletReducer, initialState);
  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const { onHandleError, onHandleNotification, hasExtension } =
    useSettingsProvider();
  const nativeApiState = useNativeApi();
  const tradeWalletState = useTradeWallet();

  const onRegisterMainAccountReset = () => {
    tradeWalletState.onRegisterTradeAccountReset();
    dispatch(A.registerMainAccountReset());
  };

  const onRegisterMainAccountUpdate = useCallback(
    (payload: A.RegisterMainAccountUpdateEvent["payload"]) => {
      try {
        const { proxy, main } = payload;
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
    ]
  );

  const onRegisterMainAccount = async (
    payload: A.RegisterMainAccountFetch["payload"]
  ) => {
    const { mainAccount, tradeAddress, mnemonic } = payload;
    dispatch(A.registerMainAccountFetch(payload));

    try {
      const selectedControllerAccount = state.allAccounts?.find(
        ({ account }) =>
          account?.address?.toLowerCase() === mainAccount?.toLowerCase()
      );
      const api = nativeApiState.api;

      // listen for events in this new registered main address
      eventHandlerCallback({
        cb: onRegisterMainAccountUpdate,
        name: mainAccount,
        eventType: "RegisterAccount",
      });

      const hasAddressAndEmail =
        !!selectedControllerAccount?.account?.address?.length;

      if (hasAddressAndEmail && api) {
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
              name: selectedControllerAccount.account.meta.name || "",
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

  const selectMainAccount = (address: string): ExtensionAccount | undefined => {
    return state.allAccounts?.find(
      ({ account }) =>
        account?.address?.toLowerCase() === address?.toLowerCase()
    );
  };
  useEffect(() => {
    if (hasExtension) onPolkadotExtensionWallet();
  }, [onPolkadotExtensionWallet, hasExtension]);

  useEffect(() => {
    if (mainAddress) {
      const subscription = eventHandler({
        cb: onRegisterMainAccountUpdate,
        name: mainAddress,
        eventType: "RegisterAccount",
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [mainAddress, onRegisterMainAccountUpdate]);

  return (
    <Provider
      value={{
        ...state,
        onRegisterMainAccountReset,
        onRegisterMainAccountUpdate,
        onRegisterMainAccount,
        onPolkadotExtensionWallet,
        selectMainAccount,
      }}
    >
      {children}
    </Provider>
  );
};
