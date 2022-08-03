import { TransactionsAction } from "./actions";
import {
  TRANSACTIONS_DATA,
  TRANSACTIONS_ERROR,
  TRANSACTIONS_FETCH,
  TRANSACTIONS_UPDATE_EVENT_DATA,
} from "./constants";

export interface Transaction {
  event_id: number;
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
        loading: true,
        success: false,
      };
    case TRANSACTIONS_DATA:
      return {
        ...state,
        loading: false,
        success: true,
        transactions: action.payload,
      };
    case TRANSACTIONS_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    case TRANSACTIONS_UPDATE_EVENT_DATA: {
      const { payload } = action;
      const newTransaction: Transaction = {
        event_id: payload.event_id,
        amount: payload.amount,
        asset: payload.asset,
        fee: payload.fee,
        main_account: payload.user,
        time: new Date().getTime(),
        status: payload.status,
        txn_type: payload.txn_type,
      };
      return {
        ...state,
        transactions: [newTransaction, ...state.transactions],
      };
    }
    default:
      return state;
  }
};
