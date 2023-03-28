import { useReducer } from "react";
import { Provider } from "./context";
import { tradeWalletReducer, initialState } from "./reducer";
import { KeyringPair } from "@polkadot/keyring/types";
import keyring from "@polkadot/ui-keyring";
import { transformAddress } from "../profile/helpers";
import FileSaver from "file-saver";
import { isReady } from "@polkadot/wasm-crypto";
import { TradeAccount } from "../../types";

import * as T from "./types";
import * as A from "./actions";
import { useProfile } from "../profile";

export const AuthProvider: T.TradeWalletComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(tradeWalletReducer, initialState);
  const profileState = useProfile();

  // Actions
  const onExportTradeAccount = (payload: A.ExportTradeAccountFetch["payload"]) => {
    const { address, password = "" } = payload;
    const selectedAccount: KeyringPair = state.allBrowserAccounts.find(
      (account) => account?.address?.toLowerCase() === address?.toLowerCase()
    );

    try {
      const pairToJson = keyring.backupAccount(selectedAccount, password);
      selectedAccount.lock();

      const blob = new Blob([JSON.stringify(pairToJson)], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(
        blob,
        `${selectedAccount?.meta?.name}-${transformAddress(selectedAccount?.address)}.json`
      );
    } catch (error) {
      onError("Cannot export this account due to Incorrect Password");
    } finally {
      dispatch(A.exportTradeAccountData());
    }
  };

  const onImportTradeAccountJson = (payload: A.ImportTradeAccountJsonFetch["payload"]) => {
    const { file, password } = payload;
    let tradeAddress = "";
    try {
      const modifiedFile = file;
      const pair = keyring.restoreAccount(modifiedFile, password);
      tradeAddress = pair?.address;
      dispatch(A.tradeAccountPush({ pair }));
      dispatch(
        A.registerTradeAccountData({
          account: {
            name: String(pair.meta?.name),
            address: tradeAddress,
          },
        })
      );
      dispatch(A.importTradeAccountData());
      // automatically set as in use.

      profileState.onUserSelectAccount({ tradeAddress });
    } catch (error) {
      if (tradeAddress?.length)
        dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
      dispatch(A.registerTradeAccountError(error));
      onError("Cannot import account. Invalid password or file");
    }
  };

  const onImportTradeAccount = (payload: A.ImportTradeAccountFetch["payload"]) => {
    const { mnemonic, name, password } = payload;
    let tradeAddress = "";
    try {
      const { pair } = keyring.addUri(mnemonic, password?.length > 0 ? password : null, {
        name: name,
      });
      tradeAddress = pair?.address;
      dispatch(A.tradeAccountPush({ pair }));
      setTimeout(() => {
        dispatch(
          A.registerTradeAccountData({
            mnemonic,
            account: {
              name,
              address: tradeAddress,
            },
          })
        );
        dispatch(A.importTradeAccountData());
      }, 2000);
    } catch (error) {
      if (tradeAddress?.length)
        dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
      if (typeof onError === "function")
        onError("Can not import account. Please check your mnemonic");
      dispatch(A.tradeAccountsError(error));
    }
  };

  const onLoadTradeAccounts = async () => {
    try {
      await loadKeyring();
      const allBrowserAccounts: TradeAccount[] = await getAllTradeAccountsInBrowser();
      dispatch(A.tradeAccountsData({ allAccounts: allBrowserAccounts }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (error as string);
      onError(errorMessage);
    }
  };

  async function loadKeyring() {
    const { cryptoWaitReady } = await import("@polkadot/util-crypto");
    if (!isReady()) await cryptoWaitReady();
  }

  async function getAllTradeAccountsInBrowser(): Promise<TradeAccount[]> {
    await loadKeyring();
    const allAccounts = keyring.getPairs();
    return allAccounts;
  }

  return (
    <Provider
      value={{
        ...state,
        onExportTradeAccount,
        onImportTradeAccountJson,
        onImportTradeAccount,
        onLoadTradeAccounts,
      }}>
      {children}
    </Provider>
  );
};
