import { useReducer } from "react";
import BigNumber from "bignumber.js";
import { ApiPromise } from "@polkadot/api";
import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { initialState, sessionReducer } from "./reducer";
import { endOfDay, startOfMonth } from "date-fns";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectRangerApi,
  selectRangerIsReady,
} from "@polkadex/orderbook/modules/public/ranger/selectors";
import { ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { UNIT_BN } from "@polkadex/web-constants";

export const SessionProvider: T.SessionComponent = ({ onError, onNotification, children }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  const onFetchSession = () => {
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
  };

  return (
    <Provider
      value={{
        ...state,
      }}>
      {children}
    </Provider>
  );
};
