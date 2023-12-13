import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { ExtensionAccount } from "@polkadex/react-providers";

import { TradeAccount } from "../../types";

import {
  LOGOUT,
  SET_SELECT_WALLET,
  SET_SELECT_EXTENSION,
  RESET_SELECT_EXTENSION,
  RESET_SELECT_WALLET,
  SET_SELECT_ACCOUNT,
  SET_LOCAL_TRADING_ACCOUNT,
  SET_TEMP_MNEMONIC,
  RESET_TEMP_MNEMONIC,
  SET_TEMP_TRADING,
  RESET_TEMP_TRADING,
  REMOVE_LOCAL_TRADING_ACCOUNT,
  UNLOCK_LOCAL_TRADING_ACCOUNT,
} from "./constants";
import { UnlockTradeAccount } from "./provider";

const setSelectWallet = (payload: ExtensionAccount) =>
  ({
    type: SET_SELECT_WALLET,
    payload,
  }) as const;

const setTempMnemonic = (payload: string) =>
  ({
    type: SET_TEMP_MNEMONIC,
    payload,
  }) as const;

const setTempTrading = (payload: TradeAccount) =>
  ({
    type: SET_TEMP_TRADING,
    payload,
  }) as const;

const resetTempTrading = () =>
  ({
    type: RESET_TEMP_TRADING,
  }) as const;

const setSelectAccount = (payload: TradeAccount) =>
  ({
    type: SET_SELECT_ACCOUNT,
    payload,
  }) as const;

const setLocalTradingAccount = (payload: TradeAccount | TradeAccount[]) =>
  ({
    type: SET_LOCAL_TRADING_ACCOUNT,
    payload,
  }) as const;

const setSelectExtension = (payload: (typeof ExtensionsArray)[0]) =>
  ({
    type: SET_SELECT_EXTENSION,
    payload,
  }) as const;

const resetSelectWallet = () =>
  ({
    type: RESET_SELECT_WALLET,
  }) as const;

const resetSelectExtension = () =>
  ({
    type: RESET_SELECT_EXTENSION,
  }) as const;

const resetTempMnemonic = () =>
  ({
    type: RESET_TEMP_MNEMONIC,
  }) as const;

const logout = () =>
  ({
    type: LOGOUT,
  }) as const;

const removeLocalTradingAccount = (payload: string) =>
  ({
    type: REMOVE_LOCAL_TRADING_ACCOUNT,
    payload,
  }) as const;

export const unlockTradeAccount = (payload: UnlockTradeAccount) =>
  ({
    type: UNLOCK_LOCAL_TRADING_ACCOUNT,
    payload: payload,
  }) as const;

export const actions = {
  setSelectWallet,
  setSelectAccount,
  setLocalTradingAccount,
  setSelectExtension,
  setTempMnemonic,
  resetSelectExtension,
  resetSelectWallet,
  resetTempMnemonic,
  logout,
  removeLocalTradingAccount,
  setTempTrading,
  resetTempTrading,
  unlockTradeAccount,
};

export type ActionsType =
  | ReturnType<typeof setSelectWallet>
  | ReturnType<typeof setSelectAccount>
  | ReturnType<typeof setLocalTradingAccount>
  | ReturnType<typeof setSelectExtension>
  | ReturnType<typeof setTempMnemonic>
  | ReturnType<typeof resetSelectWallet>
  | ReturnType<typeof resetSelectExtension>
  | ReturnType<typeof resetTempMnemonic>
  | ReturnType<typeof logout>
  | ReturnType<typeof removeLocalTradingAccount>
  | ReturnType<typeof setTempTrading>
  | ReturnType<typeof resetTempTrading>
  | ReturnType<typeof unlockTradeAccount>;
