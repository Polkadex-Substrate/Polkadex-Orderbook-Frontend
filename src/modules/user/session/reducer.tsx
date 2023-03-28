import { endOfDay, startOfMonth } from "date-fns";

import { SessionAction } from "./actions";
import { SESSION_DATA, SESSION_ERROR, SESSION_FETCH } from "./constants";

export interface SessionState {
  dateTo: Date;
  dateFrom: Date;
}

const now = new Date();

const initialState: SessionState = {
  dateTo: endOfDay(now),
  dateFrom: startOfMonth(now),
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
