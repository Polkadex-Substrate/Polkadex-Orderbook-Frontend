import { UseQueryResult } from "@tanstack/react-query";
import { GENESIS } from "@orderbook/core/constants";
import {
  Asset,
  AssetAmount,
  Chain,
  ChainType,
  Thea,
  TransferConfig,
  getChainConnector,
} from "@polkadex/thea";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ExtensionAccount } from "@polkadex/react-providers";
import { useTheaBalances, useTheaConfig } from "@orderbook/core/hooks";

import { useConnectWalletProvider } from "../../connectWalletProvider";

export { useDirectWithdrawProvider } from "./useDirectWithdrawProvider";

export const DirectWithdrawProvider = ({ children }: PropsWithChildren) => {
  const { getAllChains } = useMemo(() => new Thea(), []);
  const [destinationChain, setDestinationChain] = useState<Chain | null>(null);
  const [destinationAccount, setDestinationAccount] =
    useState<ExtensionAccount>();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const { selectedWallet } = useConnectWalletProvider();

  const chains = useMemo(() => getAllChains(), [getAllChains]);

  /* Source Chain (which would be Polkadex always) */
  const sourceChain = useMemo(
    () => chains.find((c) => c.genesis === GENESIS[0]) as Chain,
    [chains]
  );

  const sourceConnector = useMemo(
    () => sourceChain && getChainConnector(sourceChain.genesis),
    [sourceChain]
  );

  const sourceAccountSelected = useMemo(() => selectedWallet, [selectedWallet]);

  /* Destination Chain */
  const destinationAccountSelected = useMemo(
    () =>
      destinationAccount ??
      (destinationChain?.type === ChainType.Substrate
        ? selectedWallet
        : undefined),
    [destinationAccount, selectedWallet, destinationChain?.type]
  );

  const onSelectDestinationChain = (chain: Chain) => {
    if (destinationChain?.type !== chain.type) setDestinationAccount(undefined);
    const selectedAsset = sourceConnector.getSupportedAssets(chain)[0];
    setDestinationChain(chain);
    setSelectedAsset(selectedAsset);
  };

  const isDestinationPolkadex = useMemo(
    () => !!(destinationChain?.genesis === GENESIS[0]),
    [destinationChain?.genesis]
  );

  /* Asset */
  const supportedAssets = useMemo(() => {
    if (isDestinationPolkadex) {
      return sourceConnector?.getAllAssets() || [];
    }
    return (
      (destinationChain &&
        sourceConnector?.getSupportedAssets(destinationChain)) ||
      []
    );
  }, [destinationChain, isDestinationPolkadex, sourceConnector]);

  const onSelectAsset = (asset: Asset) => {
    if (!supportedAssets.some((e) => e.ticker === asset.ticker)) return;
    setSelectedAsset(asset);
  };

  /* Fetch balance for supported assets for source chain */
  const {
    data: sourceBalances = [],
    isLoading: sourceBalancesLoading,
    isFetching: sourceBalancesFetching,
    isSuccess: sourceBalancesSuccess,
    refetch: sourceBalancesRefetch,
  } = useTheaBalances({
    connector: sourceConnector,
    sourceAddress: sourceAccountSelected?.address,
    assets: supportedAssets,
    chain: sourceChain?.genesis,
  });

  const selectedAssetBalance = useMemo(
    () =>
      selectedAsset && sourceBalances
        ? sourceBalances.find((e) => e.ticker === selectedAsset?.ticker)
            ?.amount ?? 0
        : 0,
    [selectedAsset, sourceBalances]
  );

  /* Fetch transfer config for selected asset & source chain */
  const {
    data: transferConfig,
    isLoading: transferConfigLoading,
    isFetching: transferConfigFetching,
    isSuccess: transferConfigSuccess,
    refetch: refetchTransferConfig,
  } = useTheaConfig({
    connector: sourceConnector,
    sourceAddress: sourceAccountSelected?.address,
    destinationAddress: destinationAccountSelected?.address,
    selectedAsset,
    destinationChain,
  });

  /* Default Selection Logic  */
  const initialDestination = useMemo(() => {
    return chains.find((c) => c.genesis === GENESIS[1]);
  }, [chains]);

  useEffect(() => {
    if (initialDestination && !destinationChain)
      setDestinationChain(initialDestination);
  }, [destinationChain, initialDestination]);

  useEffect(() => {
    if (!selectedAsset && destinationChain && sourceChain && supportedAssets)
      setSelectedAsset(supportedAssets[0]);
  }, [selectedAsset, destinationChain, sourceChain, supportedAssets]);

  return (
    <Provider
      value={{
        chains,

        sourceChain,
        sourceAccount: sourceAccountSelected,

        destinationChain,
        onSelectDestinationChain,
        isDestinationPolkadex,
        destinationAccount: destinationAccountSelected,
        setDestinationAccount,

        supportedAssets,
        selectedAsset,
        onSelectAsset,
        selectedAssetBalance,

        sourceBalances,
        sourceBalancesLoading: sourceBalancesLoading && sourceBalancesFetching,
        sourceBalancesSuccess,
        onRefetchSourceBalances: sourceBalancesRefetch,

        transferConfig,
        transferConfigLoading: transferConfigLoading && transferConfigFetching,
        transferConfigSuccess,
        onRefetchTransferConfig: refetchTransferConfig,
      }}
    >
      {children}
    </Provider>
  );
};

type State = {
  chains: Chain[];

  sourceChain: Chain | null;
  sourceAccount?: ExtensionAccount;

  destinationChain: Chain | null;
  onSelectDestinationChain: (chain: Chain) => void;
  isDestinationPolkadex: boolean;
  destinationAccount?: ExtensionAccount;
  setDestinationAccount: Dispatch<SetStateAction<ExtensionAccount | undefined>>;

  supportedAssets: Asset[];
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
  selectedAssetBalance: number;

  sourceBalances: AssetAmount[];
  sourceBalancesLoading: boolean;
  sourceBalancesSuccess: boolean;
  onRefetchSourceBalances?: UseQueryResult["refetch"];

  transferConfig: TransferConfig | undefined;
  transferConfigLoading: boolean;
  transferConfigSuccess: boolean;
  onRefetchTransferConfig?: UseQueryResult["refetch"];
};

const Context = createContext<State>({
  chains: [],

  sourceChain: null,
  sourceAccount: undefined,

  destinationChain: null,
  onSelectDestinationChain: () => {},
  isDestinationPolkadex: false,
  destinationAccount: undefined,
  setDestinationAccount: () => {},

  supportedAssets: [],
  selectedAsset: null,
  onSelectAsset: () => {},
  selectedAssetBalance: 0,

  sourceBalances: [],
  sourceBalancesLoading: false,
  sourceBalancesSuccess: false,

  transferConfig: undefined,
  transferConfigLoading: false,
  transferConfigSuccess: false,
});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const WithdrawContext = Context;
