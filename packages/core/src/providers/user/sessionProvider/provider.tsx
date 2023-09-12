import { useReducer, useEffect, useCallback } from "react";
import { endOfDay, startOfMonth } from "date-fns";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import { useProfile } from "../profile";

import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { initialState, sessionReducer } from "./reducer";

export const SessionProvider: T.SessionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);
  const profileState = useProfile();
  const address = profileState.selectedAccount.mainAddress;
  const { onHandleError } = useSettingsProvider();

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
      onHandleError(error?.message ?? error);
      dispatch(A.userSessionError(error));
    }
  }, [onHandleError]);

  const dispatchUserSessionData = useCallback(({ dateFrom, dateTo }) => {
    dispatch(A.userSessionData({ dateFrom, dateTo }));
  }, []);

  useEffect(() => {
    if (address) onFetchSession();
  }, [onFetchSession, address]);

  return (
    <Provider
      value={{
        ...state,
        dispatchUserSessionData,
      }}
    >
      {children}
    </Provider>
  );
};
