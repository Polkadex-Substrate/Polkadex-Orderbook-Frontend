import { call, put, take } from "redux-saga/effects";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { eventChannel } from "redux-saga";

import { sendError } from "../../..";
import { extensionWalletData } from "../actions";

import { ExtensionAccount } from "@polkadex/orderbook/modules/types";

export function* polkadotExtensionWalletSaga() {
  try {
    const allAccounts: ExtensionAccount[] = yield call(getAllExtensionWalletAccounts);
    yield put(extensionWalletData({ allAccounts }));
    const subscriptionChannel = yield call(extensionAccountsSubscription);
    while (true) {
      const action = yield take(subscriptionChannel);
      yield put(action);
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
      })
    );
  }
}

async function getAllExtensionWalletAccounts(): Promise<ExtensionAccount[]> {
  try {
    const { web3Accounts, web3Enable, web3FromAddress, web3EnablePromise } = await import(
      "@polkadot/extension-dapp"
    );
    await web3EnablePromise;
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

function* extensionAccountsSubscription() {
  console.log("extension subscription run");
  const { web3AccountsSubscribe, web3FromAddress } = yield call(
    () => import("@polkadot/extension-dapp")
  );
  return eventChannel((emit) => {
    const unsubscribe = web3AccountsSubscribe(
      async (injectedAccounts: InjectedAccountWithMeta[]) => {
        console.log("wallet subscription data len", injectedAccounts.length);
        const extensionAccountPromises: Promise<ExtensionAccount>[] = injectedAccounts.map(
          async (account): Promise<ExtensionAccount> => {
            return {
              account,
              signer: (await web3FromAddress(account.address)).signer,
            };
          }
        );
        const allAccounts = await Promise.all(extensionAccountPromises);
        emit(extensionWalletData({ allAccounts }));
      }
    );
    return () => unsubscribe.then((fn) => fn());
  });
}
