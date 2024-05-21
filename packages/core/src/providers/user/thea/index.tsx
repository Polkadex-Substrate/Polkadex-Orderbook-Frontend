"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
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
  TransferConfig,
} from "@polkadex/thea";
import { defaultConfig } from "@orderbook/core/config";
import { ExtensionAccount } from "@polkadex/react-providers";
import { useTheaBalances, useTheaConfig } from "@orderbook/core/hooks";
import { isIdentical } from "@orderbook/core/helpers";
import { GENESIS } from "@orderbook/core/constants";
import { UseQueryResult } from "@tanstack/react-query";

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

  const { getAllChains } = useMemo(() => new Thea(), []);

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

  const supportedDestinationChains = useMemo(() => {
    return (
      (selectedAsset && sourceConnector?.getDestinationChains(selectedAsset)) ||
      []
    );
  }, [selectedAsset, sourceConnector]);

  const polkadexConnector = useMemo(
    () => destinationChain && getChainConnector(GENESIS[0]),
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
    refetch: sourceBalancesRefetch,
  } = useTheaBalances({
    connector: sourceConnector,
    sourceAddress: sourceAccountSelected?.address,
    assets: sourceAssets,
    chain: sourceChain?.genesis,
  });

  const { data: polkadexDestinationBalances = [] } = useTheaBalances({
    connector: polkadexConnector,
    sourceAddress: destinationAccountSelected?.address,
    assets: polkadexAssets,
    chain: GENESIS[0],
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

  const isPolkadexChain = useMemo(
    () => !!(sourceChain?.genesis === GENESIS[0]),
    [sourceChain?.genesis]
  );

  const destinationPDEXBalance = useMemo(
    () =>
      polkadexDestinationBalances
        ? polkadexDestinationBalances.find((e) => e.ticker === "PDEX")
            ?.amount ?? 0 // Remove static data
        : 0,
    [polkadexDestinationBalances]
  );

  const {
    data: transferConfig,
    isLoading: transferConfigLoading,
    isFetching: transferConfigFetching,
    isSuccess: transferConfigSuccess,
    refetch: transferConfigRefetch,
  } = useTheaConfig({
    connector: sourceConnector,
    destinationAddress: destinationAccountSelected?.address,
    sourceAddress: sourceAccountSelected?.address,
    selectedAsset,
    destinationChain,
  });

  const onRefetchTransferConfig = useCallback(async () => {
    await transferConfigRefetch();
  }, [transferConfigRefetch]);

  const selectedAssetBalance = useMemo(
    () =>
      selectedAsset && sourceBalances
        ? sourceBalances.find((e) => e.ticker === selectedAsset?.ticker)
            ?.amount ?? 0
        : 0,
    [selectedAsset, sourceBalances]
  );

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
        supportedSourceChains: chains,
        supportedDestinationChains,

        supportedAssets,
        destinationAssets,
        sourceAssets,
        polkadexAssets,

        selectedAsset,
        setSelectedAsset,
        selectedAssetBalance,

        sourceBalances,
        sourceBalancesLoading: sourceBalancesLoading && sourceBalancesFetching,
        sourceBalancesSuccess,
        onRefetchSourceBalances: sourceBalancesRefetch,

        transferConfig,
        transferConfigLoading: transferConfigLoading && transferConfigFetching,
        transferConfigSuccess,
        onRefetchTransferConfig,

        destinationPDEXBalance,
        isPolkadexChain,
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
  supportedSourceChains: Chain[];
  supportedDestinationChains: Chain[];

  destinationAccount?: ExtensionAccount;
  setDestinationAccount: Dispatch<SetStateAction<ExtensionAccount | undefined>>;

  destinationChain: Chain | null;
  setDestinationChain: Dispatch<SetStateAction<Chain | null>>;
  sourceChain: Chain | null;
  setSourceChain: Dispatch<SetStateAction<Chain | null>>;

  supportedAssets: Asset[];
  destinationAssets: Asset[];
  sourceAssets: Asset[];
  polkadexAssets: Asset[];

  selectedAsset: Asset | null;
  setSelectedAsset: Dispatch<SetStateAction<Asset | null>>;
  selectedAssetBalance: number;

  sourceBalances: AssetAmount[];
  sourceBalancesLoading: boolean;
  sourceBalancesSuccess: boolean;
  onRefetchSourceBalances?: UseQueryResult["refetch"];

  transferConfig: TransferConfig | undefined;
  transferConfigLoading: boolean;
  transferConfigSuccess: boolean;
  onRefetchTransferConfig: () => Promise<void>;

  destinationPDEXBalance: number;
  isPolkadexChain: boolean;
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
  supportedSourceChains: [],
  supportedDestinationChains: [],

  supportedAssets: [],
  destinationAssets: [],
  sourceAssets: [],
  polkadexAssets: [],

  selectedAsset: null,
  setSelectedAsset: () => {},
  selectedAssetBalance: 0,

  sourceBalances: [],
  sourceBalancesLoading: false,
  sourceBalancesSuccess: false,

  transferConfig: undefined,
  transferConfigLoading: false,
  transferConfigSuccess: false,
  onRefetchTransferConfig: async () => {},

  destinationPDEXBalance: 0,
  isPolkadexChain: false,
});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
