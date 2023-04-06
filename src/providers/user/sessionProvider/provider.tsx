import { useReducer, useEffect, useCallback } from "react";
import { endOfDay, startOfMonth } from "date-fns";

import { useProfile } from "../profile";

import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { initialState, sessionReducer } from "./reducer";

export const SessionProvider: T.SessionComponent = ({ onError, children }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);
  const profileState = useProfile();
  const address = profileState.selectedAccount.mainAddress;
  const onFetchSession = useCallback(() => {
    dispatch(A.userSessionFetch());
    try {
      // add default user session values
      const now = new Date();
      const dateFrom = startOfMonth(now);
      const dateTo = endOfDay(now); // adds 2 hours to current time
      dispatch(A.userSessionData({ dateFrom, dateTo }));
    } catch (error) {
      console.log(error);
      onError("User session error");
    }
  }, [onError]);

  useEffect(() => {
    onFetchSession();
  }, [onFetchSession, address]);

  return (
    <Provider
      value={{
        ...state,
      }}>
      {children}
    </Provider>
  );
};
