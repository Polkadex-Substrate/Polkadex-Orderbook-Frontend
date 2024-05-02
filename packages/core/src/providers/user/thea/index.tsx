"use client";

import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import {
  getChainConnector,
  Thea,
  Chain,
  Asset,
  AssetAmount,
} from "@polkadex/thea";
import { defaultConfig } from "@orderbook/core/config";
import { ExtensionAccount } from "@polkadex/react-providers";
import { useTheaBalances } from "@orderbook/core/hooks";
const { disabledTheaChains } = defaultConfig;
export type GenericStatus = "error" | "idle" | "success" | "loading";

export { useTheaProvider } from "./useThea";
export const TheaProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [sourceChain, setSourceChain] = useState<Chain | null>(null);
  const [destinationChain, setDestinationChain] = useState<Chain | null>(null);

  const [sourceAccount, setSourceAccount] = useState<ExtensionAccount | null>(
    null
  );
  const [destinationAccount, setDestinationAccount] =
    useState<ExtensionAccount | null>(null);

  const { getAllChains } = new Thea();
  const chains = useMemo(
    () =>
      getAllChains()?.filter((e) => !disabledTheaChains.includes(e.genesis)),
    [getAllChains]
  );

  const connector = useMemo(
    () => sourceChain && getChainConnector(sourceChain.genesis),
    [sourceChain]
  );
  const supportedAssets = useMemo(
    () => (connector ? connector.getSupportedAssets() : []),
    [connector]
  );

  const {
    data: balances = [],
    isLoading: balancesLoading,
    isSuccess: balancesSuccess,
  } = useTheaBalances({
    connector,
    sourceAddress: sourceAccount?.address ?? "",
    assets: supportedAssets,
  });

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

        supportedAssets,
        selectedAsset,
        setSelectedAsset,

        balances,
        balancesLoading,
        balancesSuccess,
      }}
    >
      {children}
    </Provider>
  );
};

type State = {
  sourceAccount: ExtensionAccount | null;
  setSourceAccount: Dispatch<SetStateAction<ExtensionAccount>>;
  chains: Chain[];

  destinationAccount: ExtensionAccount | null;
  setDestinationAccount: Dispatch<SetStateAction<ExtensionAccount>>;

  destinationChain: Chain | null;
  setDestinationChain: Dispatch<SetStateAction<Chain | null>>;
  sourceChain: Chain | null;
  setSourceChain: Dispatch<SetStateAction<Chain | null>>;

  supportedAssets: Asset[];
  selectedAsset: Asset | null;
  setSelectedAsset: Dispatch<SetStateAction<Asset>>;

  balances: AssetAmount[];
  balancesLoading: boolean;
  balancesSuccess: boolean;
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

  supportedAssets: [],
  selectedAsset: null,
  setSelectedAsset: () => {},

  balances: [],
  balancesLoading: false,
  balancesSuccess: false,
});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
