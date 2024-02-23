import { useReducer } from "react";

import * as A from "./actions";
import * as T from "./types";
import { initialState, ordersReducer } from "./reducer";
import { Provider } from "./context";

export const OrdersProvider: T.OrdersComponent = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  const onSetCurrentPrice = (payload: A.SetCurrentPrice["payload"]) => {
    dispatch(A.setCurrentPrice(payload));
  };

  const onSetCurrentAmount = (payload: A.SetAmount["payload"]) => {
    dispatch(A.setAmount(payload));
  };

  return (
    <Provider
      value={{
        ...state,
        onSetCurrentPrice,
        onSetCurrentAmount,
      }}
    >
      {children}
    </Provider>
  );
};
