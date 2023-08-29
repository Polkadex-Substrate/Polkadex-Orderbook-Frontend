import { keyring } from "@polkadot/ui-keyring";

import { TradeAccountsAction } from "./actions";
import {
  REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
  USER_REGISTER_TRADE_ACCOUNT_DATA,
  USER_REGISTER_TRADE_ACCOUNT_ERROR,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_REGISTER_TRADE_ACCOUNT_RESET,
  USER_TRADE_ACCOUNT_PUSH,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  USER_TRADE_ACCOUNT_UNLOCK,
  USER_TRADE_ACCOUNTS_DATA,
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNT_MODAL_ACTIVE,
  USER_TRADE_ACCOUNT_IMPORT_DATA,
  USER_TRADE_ACCOUNT_MODAL_CANCEL,
  USER_TRADE_ACCOUNT_IMPORT_FETCH,
  USER_PREVIEW_ACCOUNT_MODAL_ACTIVE,
  USER_PREVIEW_ACCOUNT_MODAL_CANCEL,
  USER_TRADE_ACCOUNT_EXPORT_ACTIVE,
  USER_TRADE_ACCOUNT_EXPORT_DATA,
  USER_TRADE_ACCOUNT_IMPORT_JSON,
} from "./constants";
import { TradeWalletState } from "./types";

export const initialState: TradeWalletState = {
  isFetching: false,
  allBrowserAccounts: [],
  registerAccountLoading: false,
  registerAccountSuccess: false,
  removesInLoading: [],
  registerAccountModal: {
    isActive: false,
    defaultImportActive: false,
  },
  importAccountSuccess: false,
  previewAccountModal: {
    isActive: false,
  },
  exportAccountLoading: false,
};

export const tradeWalletReducer = (
  state = initialState,
  action: TradeAccountsAction
): TradeWalletState => {
  switch (action.type) {
    case USER_TRADE_ACCOUNT_IMPORT_DATA:
      return {
        ...state,
        importAccountSuccess: true,
        registerAccountLoading: false,
      };

    case USER_TRADE_ACCOUNTS_DATA: {
      return {
        ...state,
        isFetching: false,
        allBrowserAccounts: action.payload.allAccounts,
      };
    }
    case USER_TRADE_ACCOUNTS_FETCH: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case USER_TRADE_ACCOUNTS_ERROR: {
      return {
        ...state,
        registerAccountLoading: false,
        isFetching: false,
      };
    }
    case USER_TRADE_ACCOUNT_IMPORT_JSON:
    case USER_TRADE_ACCOUNT_IMPORT_FETCH:
    case USER_REGISTER_TRADE_ACCOUNT_FETCH:
      return {
        ...state,
        registerAccountLoading: true,
        registerAccountSuccess: false,
      };
    case USER_TRADE_ACCOUNT_EXPORT_ACTIVE:
      return {
        ...state,
        exportAccountLoading: !state.exportAccountLoading,
      };
    case USER_TRADE_ACCOUNT_EXPORT_DATA:
      return {
        ...state,
        exportAccountLoading: false,
      };
    case USER_REGISTER_TRADE_ACCOUNT_DATA:
      return {
        ...state,
        registerAccountModal: {
          ...state.registerAccountModal,
          ...action.payload,
        },
        registerAccountLoading: false,
        registerAccountSuccess: true,
      };
    case USER_TRADE_ACCOUNT_MODAL_ACTIVE:
      return {
        ...state,
        registerAccountModal: {
          ...state.registerAccountModal,
          isActive: true,
          selectedAddress: action?.payload?.data,
          defaultImportActive: action.payload?.defaultImportActive,
        },
      };
    case USER_TRADE_ACCOUNT_MODAL_CANCEL:
      return {
        ...state,
        registerAccountModal: {
          isActive: false,
        },
      };
    case USER_PREVIEW_ACCOUNT_MODAL_ACTIVE:
      return {
        ...state,
        previewAccountModal: {
          ...state.registerAccountModal,
          isActive: true,
          selected: action.payload,
        },
      };
    case USER_PREVIEW_ACCOUNT_MODAL_CANCEL:
      return {
        ...state,
        previewAccountModal: {
          isActive: false,
          selected: null,
        },
      };
    case USER_REGISTER_TRADE_ACCOUNT_RESET:
      return {
        ...state,
        registerAccountModal: {
          isActive: false,
          defaultImportActive: false,
        },
        registerAccountLoading: false,
        registerAccountSuccess: false,
        importAccountSuccess: false,
      };
    case USER_REGISTER_TRADE_ACCOUNT_ERROR:
      return {
        ...state,
        registerAccountLoading: false,
        registerAccountSuccess: false,
      };
    case REMOVE_TRADE_ACCOUNT_FROM_BROWSER: {
      const { address } = action.payload;
      const newAccounts = state.allBrowserAccounts?.filter(
        (account) => account?.address !== address
      );
      keyring.forgetAccount(address);
      return {
        ...state,
        allBrowserAccounts: newAccounts,
      };
    }
    case USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH:
      return {
        ...state,
        removesInLoading: [...state.removesInLoading, action.payload.address],
      };
    case USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA:
      return {
        ...state,
        removesInLoading: state.removesInLoading?.filter((v) => v !== action.payload.address),
      };
    case USER_TRADE_ACCOUNT_UNLOCK: {
      const { address, password } = action.payload;
      try {
        const _allAccounts = [...state.allBrowserAccounts];
        const pair = _allAccounts?.find((account) => account?.address === address);
        if (!pair) {
          return state;
        }
        pair.unlock(password.toString());
        return {
          ...state,
          allBrowserAccounts: _allAccounts,
        };
      } catch (e) {
        console.log("password error", e);
        alert("invalid password");
        return state;
      }
    }
    case USER_TRADE_ACCOUNT_PUSH: {
      const { pair } = action.payload;
      const _allAccounts = [...state.allBrowserAccounts];
      _allAccounts.push(pair);
      return {
        ...state,
        allBrowserAccounts: _allAccounts,
      };
    }
    default:
      return state;
  }
};
