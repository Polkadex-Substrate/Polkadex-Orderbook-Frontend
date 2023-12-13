import { useCallback, useEffect, useReducer } from "react";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { ExtensionAccount, useUserAccounts } from "@polkadex/react-providers";
import { useQuery, useMutation } from "@tanstack/react-query";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import FileSaver from "file-saver";
import {
  fetchOnChainBalance,
  getFromStorage,
  removeFromStorage,
} from "@orderbook/core/helpers";
import { ApiPromise } from "@polkadot/api";
import { LOCAL_STORAGE_ID, QUERY_KEYS } from "@orderbook/core/constants";

import { TradeAccount } from "../../types";
import { useNativeApi } from "../../public/nativeApi";
import { transformAddress } from "../profile";
import { useSettingsProvider } from "../../public/settings";

import {
  addProxyToAccount,
  removeProxyFromAccount,
  getAllProxyAccounts,
  getAllTradeAccountsInBrowser,
  loadKeyring,
  onImportTradeAccountJson,
  onImportTradeAccountMnemonic,
} from "./methods";
import { Provider } from "./context";
import { actions } from "./actions";
import { initialState, reducer } from "./reducer";

export interface DecodedFile {
  encoded: string;
  encoding: {
    content: string[];
    type: string[];
    version: string;
  };
  address: string;
  meta: {
    name: string;
    whenCreated: number;
  };
}
export interface RegisterTradeAccountData {
  password: string;
  name: string;
}

export interface ExportTradeAccountData {
  tradeAccount: TradeAccount;
  password?: string;
}

export interface RemoveTradeAccountData {
  tradeAddress: string;
}
type CallbackFn = () => void;

export type ImportFromFile = { password: string; file: DecodedFile };
export type UnlockTradeAccount = { address: string; password: string };
export type ImportFromMnemonic = {
  mnemonic: string;
  name: string;
  password?: string;
};
export type Actions = {
  onSelectWallet: (payload: ExtensionAccount) => void;
  onSelectAccount: (payload: TradeAccount) => void;
  onSelectExtension: (
    payload: (typeof ExtensionsArray)[0],
    callbackFn?: CallbackFn
  ) => void;
  onResetWallet: () => void;
  onResetExtension: () => void;
  onResetTempMnemonic: () => void;
  onResetTempTrading: () => void;
  onLogout: () => void;
  onImportFromFile: (values: ImportFromFile) => Promise<void>;
  onImportFromMnemonic: (values: ImportFromMnemonic) => Promise<void>;
  onRegisterTradeAccount: (value: RegisterTradeAccountData) => Promise<void>;
  onExportTradeAccount: (value: ExportTradeAccountData) => void;
  onRemoveTradingAccountFromDevice: (value: string) => Promise<void>;
  onRemoveTradingAccountFromChain: (
    value: RemoveTradeAccountData
  ) => Promise<void>;
  onSetTempTrading: (value: TradeAccount) => void;
  onUnlockTradeAccount: (value: UnlockTradeAccount) => void;
};

