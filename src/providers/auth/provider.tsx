import { useReducer } from "react";

import { Provider } from "./context";
import { authReducer, initialState } from "./reducer";

export const AuthProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <Provider
      value={{
        ...state,
      }}>
      {children}
    </Provider>
  );
};
