import { GENESIS } from "@orderbook/core/constants";
import { Asset, Chain, Thea } from "@polkadex/thea";
import { PropsWithChildren, createContext, useMemo, useState } from "react";
import { ExtensionAccount } from "@polkadex/react-providers";

import { useConnectWalletProvider } from "../../connectWalletProvider";

export { useDirectWithdrawProvider } from "./useDirectWithdrawProvider";

export const DirectWithdrawProvider = ({ children }: PropsWithChildren) => {
  const { getAllChains } = useMemo(() => new Thea(), []);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const { selectedWallet } = useConnectWalletProvider();

  const chains = useMemo(() => getAllChains(), [getAllChains]);

  /* Source Chain (which would be Polkadex always) */
  const sourceChain = useMemo(
    () => chains.find((c) => c.genesis === GENESIS[0]) as Chain,
    [chains]
  );

  const sourceAccountSelected = useMemo(() => selectedWallet, [selectedWallet]);

  return (
    <Provider
      value={{ chains, sourceChain, sourceAccount: sourceAccountSelected }}
    >
      {children}
    </Provider>
  );
};

type State = {
  chains: Chain[];

  sourceChain: Chain | null;
  sourceAccount?: ExtensionAccount;
};

const Context = createContext<State>({
  chains: [],

  sourceChain: null,
  sourceAccount: undefined,
});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const WithdrawContext = Context;
