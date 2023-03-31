import { useReducer } from "react";
import { extensionWalletReducer, initialState } from "./reducer";
import { ApiPromise } from "@polkadot/api";
import { ExtensionAccount } from "../../types";
import { stringToHex } from "@polkadot/util";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as mutations from "@polkadex/orderbook/graphql/mutations";

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
      }}>
      {children}
    </Provider>
  );
};