export const WalletProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { connected, api } = useNativeApi();
  const { onHandleError } = useSettingsProvider();
  const { isReady } = useUserAccounts();

  const onSelectWallet: Actions["onSelectWallet"] = (
    payload,
    callbackFn?: () => void
  ) => {
    dispatch(actions.setSelectWallet(payload));
    callbackFn?.();
  };

  const onSelectAccount: Actions["onSelectAccount"] = (payload) => {
    dispatch(actions.setSelectAccount(payload));
  };

  const onSelectExtension: Actions["onSelectExtension"] = (
    payload,
    callbackFn?: () => void
  ) => {
    dispatch(actions.setSelectExtension(payload));
    callbackFn?.();
  };

  const onSetTempTrading: Actions["onSetTempTrading"] = (e) =>
    dispatch(actions.setTempTrading(e));

  const onResetExtension: Actions["onResetExtension"] = () =>
    dispatch(actions.resetSelectExtension());

  const onResetWallet: Actions["onResetWallet"] = () =>
    dispatch(actions.resetSelectWallet());

  const onResetTempMnemonic: Actions["onResetTempMnemonic"] = () =>
    dispatch(actions.resetTempMnemonic());

  const onResetTempTrading: Actions["onResetTempTrading"] = () =>
    dispatch(actions.resetTempTrading());

  const onLogout: Actions["onLogout"] = () => {
    dispatch(actions.logout());
  };

  // Import from JSON file and push trading accounts
  const {
    mutateAsync: onImportFromFile,
    status: importFromFileStatus,
    error: importFromFileError,
  } = useMutation({
    mutationFn: async ({ file, password }: ImportFromFile) => {
      const pair = await onImportTradeAccountJson({ file, password });
      dispatch(actions.setLocalTradingAccount(pair));
    },
    onError: (e) => {
      const errorMessage = e instanceof Error ? e.message : (e as string);
      onHandleError(errorMessage);
    },
  });

  // Import from mnemonic and push trading accounts
  const { mutateAsync: onImportFromMnemonic } = useMutation({
    mutationFn: async ({ mnemonic, name, password }: ImportFromMnemonic) => {
      const pair = await onImportTradeAccountMnemonic({
        name,
        mnemonic,
        password,
      });
      dispatch(actions.setLocalTradingAccount(pair));
    },
    onError: (e) => {
      const errorMessage = e instanceof Error ? e.message : (e as string);
      onHandleError(errorMessage);
    },
  });

  // Get initial tradesAccounts
  const onLoadTradeAccounts = useCallback(async () => {
    await loadKeyring();
    const tradingAccounts: TradeAccount[] =
      await getAllTradeAccountsInBrowser();
    dispatch(actions.setLocalTradingAccount(tradingAccounts));
    const defaultTradeAddress = getFromStorage(
      LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT
    );
    const tradeAccount = tradingAccounts.find(
      (account) => account.address === defaultTradeAddress
    );
    if (tradeAccount) onSelectAccount(tradeAccount);
    else removeFromStorage(LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT);
  }, []);

  // Get onChain balance
  const {
    data: walletBalance,
    isError: walletHasError,
    isLoading: walletLoading,
    isSuccess: walletSuccess,
  } = useQuery({
    queryKey: QUERY_KEYS.onChainBalances(
      state?.selectedWallet?.address as string
    ),
    enabled: !!state?.selectedWallet?.address,
    queryFn: async () =>
      await fetchOnChainBalance(
        api as ApiPromise,
        "PDEX",
        state.selectedWallet?.address as string
      ),
  });

  // Get proxies accounts by mainAccount
  const {
    data: proxiesAccounts,
    isError: proxiesHasError,
    isLoading: proxiesLoading,
    isSuccess: proxiesSuccess,
    isFetching,
  } = useQuery<string[]>({
    queryKey: QUERY_KEYS.proxyAccounts(
      state?.selectedWallet?.address as string,
      state.tempTrading?.address as string
    ),
    enabled: !!state?.selectedWallet?.address || !!state.tempTrading?.address,
    queryFn: async () => {
      const accounts = await getAllProxyAccounts(
        state?.selectedWallet?.address as string
      );

      return Object.values(accounts);
    },
  });

  // Get tradingAccounts available in browser
  const {
    data: tradingAccounts,
    isError: tradingHasError,
    isLoading: tradingLoading,
    isSuccess: tradingSuccess,
  } = useQuery({
    queryKey: QUERY_KEYS.tradingAccounts(
      state?.selectedWallet?.address as string
    ),
    enabled: !!state?.selectedWallet?.address,
    queryFn: async () => {
      const accounts = await getAllTradeAccountsInBrowser();
      return accounts;
    },
  });

  // Register trade account
  const {
    mutateAsync: onRegisterTradeAccount,
    status: registerStatus,
    error: registerError,
  } = useMutation({
    mutationKey: [!!state.tempMnemonic?.length],
    mutationFn: async ({ password, name }: RegisterTradeAccountData) => {
      if (connected && !!api && !!state.selectedWallet) {
        const mnemonic = mnemonicGenerate();
        const { default: keyring } = await import("@polkadot/ui-keyring");

        const { pair } = keyring.addUri(mnemonic, password ?? undefined, {
          name,
        });

        const tradeAddress = pair.address;
        const res = await addProxyToAccount(
          api,
          tradeAddress,
          state.selectedWallet.signer,
          state.selectedWallet.address
        );
        if (res.isSuccess) {
          dispatch(actions.setTempMnemonic(mnemonic));
          dispatch(actions.setLocalTradingAccount(pair));
          dispatch(actions.setSelectAccount(pair));
        } else {
          throw new Error(res.message);
        }
      } else {
        throw new Error("API not connected");
      }
    },
    onError: (e) => console.log("Error", e),
  });

  // Remove from browser
  const onRemoveTradingAccountFromDevice = async (address: string) => {
    const { default: keyring } = await import("@polkadot/ui-keyring");
    keyring.forgetAccount(address);
    dispatch(actions.removeLocalTradingAccount(address));
    dispatch(actions.resetTempTrading());
  };

  // Remove from blockchain
  const {
    mutateAsync: onRemoveTradingAccountFromChain,
    status: removingStatus,
    error: removingError,
  } = useMutation({
    mutationFn: async ({ tradeAddress }: RemoveTradeAccountData) => {
      try {
        const { selectedWallet } = state;
        if (connected && api && selectedWallet) {
          const res = await removeProxyFromAccount(
            api,
            tradeAddress,
            selectedWallet.signer,
            selectedWallet.address
          );

          if (res.isSuccess) {
            await onRemoveTradingAccountFromDevice(tradeAddress);
          } else {
            throw new Error(res.message);
          }
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onError: (e) => console.log("Error", e),
  });

  // Export trading account
  const onExportTradeAccount: Actions["onExportTradeAccount"] = ({
    tradeAccount,
    password,
  }) => {
    try {
      tradeAccount.isLocked && tradeAccount.unlock(password);
      const blob = new Blob([JSON.stringify(tradeAccount.toJson())], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(
        blob,
        `${tradeAccount?.meta?.name}-${transformAddress(
          tradeAccount?.address
        )}.json`
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  // Unlock trading account
  const onUnlockTradeAccount = (payload: UnlockTradeAccount) => {
    const { address, password } = payload;
    try {
      const pair = state?.localTradingAccounts?.find(
        (account) => account?.address === address
      );
      if (!pair) {
        onHandleError("No such address exists");
        return;
      }
      pair.unlock(password.toString());
      dispatch(
        actions.setLocalTradingAccount(state?.localTradingAccounts || [])
      );
    } catch (e) {
      onHandleError("Invalid Password");
    }
  };

  useEffect(() => {
    onLoadTradeAccounts();
  }, [onLoadTradeAccounts]);

  return (
    <Provider
      value={{
        ...state,
        proxiesAccounts,
        proxiesHasError,
        proxiesLoading: proxiesLoading && isFetching,
        proxiesSuccess,
        tradingAccounts,
        tradingHasError,
        tradingLoading,
        tradingSuccess,
        onLogout,
        onSelectWallet,
        onSelectAccount,
        onSelectExtension,
        onResetExtension,
        onResetWallet,
        onResetTempMnemonic,
        onUnlockTradeAccount,
        onImportFromFile,
        importFromFileStatus,
        importFromFileError,
        onImportFromMnemonic,
        onExportTradeAccount,
        onRegisterTradeAccount,
        onRemoveTradingAccountFromDevice,
        onRemoveTradingAccountFromChain,
        removingStatus,
        removingError,
        registerStatus,
        registerError,
        onSetTempTrading,
        onResetTempTrading,
        walletBalance: walletBalance ?? 0,
        walletHasError,
        walletLoading,
        walletSuccess,
      }}
    >
      {children}
    </Provider>
  );
};
