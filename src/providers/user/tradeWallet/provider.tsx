import { useReducer } from "react";
import { Provider } from "./context";
import { tradeWalletReducer, initialState } from "./reducer";
import { KeyringPair } from "@polkadot/keyring/types";
import keyring from "@polkadot/ui-keyring";
import { transformAddress } from "../profile/helpers";
import FileSaver from "file-saver";

import * as T from "./types";
import * as A from "./actions";

export const AuthProvider: T.TradeWalletComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(tradeWalletReducer, initialState);

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

  return (
    <Provider
      value={{
        ...state,
        onExportTradeAccount,
      }}>
      {children}
    </Provider>
  );
};
