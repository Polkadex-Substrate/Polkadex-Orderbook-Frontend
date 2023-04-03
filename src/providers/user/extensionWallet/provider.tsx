import { useCallback, useReducer } from "react";
import { extensionWalletReducer, initialState } from "./reducer";
import { ApiPromise } from "@polkadot/api";
import { ExtensionAccount } from "../../types";
import { stringToHex } from "@polkadot/util";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as mutations from "@polkadex/orderbook/graphql/mutations";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { Signer } from "@polkadot/types/types";
import { ErrorMessages } from "@polkadex/web-constants";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

import { Provider } from "./context";
import * as T from "./types";
import * as A from "./actions";

import { useAuth } from "@polkadex/orderbook/providers/user/auth";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";

export const ExtensionWalletProvider: T.ExtensionWalletComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(extensionWalletReducer, initialState);
  const authState = useAuth();
  const profileState = useProfile();
  const nativeApiState = useNativeApi();

  // Actions
  const onLinkEmail = async (payload: A.RegisterMainAccountLinkEmailFetch["payload"]) => {
    let data: T.LinkEmailData, signature: string;
    const { mainAccount } = payload;
    try {
      const email = authState.email;

      const selectedControllerAccount = state.allAccounts?.find(
        ({ account }) => account?.address?.toLowerCase() === mainAccount?.toLowerCase()
      );
      const api: ApiPromise = nativeApiState.api;

      const hasAddressAndEmail =
        !!selectedControllerAccount.account?.address?.length && !!email?.length;

      if (hasAddressAndEmail) {
        const signedData = await createSignedData(selectedControllerAccount, email);
        data = signedData.data;
        signature = signedData.signature;
        await executeRegisterEmail(data, signature);

        profileState.onUserProfileMainAccountPush(mainAccount);
      } else {
        throw new Error("Email or address is not valid");
      }
    } catch (error) {
      console.log("error in registration:", error.message);
      onError(error.message);
    }
  };

  const onRegisterMainAccountReset = () => {
    // TODO: When tradeWallet Provider would merge, then it should be done.
    // dispatch(A.registerTradeAccountReset());
  };

  const onRegisterMainAccountUpdate = (
    payload: A.RegisterMainAccountUpdateEvent["payload"]
  ) => {
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
      onNotification("You have successfully registered a new controller account");
    } catch (error) {
      console.log("error:", error);
      const errorMessage = error instanceof Error ? error.message : (error as string);
      if (typeof onError === "function") onError(errorMessage);
      dispatch(A.registerMainAccountError());
    }
  };

  const onRegisterMainAccount = async (payload: A.RegisterMainAccountFetch["payload"]) => {
    let data: T.RegisterEmailData, signature: string;
    const { mainAccount, tradeAddress, mnemonic } = payload;
    try {
      const selectedControllerAccount = state.allAccounts?.find(
        ({ account }) => account?.address?.toLowerCase() === mainAccount?.toLowerCase()
      );
      const email = authState.email;
      const api: ApiPromise = nativeApiState.api;

      // listen for events in this new registered main address

      // TODO : When userEventsChanelHandler provider will be created
      // yield fork(userEventsChannelHandler, selectedControllerAccount.account.address);

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
          // TODO - When TradeWallet would be created
          // dispatch(
          //   A.registerTradeAccountData({
          //     mnemonic,
          //     account: {
          //       name: selectedControllerAccount.account.meta.name,
          //       address: selectedControllerAccount.account.address,
          //     },
          //   })
          // );
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
      // TODO - When TradeWallet Would be created
      // yield put(removeTradeAccountFromBrowser({ address: tradeAddress }));
      dispatch(A.registerMainAccountError());
      onError(`Cannot Register Account! ${error.message}`);
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
      onError(error.message);
    }
  }, []);

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

  const registerMainAccount = async (
    api: ApiPromise,
    proxyAddress: string,
    signer: Signer,
    mainAddress: string
  ): Promise<ExtrinsicResult> => {
    const ext = api.tx.ocex.registerMainAccount(proxyAddress);
    const res = await signAndSendExtrinsic(api, ext, { signer }, mainAddress, true);
    return res;
  };

  const retryRegisterToAppsync = async (
    data: T.RegisterEmailData,
    signature: string,
    tradeAddress,
    mainAddress
  ) => {
    try {
      await executeRegisterEmail(data, signature);
      profileState.onUserProfileAccountPush({
        tradeAddress,
        mainAddress,
      });
      profileState.onUserProfileMainAccountPush(mainAddress);
      dispatch(A.registerMainAccountData());
    } catch (error) {
      console.log("error", error);
      dispatch(A.registerMainAccountError());
      onError(`Cannot Register Account to Server! ${error.message}`);
    }
  };

  const createSignedData = async (
    mainAccount: ExtensionAccount,
    email: string
  ): Promise<{ data: T.LinkEmailData; signature: string }> => {
    const { signer, account } = mainAccount;
    const signRaw = signer?.signRaw;
    const main_address = account.address;
    if (signRaw) {
      const data: T.LinkEmailData = { email, main_address };
      const { signature } = await signRaw({
        address: account.address,
        data: stringToHex(JSON.stringify(data)),
        type: "bytes",
      });
      return { data, signature };
    } else throw new Error("Cannot get Signer");
  };

  const executeRegisterEmail = async (data: T.LinkEmailData, signature: string) => {
    const payloadStr = JSON.stringify({ RegisterUser: { data, signature } });
    const res = await sendQueryToAppSync({
      query: mutations.register_user,
      variables: {
        input: { payload: payloadStr },
      },
      token: null,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    return res;
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
      }}>
      {children}
    </Provider>
  );
};
