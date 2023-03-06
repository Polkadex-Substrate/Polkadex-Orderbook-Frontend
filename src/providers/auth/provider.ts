import { useReducer } from "react";

import { Provider } from "./context";
import { initialState, authReducer } from "./reducer";
import * as T from "./types";

export const AuthProvider: T.AuthComponent = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <Provider
      value={{
        ...state,
      }}>
      {children}
    </Provider>
  )
};
