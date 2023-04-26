import { useReducer } from "react";

import { useProfile } from "../profile";
import { UserSessionPayload } from "../sessionProvider/actions";
import { useSessionProvider } from "../sessionProvider/useSessionProvider";
import { useSettingsProvider } from "../../public/settings";

import { Provider } from "./context";
import { tradesReducer, initialState } from "./reducer";
import * as T from "./types";
import * as A from "./actions";
import { processTradeData, fetchUserTrades } from "./helper";

export const TradesProvider: T.TradesComponent = ({ children }) => {
  const [state, dispatch] = useReducer(tradesReducer, initialState);
  const profileState = useProfile();
  const sessionState = useSessionProvider();
  const { onHandleError } = useSettingsProvider();

  // Actions
  const onFetchTrades = async () => {
    try {
      const currAccount = profileState.selectedAccount;
      const address = currAccount.tradeAddress;
      if (address) {
        const userSession: UserSessionPayload = sessionState;
        const { dateFrom, dateTo } = userSession;
        const trades = await fetchUserTrades(address, dateFrom, dateTo);
        dispatch(A.userTradesData(trades));
      }
    } catch (error) {
      onHandleError(error?.message ?? error);
      dispatch(A.userTradesError(error));
    }
  };

  const onUserTradeUpdate = (payload: A.UserTradesUpdateEvent["payload"]) => {
    try {
      const trade = processTradeData(payload);
      dispatch(A.userTradesUpdateData(trade));
    } catch (error) {
      onHandleError(`User trades channel error: ${error?.message ?? error}`);
    }
  };

  const onUserTradesError = (payload: A.UserTradesError["error"]) => {
    dispatch(A.userTradesError(payload));
  };

  return (
    <Provider
      value={{
        ...state,
        onFetchTrades,
        onUserTradeUpdate,
        onUserTradesError,
      }}>
      {children}
    </Provider>
  );
};
