import { useReducer } from "react";
import { Provider } from "./context";
import { tradeWalletReducer, initialState } from "./reducer";
import { KeyringPair } from "@polkadot/keyring/types";
import keyring from "@polkadot/ui-keyring";
import { transformAddress } from "../profile/helpers";
import FileSaver from "file-saver";

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

  const onImportTradeAccount = (payload: A.ImportTradeAccountJsonFetch["payload"]) => {
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

      // When Trade wallet context will created, then update it to profile context userAccountSelectFetch
      profileState.onUserSelectAccount({ tradeAddress });
    } catch (error) {
      if (tradeAddress?.length)
        dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
      dispatch(A.registerTradeAccountError(error));
      onError("Cannot import account. Invalid password or file");
    }
  };

  return (
    <Provider
      value={{
        ...state,
        onExportTradeAccount,
        onImportTradeAccount,
      }}>
      {children}
    </Provider>
  );
};
