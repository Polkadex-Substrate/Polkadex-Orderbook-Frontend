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
import {
  Transactions,
  useTheaBalances,
  useTheaTransactions,
} from "@orderbook/core/hooks";
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

  const sourceConnector = useMemo(
    () => sourceChain && getChainConnector(sourceChain.genesis),
    [sourceChain]
  );
  const destinationConnector = useMemo(
    () => destinationChain && getChainConnector(destinationChain.genesis),
    [destinationChain]
  );

  const sourceAssets = useMemo(
    () => (sourceConnector ? sourceConnector.getSupportedAssets() : []),
    [sourceConnector]
  );

  const destinationAssets = useMemo(
    () =>
      destinationConnector ? destinationConnector.getSupportedAssets() : [],
    [destinationConnector]
  );

  const supportedAssets = useMemo(
    () =>
      sourceAssets && destinationAssets
        ? sourceAssets?.filter((e) =>
            destinationAssets?.some((x) => e?.ticker === x?.ticker)
          )
        : [],
    [sourceAssets, destinationAssets]
  );

  const {
    data: balances = [],
    isLoading: balancesLoading,
    isFetching: balancesFetching,
    isSuccess: balancesSuccess,
  } = useTheaBalances({
    connector: sourceConnector,
    sourceAddress: sourceAccount?.address ?? "",
    assets: sourceAssets,
  });

  const [
    {
      data: deposits = [],
      isLoading: depositsLoading,
      isFetching: depositsFetching,
      isSuccess: depositsSuccess,
    },
    {
      data: withdrawals = [],
      isLoading: withdrawalsLoading,
      isFetching: withdrawalsFetching,
      isSuccess: withdrawalsSuccess,
    },
  ] = useTheaTransactions({
    sourceAddress: sourceAccount?.address ?? "",
    assets: sourceAssets,
    chains,
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
        destinationAssets,
        sourceAssets,

        selectedAsset,
        setSelectedAsset,

        balances,
        balancesLoading: balancesLoading && balancesFetching,
        balancesSuccess,

        deposits,
        depositsLoading: depositsLoading && depositsFetching,
        depositsSuccess,

        withdrawals,
        withdrawalsLoading: withdrawalsLoading && withdrawalsFetching,
        withdrawalsSuccess,
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
  destinationAssets: Asset[];
  sourceAssets: Asset[];

  selectedAsset: Asset | null;
  setSelectedAsset: Dispatch<SetStateAction<Asset>>;

  balances: AssetAmount[];
  balancesLoading: boolean;
  balancesSuccess: boolean;

  deposits: Transactions;
  depositsLoading: boolean;
  depositsSuccess: boolean;

  withdrawals: Transactions;
  withdrawalsLoading: boolean;
  withdrawalsSuccess: boolean;
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
  destinationAssets: [],
  sourceAssets: [],

  selectedAsset: null,
  setSelectedAsset: () => {},

  balances: [],
  balancesLoading: false,
  balancesSuccess: false,

  deposits: [],
  depositsLoading: false,
  depositsSuccess: false,

  withdrawals: [],
  withdrawalsLoading: false,
  withdrawalsSuccess: false,
});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
