import { useReducer } from "react";

import { Provider } from "./context";
import { tradesReducer, initialState } from "./reducer";
import * as T from "./types";
import * as A from "./actions";

export const TradesProvider: T.TradesComponent = ({ onError, onNotification, children }) => {
  const [state, dispatch] = useReducer(tradesReducer, initialState);

  // Actions

  return (
    <Provider
      value={{
        ...state,
      }}>
      {children}
    </Provider>
  );
};
