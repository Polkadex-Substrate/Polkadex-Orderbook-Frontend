import { call, put } from "redux-saga/effects";

import { sendError } from "../../..";
import { extensionWalletData } from "../actions";

import { ExtensionAccount } from "@polkadex/orderbook/modules/types";

export function* polkadotExtensionWalletSaga() {
  try {
    const allAccounts: ExtensionAccount[] = yield call(getAllExtensionWalletAccounts);
    yield put(extensionWalletData({ allAccounts }));
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
    const { web3Accounts, web3Enable, web3FromAddress } = await import(
      "@polkadot/extension-dapp"
    );
    const extensions = await web3Enable("polkadex");
    if (extensions.length === 0) {
      throw new Error("no extensions installed");
    }
    const allAccounts: any = await web3Accounts({ ss58Format: 88 });
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
