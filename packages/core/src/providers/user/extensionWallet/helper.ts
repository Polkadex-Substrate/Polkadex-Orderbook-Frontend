import { stringToHex } from "@polkadot/util";
import { Signer } from "@polkadot/types/types";
import { ApiPromise } from "@polkadot/api";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/auth";
import {
  sendQueryToAppSync,
  ExtrinsicResult,
  signAndSendExtrinsic,
} from "@orderbook/core/helpers";
import * as mutations from "@orderbook/core/graphql/mutations";

import { ExtensionAccount } from "../../types";

import * as T from "./types";

export const userMainAccountDetails = (
  userMainAccount: string,
  extensionMainAccount: ExtensionAccount[],
) =>
  extensionMainAccount?.find(
    ({ account }) =>
      account.address?.toLowerCase() === userMainAccount?.toLowerCase(),
  );

export const selectIsAddressInExtension = (
  address: string,
  allAccounts: T.ExtensionWalletState["allAccounts"],
): boolean => {
  return Boolean(
    address && allAccounts?.some(({ account }) => account?.address === address),
  );
};

export const executeRegisterEmail = async (
  data: string[],
  signature: string,
) => {
  const payloadStr = JSON.stringify({ RegisterUser: [...data, signature] });
  try {
    return await sendQueryToAppSync({
      query: mutations.register_user,
      variables: {
        input: { payload: payloadStr },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
  } catch (error) {
    throw new Error("Registration failed. Please try again or contact us.");
  }
};

export const createSignedData = async (
  mainAccount: ExtensionAccount,
  email: string,
): Promise<{ data: string[]; signature: string }> => {
  const { signer, account } = mainAccount;
  const signRaw = signer?.signRaw;
  const mainAddress = account.address;
  if (signRaw) {
    const data = [email, mainAddress];
    const { signature } = await signRaw({
      address: account.address,
      data: stringToHex(JSON.stringify(data)),
      type: "bytes",
    });
    return { data, signature };
  } else throw new Error("Cannot get Signer");
};

export const registerMainAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string,
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.registerMainAccount(proxyAddress);
  const res = await signAndSendExtrinsic(
    api,
    ext,
    { signer },
    mainAddress,
    true,
  );
  return res;
};
