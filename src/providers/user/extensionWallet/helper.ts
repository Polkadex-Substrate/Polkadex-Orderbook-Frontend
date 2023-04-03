import { ExtensionAccount } from "@polkadex/orderbook/providers/types";
import * as T from "./types";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as mutations from "@polkadex/orderbook/graphql/mutations";
import { stringToHex } from "@polkadot/util";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { Signer } from "@polkadot/types/types";
import { ApiPromise } from "@polkadot/api";

export const userMainAccountDetails = (
  userMainAccount: string,
  extensionMainAccount: ExtensionAccount[]
) =>
  extensionMainAccount?.find(
    ({ account }) => account.address?.toLowerCase() === userMainAccount?.toLowerCase()
  );

export const selectIsAddressInExtension = (
  address: string,
  allAccounts: T.ExtensionWalletState["allAccounts"]
): boolean => {
  return address && allAccounts?.some(({ account }) => account?.address === address);
};

export const executeRegisterEmail = async (data: T.LinkEmailData, signature: string) => {
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

export const createSignedData = async (
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

export const registerMainAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.registerMainAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, { signer }, mainAddress, true);
  return res;
};
