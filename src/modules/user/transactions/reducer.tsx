import { TransactionsAction } from "./actions";
import { TRANSACTIONS_DATA, TRANSACTIONS_ERROR, TRANSACTIONS_FETCH } from "./constants";

export interface Transaction {
  id: string;
  txid: string;
  timestamp: number;
  from: string;
  to: string;
  transaction_type: string;
  amount: number;
  currency: string;
  status: string;
  updated_timestamp: null;
  fee: Fee;
}

interface Fee {
  currency: string;
  cost: number;
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
    default:
      return state;
  }
};
