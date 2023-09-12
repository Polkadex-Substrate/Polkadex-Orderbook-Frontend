import { isReady } from "@polkadot/wasm-crypto";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";
import keyring from "@polkadot/ui-keyring";

import { ProfileState } from "../profile";
import { TradeAccount } from "../../types";

import * as T from "./types";

import { ExtrinsicResult, signAndSendExtrinsic } from "@/helpers";

// This is needed as the selector one can not be used inside a function.
export const getTradeAccount = (
  addr: string,
  tradeAccounts: TradeAccount[],
) => {
  const acc = tradeAccounts?.find(
    (tradeAcc) => tradeAcc.address?.toLowerCase() === addr?.toLowerCase(),
  );

  return acc;
};

export async function loadKeyring() {
  const { cryptoWaitReady } = await import("@polkadot/util-crypto");
  if (!isReady()) await cryptoWaitReady();
}

export async function getAllTradeAccountsInBrowser(): Promise<TradeAccount[]> {
  await loadKeyring();
  const allAccounts = keyring.getPairs();
  return allAccounts;
}

export const addProxyToAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string,
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.addProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(
    api,
    ext,
    { signer },
    mainAddress,
    true,
  );
  return res;
};

export const removeProxyFromAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string,
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.removeProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(
    api,
    ext,
    { signer },
    mainAddress,
    true,
  );
  return res;
};

// Selectors
export const selectTradeAccount = (
  address: string,
  allBrowserAccounts: T.TradeWalletState["allBrowserAccounts"],
): TradeAccount | undefined =>
  allBrowserAccounts?.find(
    (account) => account?.address?.toLowerCase() === address?.toLowerCase(),
  );

export const selectShouldShowProtectedPassword = (
  tradeWalletState: T.TradeWalletState,
  profileState: ProfileState,
): boolean =>
  tradeWalletState?.allBrowserAccounts?.some(
    (account) =>
      account?.address?.toLowerCase() ===
      profileState?.selectedAccount?.tradeAddress?.toLowerCase(),
  );
