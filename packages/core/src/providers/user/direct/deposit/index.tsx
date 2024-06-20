import { ExtensionAccount } from "@polkadex/react-providers";
import { PropsWithChildren, createContext, useState } from "react";

export const DirectDepositProvider = ({ children }: PropsWithChildren) => {
  const [sourceAccount, setSourceAccount] = useState();

  return <Provider value={{ sourceAccount }}>{children}</Provider>;
};

type State = {
  sourceAccount?: ExtensionAccount;
};

export const Context = createContext<State>({
  sourceAccount: undefined,
});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
