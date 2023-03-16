import _ from "lodash";

import { TransactionsAction } from "./actions";
import {
  TRANSACTIONS_DATA,
  TRANSACTIONS_ERROR,
  TRANSACTIONS_FETCH,
  TRANSACTIONS_UPDATE_EVENT_DATA,
} from "./constants";

export interface Transaction {
  stid: number;
  amount: string;
  asset: string;
  fee: string;
  main_account?: string;
  time: string;
  status: "PENDING" | "READY" | "CONFIRMED" | "FAILED";
  txn_type: "DEPOSIT" | "WITHDRAWAL";
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
      const transactions = _.cloneDeep(state.transactions);
      console.log("inside tx-update reducer", action, transactions);
      const index = transactions.findIndex(
        ({ stid }) => Number(stid) === Number(payload.stid)
      );
      if (index !== -1) {
        transactions[index] = payload;
      } else {
        transactions.push(payload);
      }
      console.log("finished tx reducer", transactions);
      return {
        ...state,
        transactions,
      };
    }
    default:
      return state;
  }
};
