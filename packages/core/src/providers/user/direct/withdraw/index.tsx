import { PropsWithChildren, createContext } from "react";

export { useDirectWithdrawProvider } from "./useDirectWithdrawProvider";

export const DirectWithdrawProvider = ({ children }: PropsWithChildren) => {
  return <Provider value={{}}>{children}</Provider>;
};

type State = {{}};

const Context = createContext<State>({});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const WithdrawContext = Context;
