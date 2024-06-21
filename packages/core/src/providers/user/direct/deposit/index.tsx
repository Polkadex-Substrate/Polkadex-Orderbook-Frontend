import { UseQueryResult } from "@tanstack/react-query";
import { ExtensionAccount } from "@polkadex/react-providers";
import {
  Chain,
  Asset,
  Thea,
  ChainType,
  getChainConnector,
  AssetAmount,
  TransferConfig,
} from "@polkadex/thea";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { GENESIS } from "@orderbook/core/constants";
import { useTheaBalances, useTheaConfig } from "@orderbook/core/hooks";

import { useConnectWalletProvider } from "../../connectWalletProvider";

export const DirectDepositProvider = ({ children }: PropsWithChildren) => {
  const { getAllChains } = useMemo(() => new Thea(), []);
  const [sourceChain, setSourceChain] = useState<Chain | null>(null);
  const [sourceAccount, setSourceAccount] = useState<ExtensionAccount>();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const { selectedWallet } = useConnectWalletProvider();

  const chains = useMemo(() => getAllChains(), [getAllChains]);

  /* Source chain */
  const sourceConnector = useMemo(
    () => sourceChain && getChainConnector(sourceChain.genesis),
    [sourceChain]
  );

  const sourceAccountSelected = useMemo(
    () =>
      sourceAccount ??
      (sourceChain?.type === ChainType.Substrate ? selectedWallet : undefined),
    [sourceAccount, selectedWallet, sourceChain?.type]
  );

  const onSelectSourceChain = (chain: Chain) => {
    if (sourceChain?.type !== chain.type) setSourceAccount(undefined);
    const connector = getChainConnector(chain.genesis);
    const selectedAsset = connector.getSupportedAssets(destinationChain)[0];
    setSourceChain(chain);
    setSelectedAsset(selectedAsset);
  };

  /* Destination Chain (which would be Polkadex always) */
  const destinationChain = useMemo(
    () => chains.find((c) => c.genesis === GENESIS[0]) as Chain,
    [chains]
  );

  const destinationAccountSelected = useMemo(
    () => selectedWallet,
    [selectedWallet]
  );

  /* Asset */
  const supportedAssets = useMemo(
    () =>
      (destinationChain &&
        sourceConnector?.getSupportedAssets(destinationChain)) ||
      [],
    [destinationChain, sourceConnector]
  );

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

  /* Fetch transfer config for selected asset & source chain */
  const {
    data: transferConfig,
    isLoading: transferConfigLoading,
    isFetching: transferConfigFetching,
    isSuccess: transferConfigSuccess,
    refetch: refetchTransferConfig,
  } = useTheaConfig({
    connector: sourceConnector,
    destinationAddress: selectedWallet?.address,
    sourceAddress: destinationAccountSelected?.address,
    selectedAsset,
    destinationChain,
  });

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
        chains,

        sourceChain,
        onSelectSourceChain,
        sourceAccount,
        setSourceAccount,

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
  onSelectSourceChain: (chain: Chain) => void;
  sourceAccount?: ExtensionAccount;
  setSourceAccount: Dispatch<SetStateAction<ExtensionAccount | undefined>>;

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

export const Context = createContext<State>({
  chains: [],

  sourceChain: null,
  onSelectSourceChain: () => {},
  sourceAccount: undefined,
  setSourceAccount: () => {},

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
