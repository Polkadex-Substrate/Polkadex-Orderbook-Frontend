import { useCallback, useEffect, useReducer } from "react";
import { API } from "aws-amplify";

import { useProfile } from "../profile";
import { UserSessionPayload } from "../sessionProvider/actions";
import { useSessionProvider } from "../sessionProvider/useSessionProvider";
import { useSettingsProvider } from "../../public/settings";
import * as subscriptions from "../../../graphql/subscriptions";

import { Provider } from "./context";
import { tradesReducer, initialState } from "./reducer";
import * as T from "./types";
import * as A from "./actions";
import { processTradeData, fetchUserTrades } from "./helper";

import { READ_ONLY_TOKEN, USER_EVENTS } from "@polkadex/web-constants";

export const TradesProvider: T.TradesComponent = ({ children }) => {
  const [state, dispatch] = useReducer(tradesReducer, initialState);
  const profileState = useProfile();
  const { mainAddress, tradeAddress } = profileState.selectedAccount;
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

  const onUserTradeUpdate = useCallback(
    (payload: A.UserTradesUpdateEvent["payload"]) => {
      try {
        const trade = processTradeData(payload);
        dispatch(A.userTradesUpdateData(trade));
      } catch (error) {
        onHandleError(`User trades channel error: ${error?.message ?? error}`);
      }
    },
    [onHandleError]
  );

  const onUserTradesError = (payload: A.UserTradesError["error"]) => {
    dispatch(A.userTradesError(payload));
  };
  useEffect(() => {
    console.log(
      "created User Events Channel... for main address from trades  provider",
      mainAddress
    );

    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: mainAddress },
      authToken: READ_ONLY_TOKEN,
      // ignore type error here as its a known bug in aws library
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        console.log("got raw event", data);
        const eventData = JSON.parse(data.value.data.websocket_streams.data);
        const eventType = eventData.type;
        console.info("User Event: ", eventData, "event type", eventType);

        if (eventType === USER_EVENTS.TradeFormat) {
          onUserTradeUpdate(eventData);
        }
      },
      error: (err) => {
        console.log("subscription error", err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [mainAddress, onUserTradeUpdate]);

  useEffect(() => {
    console.log(
      "created User Events Channel... for trade address from trades  provider",
      tradeAddress
    );

    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: tradeAddress },
      authToken: READ_ONLY_TOKEN,
      // ignore type error here as its a known bug in aws library
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        console.log("got raw event", data);
        const eventData = JSON.parse(data.value.data.websocket_streams.data);

        const eventType = eventData.type;
        console.info("User Event: ", eventData, "event type", eventType);

        if (eventType === USER_EVENTS.TradeFormat) {
          onUserTradeUpdate(eventData);
        }
      },
      error: (err) => {
        console.log("subscription error", err);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onUserTradeUpdate, tradeAddress]);

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
