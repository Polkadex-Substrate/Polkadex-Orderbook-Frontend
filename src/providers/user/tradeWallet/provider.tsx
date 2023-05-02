import { useCallback, useEffect, useReducer } from "react";
import { KeyringPair } from "@polkadot/keyring/types";
import keyring from "@polkadot/ui-keyring";
import FileSaver from "file-saver";
import { ApiPromise } from "@polkadot/api";
import { mnemonicGenerate } from "@polkadot/util-crypto";

import { transformAddress } from "../profile/helpers";
import { TradeAccount } from "../../types";
import { useProfile } from "../profile";
import { useNativeApi } from "../../public/nativeApi";
import { useExtensionWallet } from "../extensionWallet";
import { useSettingsProvider } from "../../public/settings";

import { Provider } from "./context";
import { tradeWalletReducer, initialState } from "./reducer";
import {
  loadKeyring,
  getAllTradeAccountsInBrowser,
  addProxyToAccount,
  removeProxyFromAccount,
} from "./helper";
import * as T from "./types";
import * as A from "./actions";

export const TradeWalletProvider: T.TradeWalletComponent = ({ children }) => {
  const [state, dispatch] = useReducer(tradeWalletReducer, initialState);
  const profileState = useProfile();
  const nativeApiState = useNativeApi();
  const extensionWalletState = useExtensionWallet();
  const settingsState = useSettingsProvider();

  // Actions
  const onExportTradeAccount = (payload: A.ExportTradeAccountFetch["payload"]) => {
    const { address, password = "" } = payload;
    const selectedAccount: KeyringPair = state.allBrowserAccounts?.find(
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
      settingsState.onHandleError("Cannot export this account, incorrect password");
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
      profileState.onUserSelectAccount({ tradeAddress });
    } catch (error) {
      if (tradeAddress?.length)
        dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
      dispatch(A.registerTradeAccountError(error));
      settingsState.onHandleError("Cannot import account, Invalid password or file");
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

      settingsState.onHandleError("Cannot import account, please check your mnemonic");
      dispatch(A.tradeAccountsError(error));
    }
  };

  const onLoadTradeAccounts = useCallback(async () => {
    try {
      await loadKeyring();
      const allBrowserAccounts: TradeAccount[] = await getAllTradeAccountsInBrowser();
      dispatch(A.tradeAccountsData({ allAccounts: allBrowserAccounts }));
    } catch (error) {
      settingsState.onHandleError(error?.message ?? error);
    }
  }, [settingsState]);

  const onTradeAccountUpdate = (payload: A.TradeAccountUpdate["payload"]) => {
    try {
      const { proxy } = payload;
      profileState.onUserSelectAccount({
        tradeAddress: proxy,
      });
      settingsState.onHandleNotification({
        type: "Success",
        message: "Trade account added,new trade account created",
      });
    } catch (error) {
      settingsState.onHandleError(error?.message ?? error);
      dispatch(A.registerTradeAccountError(error));
    }
  };

  const onRegisterTradeAccount = async (payload: A.RegisterTradeAccountFetch["payload"]) => {
    let tradeAddress: string;
    try {
      const api = nativeApiState.api;
      const controllerWallets = extensionWalletState.allAccounts;
      const { password, name, address } = payload;
      const mnemonic = mnemonicGenerate();
      const { account, signer } = controllerWallets?.find(
        ({ account }) => account.address === address
      );
      const { pair } = keyring.addUri(mnemonic, password?.length > 0 ? password : null, {
        name,
      });
      tradeAddress = pair.address;
      const res = await addProxyToAccount(api, tradeAddress, signer, account?.address);

      if (res.isSuccess) {
        dispatch(A.tradeAccountPush({ pair }));

        profileState.onUserProfileAccountPush({ tradeAddress, mainAddress: address });
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
        }, 2000);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
      settingsState.onHandleError(error?.message ?? error);
      dispatch(A.registerTradeAccountError(error));
    }
  };

  const onRemoveProxyAccountFromChain = async (
    payload: A.RemoveProxyAccountFromChainFetch["payload"]
  ) => {
    try {
      const api: ApiPromise = nativeApiState.api;
      const { address: trade_Address } = payload;
      const linkedMainAddress =
        trade_Address &&
        profileState.userData?.userAccounts?.find(
          ({ tradeAddress }) => tradeAddress === trade_Address
        )?.mainAddress;

      if (!linkedMainAddress) {
        throw new Error("Invalid trade address.");
      }
      const { account, signer } =
        linkedMainAddress &&
        extensionWalletState.allAccounts?.find(
          ({ account }) => account?.address?.toLowerCase() === linkedMainAddress?.toLowerCase()
        );

      if (!account?.address) {
        throw new Error("Please select a funding account!");
      }
      if (api.isConnected && account?.address) {
        const res = await removeProxyFromAccount(api, trade_Address, signer, account.address);
        if (res.isSuccess) {
          settingsState.onHandleNotification({
            type: "Success",
            message: "Congratulations! Your trade account has been removed from the chain!",
          });
          dispatch(A.previewAccountModalCancel());
          dispatch(A.removeProxyAccountFromChainData({ address: payload.address }));
          dispatch(A.removeTradeAccountFromBrowser({ address: trade_Address }));
          profileState.onUserProfileTradeAccountDelete(trade_Address);
        } else {
          throw new Error(res.message);
        }
      }
    } catch (error) {
      dispatch(A.removeProxyAccountFromChainData({ address: payload.address }));
      settingsState.onHandleError(error?.message ?? error);
      dispatch(A.registerTradeAccountError(error));
    }
  };

  const onRegisterTradeAccountReset = () => {
    dispatch(A.registerTradeAccountReset());
  };

  const onRegisterTradeAccountData = (payload: T.RegisterTradeAccountData) => {
    dispatch(A.registerTradeAccountData(payload));
  };

  const onRemoveTradeAccountFromBrowser = (address: string) => {
    dispatch(A.removeTradeAccountFromBrowser({ address }));
  };

  const onUnlockTradeAccount = (payload: A.UnlockTradeAccount["payload"]) => {
    dispatch(A.unlockTradeAccount(payload));
  };

  const onTradeAccountPush = (payload: A.TradeAccountPush["payload"]) => {
    dispatch(A.tradeAccountPush(payload));
  };

  const onRegisterAccountModalActive = (
    payload?: A.RegisterTradeAccountModalActive["payload"]
  ) => {
    dispatch(A.registerAccountModalActive(payload));
  };

  const onRegisterAccountModalCancel = () => {
    dispatch(A.registerAccountModalCancel());
  };

  const onPreviewAccountModalActive = (
    payload?: A.PreviewTradeAccountModalActive["payload"]
  ) => {
    dispatch(A.previewAccountModalActive(payload));
  };

  const onPreviewAccountModalCancel = () => {
    dispatch(A.previewAccountModalCancel());
  };

  const onExportTradeAccountActive = () => {
    dispatch(A.exportTradeAccountActive());
  };

  useEffect(() => {
    onLoadTradeAccounts();
  }, []);

  return (
    <Provider
      value={{
        ...state,
        onExportTradeAccount,
        onImportTradeAccountJson,
        onImportTradeAccount,
        onLoadTradeAccounts,
        onTradeAccountUpdate,
        onRegisterTradeAccount,
        onRemoveProxyAccountFromChain,
        onRegisterTradeAccountReset,
        onRegisterTradeAccountData,
        onRemoveTradeAccountFromBrowser,
        onUnlockTradeAccount,
        onTradeAccountPush,
        onRegisterAccountModalActive,
        onRegisterAccountModalCancel,
        onPreviewAccountModalActive,
        onPreviewAccountModalCancel,
        onExportTradeAccountActive,
      }}>
      {children}
    </Provider>
  );
};
