import { useCallback, useEffect, useReducer } from "react";
import keyring from "@polkadot/ui-keyring";
import FileSaver from "file-saver";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";

import { transformAddress } from "../profile";
import { TradeAccount } from "../../types";

import { Provider } from "./context";
import { tradeWalletReducer, initialState } from "./reducer";
import {
  loadKeyring,
  getAllTradeAccountsInBrowser,
  addProxyToAccount,
} from "./helper";
import * as T from "./types";
import * as A from "./actions";

export const TradeWalletProvider: T.TradeWalletComponent = ({ children }) => {
  const [state, dispatch] = useReducer(tradeWalletReducer, initialState);
  const nativeApiState = useNativeApi();
  const { onHandleError, onHandleNotification, hasExtension } =
    useSettingsProvider();

  // Actions
  const onExportTradeAccount = (
    payload: A.ExportTradeAccountFetch["payload"]
  ) => {
    const { address, password = "" } = payload;
    const selectedAccount = state.allBrowserAccounts?.find(
      (account) => account?.address?.toLowerCase() === address?.toLowerCase()
    );
    if (!selectedAccount) return;
    try {
      selectedAccount.isLocked && selectedAccount.unlock(password);

      const blob = new Blob([JSON.stringify(selectedAccount.toJson())], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(
        blob,
        `${selectedAccount?.meta?.name}-${transformAddress(
          selectedAccount?.address
        )}.json`
      );
    } catch (error) {
      onHandleError("Cannot export this account, incorrect password");
    } finally {
      dispatch(A.exportTradeAccountData());
    }
  };

  const onImportTradeAccountJson = (
    payload: A.ImportTradeAccountJsonFetch["payload"]
  ) => {
    const { file, password } = payload;
    let tradeAddress = "";
    try {
      const modifiedFile = file;
      const pair = keyring.restoreAccount(modifiedFile, password || "");
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
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Can't Import Account, Invalid password or file";
      if (tradeAddress?.length)
        dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
      dispatch(A.registerTradeAccountError(error));
      onHandleError(errorMessage);
    }
  };

  const onImportTradeAccount = (
    payload: A.ImportTradeAccountFetch["payload"]
  ) => {
    const { mnemonic, name, password } = payload;
    let tradeAddress = "";
    try {
      const { pair } = keyring.addUri(mnemonic, password || "", {
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

      onHandleError("Cannot import account, please check your mnemonic");
      dispatch(A.tradeAccountsError(error));
    }
  };

  const onLoadTradeAccounts = useCallback(async () => {
    try {
      dispatch(A.tradeAccountsFetch());
      await loadKeyring();
      const allBrowserAccounts: TradeAccount[] =
        await getAllTradeAccountsInBrowser();
      dispatch(A.tradeAccountsData({ allAccounts: allBrowserAccounts }));
    } catch (error) {
      onHandleError(error?.message ?? error);
      dispatch(A.tradeAccountsError(error));
    }
  }, [onHandleError]);

  const onTradeAccountUpdate = useCallback(
    (payload: A.TradeAccountUpdate["payload"]) => {
      try {
        const { proxy } = payload;
        onHandleNotification({
          type: "Success",
          message: "Trade account added,new trade account created",
        });
      } catch (error) {
        onHandleError(error?.message ?? error);
        dispatch(A.registerTradeAccountError(error));
      }
    },
    [onHandleError, onHandleNotification]
  );

  const onRegisterTradeAccount = async (
    payload: A.RegisterTradeAccountFetch["payload"]
  ) => {
    let tradeAddress: string;
    try {
      dispatch(A.registerTradeAccountFetch(payload));

      const api = nativeApiState.api;
      const {
        password,
        name,
        address,
        allAccounts: controllerWallets,
      } = payload;
      const mnemonic = mnemonicGenerate();
      const controllerWallet = controllerWallets?.find(
        ({ account }) => account.address === address
      );
      if (!controllerWallet || !api) {
        console.error("controllerWallet or api not found");
        return;
      }
      const { pair } = keyring.addUri(mnemonic, password, {
        name,
      });
      tradeAddress = pair.address;
      const res = await addProxyToAccount(
        api,
        tradeAddress,
        controllerWallet.signer,
        controllerWallet.account.address
      );

      if (res.isSuccess) {
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
        }, 2000);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      // trade address is assigned in the try block
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tradeAddress &&
        dispatch(A.removeTradeAccountFromBrowser({ address: tradeAddress }));
      onHandleError(error?.message ?? error);
      dispatch(A.registerTradeAccountError(error));
    }
  };

  const onRemoveProxyAccountFromChain = async (
    payload: A.RemoveProxyAccountFromChainFetch["payload"]
  ) => {
    dispatch(A.removeProxyAccountFromChainFetch(payload));
    try {
      const api = nativeApiState.api;
      const { address: tradeAddress, allAccounts } = payload;
    } catch (error) {
      dispatch(A.removeProxyAccountFromChainData({ address: payload.address }));
      onHandleError(error?.message ?? error);
      dispatch(A.registerTradeAccountError(error));
    }
  };

  const onRegisterTradeAccountReset = () => {
    dispatch(A.registerTradeAccountReset());
  };

  const onRegisterTradeAccountData = (
    payload: T.OnRegisterTradeAccountData
  ) => {
    dispatch(A.registerTradeAccountData(payload));
  };

  const onRemoveTradeAccountFromBrowser = (address: string) => {
    dispatch(A.removeTradeAccountFromBrowser({ address }));
  };

  const onUnlockTradeAccount = (payload: A.UnlockTradeAccount["payload"]) => {
    const { address, password } = payload;
    try {
      const _allAccounts = [...state.allBrowserAccounts];
      const pair = _allAccounts?.find(
        (account) => account?.address === address
      );
      if (!pair) {
        onHandleError("No such address exists");
        return;
      }
      pair.unlock(password.toString());
      dispatch(A.unlockTradeAccount(payload));
    } catch (e) {
      onHandleError("Invalid Password");
    }
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

  const onExportTradeAccountActive = useCallback(() => {
    dispatch(A.exportTradeAccountActive());
  }, []);

  useEffect(() => {
    if (hasExtension) onLoadTradeAccounts();
  }, [onLoadTradeAccounts, hasExtension]);

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
      }}
    >
      {children}
    </Provider>
  );
};
