"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getChainConnector,
  Thea,
  Chain,
  Asset,
  AssetAmount,
  BaseChainAdapter,
} from "@polkadex/thea";
import { defaultConfig } from "@orderbook/core/config";
import { ExtensionAccount } from "@polkadex/react-providers";
import {
  Transactions,
  useTheaBalances,
  useTheaTransactions,
} from "@orderbook/core/hooks";
import { isIdentical } from "@orderbook/core/helpers";

import { useConnectWalletProvider } from "../connectWalletProvider";
const {
  disabledTheaChains,
  defaultTheaDestinationChain,
  defaultTheaSourceChain,
} = defaultConfig;
export type GenericStatus = "error" | "idle" | "success" | "loading";

export { useTheaProvider } from "./useThea";
export const TheaProvider = ({
  initialAssetTicker,
  initialSourceName,
  initialDestinationName,
  children,
}: PropsWithChildren<{
  initialAssetTicker: string | null;
  initialSourceName: string | null;
  initialDestinationName: string | null;
}>) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [sourceChain, setSourceChain] = useState<Chain | null>(null);
  const [destinationChain, setDestinationChain] = useState<Chain | null>(null);
  const [sourceAccount, setSourceAccount] = useState<ExtensionAccount>();
  const [destinationAccount, setDestinationAccount] =
    useState<ExtensionAccount>();
  const { selectedWallet } = useConnectWalletProvider();

  const { getAllChains } = new Thea();

  const sourceAccountSelected = useMemo(
    () => sourceAccount ?? selectedWallet,
    [sourceAccount, selectedWallet]
  );

  const destinationAccountSelected = useMemo(
    () => destinationAccount ?? selectedWallet,
    [destinationAccount, selectedWallet]
  );

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
  const polkadexConnector = useMemo(
    () =>
      destinationChain &&
      getChainConnector(
        "0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c"
      ),
    [destinationChain]
  );
  const sourceAssets = useMemo(
    () => (sourceConnector ? sourceConnector.getSupportedAssets() : []),
    [sourceConnector]
  );

  const polkadexAssets = useMemo(
    () => (polkadexConnector ? polkadexConnector.getSupportedAssets() : []),
    [polkadexConnector]
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

  const initialAsset = useMemo(() => {
    if (supportedAssets) {
      const asset =
        initialAssetTicker &&
        isIdentical(supportedAssets, initialAssetTicker, "ticker");
      return asset || supportedAssets[0];
    }
  }, [initialAssetTicker, supportedAssets]);

  const initialSource = useMemo(() => {
    if (chains) {
      return !!initialSourceName && initialSourceName !== initialDestinationName
        ? isIdentical(chains, initialSourceName, "name")
        : isIdentical(chains, defaultTheaSourceChain, "name");
    }
  }, [initialSourceName, chains, initialDestinationName]);

  const initialDestination = useMemo(() => {
    if (chains) {
      return !!initialDestinationName &&
        initialSourceName !== initialDestinationName
        ? isIdentical(chains, initialDestinationName, "name")
        : isIdentical(chains, defaultTheaDestinationChain, "name");
    }
  }, [initialDestinationName, initialSourceName, chains]);

  useEffect(() => {
    if (initialDestination && !destinationChain)
      setDestinationChain(initialDestination);
  }, [initialDestination, destinationChain]);

  useEffect(() => {
    if (initialSource && !sourceChain) setSourceChain(initialSource);
  }, [initialSource, sourceChain]);

  useEffect(() => {
    if (!selectedAsset && destinationChain && sourceChain && supportedAssets)
      setSelectedAsset(initialAsset || supportedAssets[0]);
  }, [
    initialAsset,
    selectedAsset,
    destinationChain,
    sourceChain,
    supportedAssets,
  ]);

  const {
    data: sourceBalances = [],
    isLoading: sourceBalancesLoading,
    isFetching: sourceBalancesFetching,
    isSuccess: sourceBalancesSuccess,
  } = useTheaBalances({
    connector: sourceConnector,
    sourceAddress: sourceAccountSelected?.address,
    assets: sourceAssets,
    chain: sourceChain?.genesis,
  });

  const {
    data: destinationBalances = [],
    isLoading: destinationBalancesLoading,
    isFetching: destinationBalancesFetching,
    isSuccess: destinationBalancesSuccess,
  } = useTheaBalances({
    connector: destinationConnector,
    sourceAddress: destinationAccountSelected?.address,
    assets: destinationAssets,
    chain: destinationChain?.genesis,
  });

  const selectedAssetSupported = useMemo(
    () =>
      !!selectedAsset &&
      supportedAssets?.find((e) => e.ticker.includes(selectedAsset.ticker)),
    [selectedAsset, supportedAssets]
  );

  useEffect(() => {
    if (
      selectedAsset &&
      sourceChain &&
      destinationChain &&
      supportedAssets &&
      !selectedAssetSupported
    ) {
      setSelectedAsset(null);
    }
  }, [
    destinationChain,
    selectedAsset,
    selectedAssetSupported,
    sourceChain,
    supportedAssets,
  ]);

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
    sourceAddress: sourceAccountSelected?.address,
    assets: polkadexAssets,
    chains,
  });

  return (
    <Provider
      value={{
        sourceConnector,
        destinationConnector,

        sourceAccount: sourceAccountSelected,
        setSourceAccount,
        destinationAccount: destinationAccountSelected,
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

        sourceBalances,
        sourceBalancesLoading: sourceBalancesLoading && sourceBalancesFetching,
        sourceBalancesSuccess,

        destinationBalances,
        destinationBalancesLoading:
          destinationBalancesLoading && destinationBalancesFetching,
        destinationBalancesSuccess,

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
  sourceConnector: BaseChainAdapter | null;
  destinationConnector: BaseChainAdapter | null;

  sourceAccount?: ExtensionAccount;
  setSourceAccount: Dispatch<SetStateAction<ExtensionAccount | undefined>>;
  chains: Chain[];

  destinationAccount?: ExtensionAccount;
  setDestinationAccount: Dispatch<SetStateAction<ExtensionAccount | undefined>>;

  destinationChain: Chain | null;
  setDestinationChain: Dispatch<SetStateAction<Chain | null>>;
  sourceChain: Chain | null;
  setSourceChain: Dispatch<SetStateAction<Chain | null>>;

  supportedAssets: Asset[];
  destinationAssets: Asset[];
  sourceAssets: Asset[];

  selectedAsset: Asset | null;
  setSelectedAsset: Dispatch<SetStateAction<Asset | null>>;

  sourceBalances: AssetAmount[];
  sourceBalancesLoading: boolean;
  sourceBalancesSuccess: boolean;

  destinationBalances: AssetAmount[];
  destinationBalancesLoading: boolean;
  destinationBalancesSuccess: boolean;

  deposits: Transactions;
  depositsLoading: boolean;
  depositsSuccess: boolean;

  withdrawals: Transactions;
  withdrawalsLoading: boolean;
  withdrawalsSuccess: boolean;
};
export const Context = createContext<State>({
  sourceConnector: null,
  destinationConnector: null,

  sourceAccount: undefined,
  setSourceAccount: () => {},
  destinationAccount: undefined,
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

  sourceBalances: [],
  sourceBalancesLoading: false,
  sourceBalancesSuccess: false,

  destinationBalances: [],
  destinationBalancesLoading: false,
  destinationBalancesSuccess: false,

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
