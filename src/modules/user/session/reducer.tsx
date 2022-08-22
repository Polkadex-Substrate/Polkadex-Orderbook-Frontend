import { SessionAction } from "./actions";
import { SESSION_DATA, SESSION_ERROR, SESSION_FETCH } from "./constants";

import { subtractMonths } from "@polkadex/orderbook/helpers/substractMonths";

export interface SessionState {
  dateTo: string;
  dateFrom: string;
}

const initialState: SessionState = {
  dateTo: new Date().toISOString(),
  dateFrom: subtractMonths(1).toISOString(),
};

export const sessionReducer = (state = initialState, action: SessionAction) => {
  switch (action.type) {
    case SESSION_FETCH:
      return {
        ...state,
      };
    case SESSION_DATA: {
      const { dateFrom, dateTo } = action.payload;
      return {
        ...state,
        dateTo,
        dateFrom,
      };
    }
    case SESSION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
