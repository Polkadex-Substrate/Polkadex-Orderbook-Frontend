import { GENESIS } from "@orderbook/core/constants";
import {
  Asset,
  Chain,
  ChainType,
  Thea,
  getChainConnector,
} from "@polkadex/thea";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { ExtensionAccount } from "@polkadex/react-providers";

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
});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const WithdrawContext = Context;
