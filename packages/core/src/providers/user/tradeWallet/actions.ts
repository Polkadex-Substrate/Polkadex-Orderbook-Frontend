import { CommonError, TradeAccount, ExtensionAccount } from "../../types";

import {
  REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
  USER_PREVIEW_ACCOUNT_MODAL_ACTIVE,
  USER_PREVIEW_ACCOUNT_MODAL_CANCEL,
  USER_REGISTER_TRADE_ACCOUNT_DATA,
  USER_REGISTER_TRADE_ACCOUNT_ERROR,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_REGISTER_TRADE_ACCOUNT_RESET,
  USER_TRADE_ACCOUNT_EXPORT_ACTIVE,
  USER_TRADE_ACCOUNT_EXPORT_DATA,
  USER_TRADE_ACCOUNT_EXPORT_FETCH,
  USER_TRADE_ACCOUNT_IMPORT_DATA,
  USER_TRADE_ACCOUNT_IMPORT_ERROR,
  USER_TRADE_ACCOUNT_IMPORT_FETCH,
  USER_TRADE_ACCOUNT_IMPORT_JSON,
  USER_TRADE_ACCOUNT_MODAL_ACTIVE,
  USER_TRADE_ACCOUNT_MODAL_CANCEL,
  USER_TRADE_ACCOUNT_PUSH,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  USER_TRADE_ACCOUNT_UNLOCK,
  USER_TRADE_ACCOUNT_UPDATE,
  USER_TRADE_ACCOUNTS_DATA,
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
} from "./constants";
import { PreviewAccountModal } from "./types";

import { USER_EVENTS } from "@/constants";

export interface PolkadotWalletFetchPayload {
  allAccounts: TradeAccount[];
}

export interface TradeAccountsFetch {
  type: typeof USER_TRADE_ACCOUNTS_FETCH;
}

export interface TradeAccountsData {
  type: typeof USER_TRADE_ACCOUNTS_DATA;
  payload: PolkadotWalletFetchPayload;
}

export interface TradeAccountsError {
  type: typeof USER_TRADE_ACCOUNTS_ERROR;
  error: CommonError;
}
export interface RegisterTradeAccountFetch {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_FETCH;
  payload: {
    address: string;
    password?: string;
    name?: string;
    allAccounts: ExtensionAccount[];
  };
}

export interface RegisterTradeAccountData {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_DATA;
  payload: {
    mnemonic?: string;
    account: {
      name: string;
      address: string;
    };
  };
}
export interface RegisterTradeAccountModalActive {
  type: typeof USER_TRADE_ACCOUNT_MODAL_ACTIVE;
  payload?: {
    data?: {
      name: string;
      address: string;
    };
    defaultImportActive?: boolean;
  };
}

export interface PreviewTradeAccountModalCancel {
  type: typeof USER_PREVIEW_ACCOUNT_MODAL_CANCEL;
}

export interface PreviewTradeAccountModalActive {
  type: typeof USER_PREVIEW_ACCOUNT_MODAL_ACTIVE;
  payload?: PreviewAccountModal["selected"];
}

export interface RegisterTradeAccountModalCancel {
  type: typeof USER_TRADE_ACCOUNT_MODAL_CANCEL;
}

export interface RegisterTradeAccountError {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_ERROR;
  error: CommonError;
}

export interface RegisterTradeAccountReset {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_RESET;
}

export interface RemoveTradeAccountFromBrowser {
  type: typeof REMOVE_TRADE_ACCOUNT_FROM_BROWSER;
  payload: { address: string };
}

export interface RemoveProxyAccountFromChainFetch {
  type: typeof USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH;
  payload: { address: string; allAccounts: ExtensionAccount[] };
}

export interface RemoveProxyAccountFromChainData {
  type: typeof USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA;
  payload: { address: string };
}

export interface UnlockTradeAccount {
  type: typeof USER_TRADE_ACCOUNT_UNLOCK;
  payload: {
    address: string;
    password: string;
  };
}

export interface ImportTradeAccountFetch {
  type: typeof USER_TRADE_ACCOUNT_IMPORT_FETCH;
  payload: {
    mnemonic: string;
    name: string;
    password?: string;
  };
}

export interface ImportTradeAccountJsonFetch {
  type: typeof USER_TRADE_ACCOUNT_IMPORT_JSON;
  payload: {
    file: any;
    password?: string;
  };
}

export interface ImportTradeAccountData {
  type: typeof USER_TRADE_ACCOUNT_IMPORT_DATA;
}

export interface ImportTradeAccountError {
  type: typeof USER_TRADE_ACCOUNT_IMPORT_ERROR;
  error: CommonError;
}

export interface ExportTradeAccountFetch {
  type: typeof USER_TRADE_ACCOUNT_EXPORT_FETCH;
  payload: {
    address: string;
    password?: string;
  };
}

export interface ExportTradeAccountActive {
  type: typeof USER_TRADE_ACCOUNT_EXPORT_ACTIVE;
}

export interface ExportTradeAccountData {
  type: typeof USER_TRADE_ACCOUNT_EXPORT_DATA;
}

export interface TradeAccountPush {
  type: typeof USER_TRADE_ACCOUNT_PUSH;
  payload: { pair: TradeAccount };
}

export interface TradeAccountUpdate {
  type: typeof USER_TRADE_ACCOUNT_UPDATE;
  payload: {
    type: typeof USER_EVENTS.AddProxy;
    event_id: number;
    main: string;
    proxy: string;
  };
}

