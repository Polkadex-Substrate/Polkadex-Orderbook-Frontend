import { API } from "aws-amplify";
import * as queries from "@orderbook/core/graphql/queries";
import { sendQueryToAppSync } from "@orderbook/core/utils/orderbookService/appsync_v1/helpers";
import { isReady } from "@polkadot/wasm-crypto";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";
import { ExtrinsicResult, signAndSendExtrinsic } from "@orderbook/core/helpers";

import { TradeAccount } from "../../types";

import { ImportFromFile, ImportFromMnemonic } from "./provider";

export const getAllProxyAccounts = async (
  mainAccount: string,
  Api = API
): Promise<string[]> => {
  try {
    const res = await sendQueryToAppSync({
      query: queries.findUserByMainAccount,
      variables: { main_account: mainAccount },
      API: Api,
    });
    const proxies =
      (res?.data?.findUserByMainAccount?.proxies as string[]) ?? [];

    return { ...proxies };
  } catch (error) {
    return { ...[] };
  }
};

export async function loadKeyring() {
  const { cryptoWaitReady } = await import("@polkadot/util-crypto");
  if (!isReady()) await cryptoWaitReady();
}

export async function getAllTradeAccountsInBrowser(): Promise<TradeAccount[]> {
  const { default: keyring } = await import("@polkadot/ui-keyring");
  await loadKeyring();
  const allAccounts = keyring.getPairs();
  return allAccounts;
}

export const onImportTradeAccountJson = async ({
  file,
  password,
}: ImportFromFile) => {
  const { default: keyring } = await import("@polkadot/ui-keyring");
  const res = keyring?.restoreAccount(file as any, password || "");
  console.log(res);
  return res;
};

export const onImportTradeAccountMnemonic = async ({
  name,
  mnemonic,
  password,
}: ImportFromMnemonic) => {
  const { default: keyring } = await import("@polkadot/ui-keyring");
  const { pair } = keyring.addUri(mnemonic, password || "", {
    name,
  });
  return pair;
};

export const addProxyToAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.addProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(
    api,
    ext,
    { signer },
    mainAddress,
    true
  );
  return res;
};

export const removeProxyFromAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.removeProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(
    api,
    ext,
    { signer },
    mainAddress,
    true
  );
  return res;
};
