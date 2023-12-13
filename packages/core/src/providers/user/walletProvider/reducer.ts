import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { ExtensionAccount } from "@polkadex/react-providers";
import { LOCAL_STORAGE_ID } from "@orderbook/core/constants";
import { removeFromStorage, setToStorage } from "@orderbook/core/helpers";

import { TradeAccount } from "../../types";

import { ActionsType } from "./actions";
import {
  LOGOUT,
  SET_SELECT_WALLET,
  SET_SELECT_ACCOUNT,
  SET_SELECT_EXTENSION,
  RESET_SELECT_EXTENSION,
  RESET_SELECT_WALLET,
  SET_LOCAL_TRADING_ACCOUNT,
  SET_TEMP_MNEMONIC,
  RESET_TEMP_MNEMONIC,
  SET_TEMP_TRADING,
  RESET_TEMP_TRADING,
  REMOVE_LOCAL_TRADING_ACCOUNT,
} from "./constants";

export const initialState: State = {};

export interface State {
  selectedWallet?: ExtensionAccount;
  selectedAccount?: TradeAccount;
  selectedExtension?: (typeof ExtensionsArray)[0];
  localTradingAccounts?: TradeAccount[];
  tempMnemonic?: string;
  tempTrading?: TradeAccount;
}

export const reducer = (
  state = initialState,
  action: ActionsType
): Partial<State> => {
  switch (action.type) {
    case SET_SELECT_WALLET:
      return {
        ...state,
        selectedWallet: action.payload,
      };

    case SET_SELECT_ACCOUNT: {
      const tradeAddress = action.payload.address;
      tradeAddress &&
        setToStorage(LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT, tradeAddress);
      return {
        ...state,
        selectedAccount: action.payload,
      };
    }

    case SET_LOCAL_TRADING_ACCOUNT: {
      return {
        ...state,
        localTradingAccounts: [
          ...(state?.localTradingAccounts ?? []),
          ...(Array.isArray(action.payload)
            ? action.payload
            : [action.payload]),
        ],
      };
    }

    case SET_SELECT_EXTENSION:
      return {
        ...state,
        selectedExtension: action.payload,
      };

    case SET_TEMP_MNEMONIC:
      return {
        ...state,
        tempMnemonic: action.payload,
      };

    case RESET_SELECT_WALLET:
      return {
        ...state,
        selectedWallet: undefined,
      };

    case RESET_SELECT_EXTENSION:
      return {
        ...state,
        selectedExtension: undefined,
      };

    case RESET_TEMP_MNEMONIC:
      return {
        ...state,
        tempMnemonic: undefined,
      };

    case SET_TEMP_TRADING:
      return {
        ...state,
        tempTrading: action.payload,
      };

    case RESET_TEMP_TRADING:
      return {
        ...state,
        tempTrading: undefined,
      };

    case LOGOUT: {
      removeFromStorage(LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT);
      return {
        ...state,
        selectedWallet: undefined,
        selectedAccount: undefined,
        selectedExtension: undefined,
      };
    }

    case REMOVE_LOCAL_TRADING_ACCOUNT: {
      const newArr = state?.localTradingAccounts?.filter(
        (account) => account.address !== action.payload
      );
      return {
        ...state,
        localTradingAccounts: [...(newArr ?? [])],
      };
    }

    default:
      return state;
  }
};
