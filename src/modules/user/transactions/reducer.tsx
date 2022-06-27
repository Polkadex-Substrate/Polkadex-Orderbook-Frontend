import { TransactionsAction } from "./actions";
import {
  TRANSACTIONS_DATA,
  TRANSACTIONS_ERROR,
  TRANSACTIONS_FETCH,
  TRANSACTION_CHANNEL_DATA,
} from "./constants";

export interface Transaction {
  amount: string;
  asset: string;
  fee: string;
  main_account: string;
  time: string;
  status: "PENDING" | "CONFIRMED" | "FAILED";
  txn_type: "DEPOSIT" | "WITHDRAW";
}

export interface TransactionsState {
  error?: string;
  loading: boolean;
  success: boolean;
  transactions: Transaction[];
}

export const initialState: TransactionsState = {
  loading: false,
  success: false,
  transactions: [],
};

export const transactionsReducer = (state = initialState, action: TransactionsAction) => {
  switch (action.type) {
    case TRANSACTIONS_FETCH:
      return {
        ...state,
        laoding: true,
        success: false,
      };
    case TRANSACTIONS_DATA:
      return {
        ...state,
        laoding: false,
        success: true,
        transactions: action.payload,
      };
    case TRANSACTIONS_ERROR:
      return {
        ...state,
        laoding: false,
        success: false,
        error: action.error,
      };
    case TRANSACTION_CHANNEL_DATA: {
      const { payload } = action;
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    }
    default:
      return state;
  }
};
