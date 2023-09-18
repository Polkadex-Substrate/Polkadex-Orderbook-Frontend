import { useCallback, useEffect, useReducer } from "react";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { eventHandler } from "@orderbook/core/helpers";

import { useProfile } from "../profile";

import { Provider } from "./context";
import { tradesReducer, initialState } from "./reducer";
import * as T from "./types";
import * as A from "./actions";
import { processTradeData, fetchUserTrades } from "./helper";

export const TradesProvider: T.TradesComponent = ({ children }) => {
  const [state, dispatch] = useReducer(tradesReducer, initialState);
  const profileState = useProfile();
  const { mainAddress } = profileState.selectedAccount;
  const { onHandleError } = useSettingsProvider();

  // Actions
  const onFetchTrades = useCallback(
    async ({ dateFrom, dateTo, tradeAddress, tradeHistoryFetchToken }) => {
      try {
        if (tradeAddress) {
          const { trades, nextToken } = await fetchUserTrades(
            tradeAddress,
            dateFrom,
            dateTo,
            tradeHistoryFetchToken,
          );
          dispatch(A.userTradesData({ trades, nextToken }));
        }
      } catch (error) {
        onHandleError(error?.message ?? error);
        dispatch(A.userTradesError(error));
      }
    },
    [onHandleError],
  );

  const onUserTradeUpdate = useCallback(
    (payload: A.UserTradesUpdateEvent["payload"]) => {
      try {
        const trade = processTradeData(payload);
        dispatch(A.userTradesUpdateData(trade));
      } catch (error) {
        onHandleError(`User trades channel error: ${error?.message ?? error}`);
      }
    },
    [onHandleError],
  );

  const onUserTradesError = (payload: A.UserTradesError["error"]) => {
    dispatch(A.userTradesError(payload));
  };
  useEffect(() => {
    if (mainAddress) {
      const subscription = eventHandler({
        cb: onUserTradeUpdate,
        name: mainAddress,
        eventType: "TradeFormat",
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [mainAddress, onUserTradeUpdate]);

  useEffect(() => {
    if (profileState.selectedAccount.tradeAddress)
      dispatch(A.userTradesReset());
  }, [profileState.selectedAccount.tradeAddress]);

  return (
    <Provider
      value={{
        ...state,
        onFetchTrades,
        onUserTradeUpdate,
        onUserTradesError,
      }}
    >
      {children}
    </Provider>
  );
};
