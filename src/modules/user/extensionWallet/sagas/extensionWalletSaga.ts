import { call, put } from "redux-saga/effects";

import { sendError } from "../../..";
import { extensionWalletData } from "../actions";
import { InjectedAccount } from "../../polkadotWallet";

export function* extensionWalletSaga() {
  try {
    const allAccounts: InjectedAccount[] = yield call(getAllExtensionWalletAccounts);
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

async function getAllExtensionWalletAccounts(): Promise<InjectedAccount[]> {
  try {
    const { web3Accounts, web3Enable } = await import("@polkadot/extension-dapp");
    const extensions = await web3Enable("polkadot");
    if (extensions.length === 0) {
      throw new Error("no extensions installed");
    }
    const allAccounts: any = await web3Accounts({ ss58Format: 88 });
    return allAccounts.map((account) => {
      return {
        address: account.address,
        meta: account.meta,
        type: account.publicKey,
      };
    });
  } catch (error) {
    console.log(error.message);
  }
}
