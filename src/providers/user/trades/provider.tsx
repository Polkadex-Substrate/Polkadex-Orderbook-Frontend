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

export const TradesProvider: T.TradesComponent = ({ onError, children }) => {
  const [state, dispatch] = useReducer(tradesReducer, initialState);
  const profileState = useProfile();
  const sessionState = useSessionProvider();
  const { onHandleAlert } = useSettingsProvider();

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
      const errorMessage = error instanceof Error ? error.message : (error as string);
      if (typeof onError === "function") onError(errorMessage);
      dispatch(A.userTradesError(error));
    }
  };

  const onUserTradeUpdate = (payload: A.UserTradesUpdateEvent["payload"]) => {
    try {
      const trade = processTradeData(payload);
      dispatch(A.userTradesUpdateData(trade));
    } catch (error) {
      onHandleAlert({
        message: {
          title: "Something has gone wrong (user trades channel)...",
          description: error.message,
        },
        type: "Error",
      });
    }
  };

  return (
    <Provider
      value={{
        ...state,
        onFetchTrades,
        onUserTradeUpdate,
      }}>
      {children}
    </Provider>
  );
};
