import _ from "lodash";

import { TransactionsAction } from "./actions";
import {
  TRANSACTIONS_DATA,
  TRANSACTIONS_ERROR,
  TRANSACTIONS_FETCH,
  TRANSACTIONS_UPDATE_EVENT_DATA,
} from "./constants";

export interface Transaction {
  event_id: number;
  sid: number;
  amount: string;
  asset: "PDEX" | string;
  fee: string;
  main_account?: string;
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
      const transactions = _.cloneDeep(state.transactions);
      console.log("inside tx-update reducer", action, transactions);
      const index = transactions.findIndex(
        ({ event_id }) => Number(event_id) === Number(payload.event_id)
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
