"use client";

import { KeyringPair } from "@polkadot/keyring/types";
import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getChainConnector, Thea, Chain } from "@polkadex/thea";

export type GenericStatus = "error" | "idle" | "success" | "loading";

export { useTheaProvider } from "./useThea";
export const TheaProvider = ({ children }: { children: ReactNode }) => {
  const [sourceChain, setSourceChain] = useState<Chain | null>(null);
  const [destinationChain, setDestinationChain] = useState<Chain | null>(null);

  const [sourceAccount, setSourceAccount] = useState<KeyringPair | null>(null);
  const [destinationAccount, setDestinationAccount] =
    useState<KeyringPair | null>(null);

  const { getAllChains } = new Thea();
  const chains = useMemo(() => getAllChains(), [getAllChains]);

  return (
    <Provider
      value={{
        sourceAccount,
        setSourceAccount,
        destinationAccount,
        setDestinationAccount,

        sourceChain,
        setSourceChain,
        destinationChain,
        setDestinationChain,
        chains,
      }}
    >
      {children}
    </Provider>
  );
};

type State = {
  sourceAccount: KeyringPair | null;
  setSourceAccount: Dispatch<SetStateAction<KeyringPair>>;
  chains: Chain[];

  destinationAccount: KeyringPair | null;
  setDestinationAccount: Dispatch<SetStateAction<KeyringPair>>;

  destinationChain: Chain | null;
  setDestinationChain: Dispatch<SetStateAction<Chain>>;
  sourceChain: Chain | null;
  setSourceChain: Dispatch<SetStateAction<Chain>>;
};
export const Context = createContext<State>({
  sourceAccount: null,
  setSourceAccount: () => {},
  destinationAccount: null,
  setDestinationAccount: () => {},

  destinationChain: null,
  setDestinationChain: () => {},
  sourceChain: null,
  setSourceChain: () => {},
  chains: [],
});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