export type TradeAccountsAction =
  | TradeAccountsFetch
  | TradeAccountsError
  | TradeAccountsData
  | RegisterTradeAccountFetch
  | RegisterTradeAccountData
  | RegisterTradeAccountError
  | RemoveTradeAccountFromBrowser
  | RegisterTradeAccountReset
  | RemoveProxyAccountFromChainFetch
  | RemoveProxyAccountFromChainData
  | UnlockTradeAccount
  | ImportTradeAccountFetch
  | ImportTradeAccountData
  | ImportTradeAccountError
  | TradeAccountPush
  | RegisterTradeAccountModalActive
  | RegisterTradeAccountModalCancel
  | PreviewTradeAccountModalCancel
  | PreviewTradeAccountModalActive
  | ExportTradeAccountFetch
  | ExportTradeAccountData
  | ExportTradeAccountActive
  | ImportTradeAccountJsonFetch
  | TradeAccountUpdate;

export const tradeAccountsFetch = (): TradeAccountsFetch => ({
  type: USER_TRADE_ACCOUNTS_FETCH,
});

export const tradeAccountsData = (
  payload: PolkadotWalletFetchPayload,
): TradeAccountsData => ({
  type: USER_TRADE_ACCOUNTS_DATA,
  payload,
});

export const tradeAccountsError = (error: CommonError): TradeAccountsError => ({
  type: USER_TRADE_ACCOUNTS_ERROR,
  error,
});
export const registerTradeAccountFetch = (
  payload: RegisterTradeAccountFetch["payload"],
): RegisterTradeAccountFetch => ({
  type: USER_REGISTER_TRADE_ACCOUNT_FETCH,
  payload,
});

export const registerTradeAccountData = (
  payload: RegisterTradeAccountData["payload"],
): RegisterTradeAccountData => ({
  type: USER_REGISTER_TRADE_ACCOUNT_DATA,
  payload,
});

export const registerTradeAccountReset = (): RegisterTradeAccountReset => ({
  type: USER_REGISTER_TRADE_ACCOUNT_RESET,
});

export const registerTradeAccountError = (
  error: CommonError,
): RegisterTradeAccountError => ({
  type: USER_REGISTER_TRADE_ACCOUNT_ERROR,
  error,
});

export const removeTradeAccountFromBrowser = (
  payload: RemoveTradeAccountFromBrowser["payload"],
): RemoveTradeAccountFromBrowser => ({
  type: REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
  payload,
});

export const removeProxyAccountFromChainFetch = (
  payload: RemoveProxyAccountFromChainFetch["payload"],
): RemoveProxyAccountFromChainFetch => ({
  type: USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  payload,
});

export const removeProxyAccountFromChainData = (
  payload: RemoveProxyAccountFromChainData["payload"],
): RemoveProxyAccountFromChainData => ({
  type: USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA,
  payload,
});

export const unlockTradeAccount = (
  payload: UnlockTradeAccount["payload"],
): UnlockTradeAccount => ({
  type: USER_TRADE_ACCOUNT_UNLOCK,
  payload: payload,
});

export const importTradeAccountFetch = (
  payload: ImportTradeAccountFetch["payload"],
): ImportTradeAccountFetch => ({
  type: USER_TRADE_ACCOUNT_IMPORT_FETCH,
  payload: payload,
});

export const importTradeAccountJsonFetch = (
  payload: ImportTradeAccountJsonFetch["payload"],
): ImportTradeAccountJsonFetch => ({
  type: USER_TRADE_ACCOUNT_IMPORT_JSON,
  payload: payload,
});

export const importTradeAccountData = (): ImportTradeAccountData => ({
  type: USER_TRADE_ACCOUNT_IMPORT_DATA,
});

export const importTradeAccountError = (
  error: CommonError,
): ImportTradeAccountError => ({
  type: USER_TRADE_ACCOUNT_IMPORT_ERROR,
  error: error,
});

export const tradeAccountPush = (
  payload: TradeAccountPush["payload"],
): TradeAccountPush => ({
  type: USER_TRADE_ACCOUNT_PUSH,
  payload,
});

export const registerAccountModalActive = (
  payload?: RegisterTradeAccountModalActive["payload"],
): RegisterTradeAccountModalActive => ({
  type: USER_TRADE_ACCOUNT_MODAL_ACTIVE,
  payload,
});

export const registerAccountModalCancel =
  (): RegisterTradeAccountModalCancel => ({
    type: USER_TRADE_ACCOUNT_MODAL_CANCEL,
  });

export const previewAccountModalActive = (
  payload?: PreviewTradeAccountModalActive["payload"],
): PreviewTradeAccountModalActive => ({
  type: USER_PREVIEW_ACCOUNT_MODAL_ACTIVE,
  payload,
});

export const previewAccountModalCancel =
  (): PreviewTradeAccountModalCancel => ({
    type: USER_PREVIEW_ACCOUNT_MODAL_CANCEL,
  });

export const exportTradeAccountFetch = (
  payload?: ExportTradeAccountFetch["payload"],
): ExportTradeAccountFetch => ({
  type: USER_TRADE_ACCOUNT_EXPORT_FETCH,
  payload,
});

export const exportTradeAccountData = (): ExportTradeAccountData => ({
  type: USER_TRADE_ACCOUNT_EXPORT_DATA,
});
export const exportTradeAccountActive = (): ExportTradeAccountActive => ({
  type: USER_TRADE_ACCOUNT_EXPORT_ACTIVE,
});

export const tradeAccountUpdateEvent = (
  payload: TradeAccountUpdate["payload"],
): TradeAccountUpdate => ({
  type: USER_TRADE_ACCOUNT_UPDATE,
  payload,
});
