import {
  ExtensionAccount,
  useExtensionAccounts,
  useUserAccounts,
} from "@polkadex/react-providers";
import FileSaver from "file-saver";
import { KeyringPair } from "@polkadot/keyring/types";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import {
  transformAddress,
  useProfile,
} from "@orderbook/core/providers/user/profile";
// TODO: should be moved to polkadex-ts types
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useMemo,
  useState,
} from "react";
import {
  AddProxyAccountArgs,
  ImportFromFile,
  RemoveProxyAccountArgs,
  useAddProxyAccount,
  useImportProxyAccount,
  useOnChainBalances,
  useProxyAccounts,
  useRemoveProxyAccount,
  useSingleProxyAccount,
} from "@orderbook/core/hooks";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { POLKADEX_ASSET } from "@orderbook/core/constants";

type GenericStatus = "error" | "idle" | "success" | "loading";

export type ExportTradeAccountProps = {
  account: KeyringPair;
  password?: string;
};

type ConnectWalletState = {
  // active extension account
  // TODO: rename to selectedExtensionAccount
  selectedWallet?: ExtensionAccount;
  // active trading account
  // TODO: rename to selectedTradingAccount
  selectedAccount?: KeyringPair;
  // selected extension
  selectedExtension?: (typeof ExtensionsArray)[0];
  // list of all trading accounts in browser
  localTradingAccounts: KeyringPair[];
  // TODO: rename to onSelectExtensionAccount
  onSelectWallet: (payload: ExtensionAccount) => void;
  onSelectTradingAccount: (value: { tradeAddress: string }) => void;
  // TODO: redefine type in polkadex-ts
  onSelectExtension: (
    payload: (typeof ExtensionsArray)[0],
    callbackFn?: () => void
  ) => void;
  onResetWallet: () => void;
  onResetExtension: () => void;
  onLogout: () => void;
  onImportFromFile: (value: ImportFromFile) => Promise<void>;
  onRegisterTradeAccount: (props: AddProxyAccountArgs) => Promise<void>;
  onRemoveTradingAccountFromDevice: (value: string) => void;
  onRemoveTradingAccountFromChain: (
    value: RemoveProxyAccountArgs
  ) => Promise<void>;
  // TODO: all the below must be moved into local state of ConnectWalletInteraction
  onExportTradeAccount: (value: ExportTradeAccountProps) => void;
  onSetTempTrading: (value: KeyringPair) => void;
  onResetTempMnemonic: () => void;
  onResetTempTrading: () => void;
  tempMnemonic?: string;
  tempTrading?: KeyringPair;
  proxiesAccounts?: string[];
  proxiesStatus: GenericStatus;
  registerStatus: GenericStatus;
  removingStatus: GenericStatus;
  walletBalance?: number;
  walletStatus: GenericStatus;
  importFromFileStatus: GenericStatus;
  // mutation status
  proxiesHasError: boolean;
  proxiesLoading: boolean;
  proxiesSuccess: boolean;
  registerError: unknown;
  removingError: unknown;
  walletHasError: boolean;
  walletLoading: boolean;
  walletSuccess: boolean;
  importFromFileError: unknown;
  mainProxiesAccounts: string[];
  mainProxiesLoading: boolean;
  mainProxiesSuccess: boolean;
};

export const ConnectWalletProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [tempMnemonic, setTempMnemonic] = useState<string>("");
  const [tempTrading, setTempTrading] = useState<KeyringPair>();
  const {
    selectedAddresses,
    onUserSelectMainAddress,
    selectedExtension,
    setSelectedExtension,
    onResetSelectedExtension,
    onUserResetTradingAddress,
    onUserResetMainAddress,
    onUserLogout,
    onUserSelectTradingAddress,
  } = useProfile();
  const { onHandleAlert: onSuccess, onHandleError: onError } =
    useSettingsProvider();
  const { extensionAccounts } = useExtensionAccounts();
  // TODO: rename to useBrowserAccounts
  const { wallet, isReady, localAddresses } = useUserAccounts();
  const onSetTempMnemonic = (value: string) => setTempMnemonic(value);

  const {
    error: registerError,
    mutateAsync: onRegisterTradeAccount,
    status: registerStatus,
  } = useAddProxyAccount({
    onError,
    onSuccess,
    onSetTempMnemonic,
  });

  const {
    error: removingError,
    mutateAsync: onRemoveTradingAccountFromChain,
    status: removingStatus,
  } = useRemoveProxyAccount({
    onError,
    onSuccess,
  });

  const {
    onChainBalances,
    isOnChainBalanceLoading,
    isOnChainBalanceSuccess,
    isOnChainBalanceError,
    onChainBalanceStatus,
  } = useOnChainBalances();

  const {
    allProxiesAccounts,
    proxiesHasError,
    proxiesLoading,
    proxiesSuccess,
    proxiesStatus,
  } = useProxyAccounts(extensionAccounts);

  const { mainProxiesAccounts, mainProxiesLoading, mainProxiesSuccess } =
    useSingleProxyAccount(selectedAddresses?.mainAddress);

  const {
    error: importFromFileError,
    mutateAsync: onImportFromFile,
    status: importFromFileStatus,
  } = useImportProxyAccount({
    onSuccess,
  });

  const selectedWallet = selectedAddresses?.mainAddress
    ? extensionAccounts.find((e) => e.address === selectedAddresses.mainAddress)
    : undefined;

  const selectedAccount =
    selectedAddresses?.tradeAddress && isReady
      ? wallet.getPair(selectedAddresses.tradeAddress)
      : undefined;

  // UPDATE-CORE
  // TODO: Not updating after creating a trading account
  const localTradingAccounts = useMemo(
    () =>
      isReady
        ? localAddresses?.map((value) => wallet.getPair(value) as KeyringPair)
        : [],
    [isReady, wallet, localAddresses]
  );

  const proxiesAccounts = useMemo(() => {
    return allProxiesAccounts
      .filter(({ mainAddress }) =>
        [selectedWallet?.address, tempTrading?.address].includes(mainAddress)
      )
      .map(({ tradeAddress }) => tradeAddress);
  }, [allProxiesAccounts, selectedWallet?.address, tempTrading?.address]);

  const onSelectExtensionAccount = (payload: ExtensionAccount) => {
    const mainAddress = payload.address;
    onUserSelectMainAddress({ mainAddress });
  };

  const onSelectExtension = (
    payload: (typeof ExtensionsArray)[0],
    callbackFn?: () => void
  ) => {
    setSelectedExtension(payload);
    callbackFn?.();
  };

  const onSetTempTrading = (value: KeyringPair) => {
    setTempTrading(value);
  };

  const onResetExtension = () => {
    onResetSelectedExtension();
  };

  const onResetWallet = () => {
    onUserResetMainAddress();
  };

  const onResetTempMnemonic = () => {
    setTempMnemonic("");
  };

  const onResetTempTrading = () => {
    onUserResetTradingAddress();
  };
  const onLogout = () => {
    onUserLogout();
  };

  const onRemoveTradingAccountFromDevice = (value: string) => {
    if (selectedAddresses.tradeAddress === value) {
      onUserResetTradingAddress();
    }
    wallet.remove(value);
    onSuccess("Trading account removed from device");
  };

  const onExportTradeAccount = ({
    account: tradeAccount,
    password,
  }: ExportTradeAccountProps) => {
    try {
      tradeAccount.isLocked && tradeAccount.unlock(password);
      const blob = new Blob([JSON.stringify(tradeAccount.toJson())], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(
        blob,
        `${tradeAccount?.meta?.name}-${transformAddress(
          tradeAccount?.address
        )}.json`
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Provider
      value={{
        selectedWallet,
        selectedAccount,
        selectedExtension,
        localTradingAccounts,
        onSelectExtension,
        onSelectTradingAccount: onUserSelectTradingAddress,
        onExportTradeAccount,
        onRemoveTradingAccountFromDevice,
        onSelectWallet: onSelectExtensionAccount,
        onSetTempTrading,
        onResetExtension,
        onResetWallet,
        onResetTempMnemonic,
        onResetTempTrading,
        onLogout,

        onRegisterTradeAccount,
        registerError,
        registerStatus,

        onRemoveTradingAccountFromChain,
        removingError,
        removingStatus,

        tempMnemonic,
        tempTrading,

        walletBalance: onChainBalances?.get(POLKADEX_ASSET.id) || 0,
        walletHasError: isOnChainBalanceError,
        walletLoading: isOnChainBalanceLoading,
        walletSuccess: isOnChainBalanceSuccess,
        walletStatus: onChainBalanceStatus,

        proxiesAccounts,
        proxiesHasError,
        proxiesLoading,
        proxiesSuccess,
        proxiesStatus,

        importFromFileError,
        importFromFileStatus,
        onImportFromFile,

        mainProxiesAccounts,
        mainProxiesLoading,
        mainProxiesSuccess,
      }}
    >
      {children}
    </Provider>
  );
};

export const Context = createContext<ConnectWalletState>({
  localTradingAccounts: [],
  onSelectWallet: () => {},
  onSelectTradingAccount: () => {},
  onSelectExtension: () => {},
  onResetWallet: () => {},
  onResetExtension: () => {},
  onLogout: () => {},
  onImportFromFile: async () => {},
  onRegisterTradeAccount: async () => {},
  onRemoveTradingAccountFromDevice: () => {},
  onRemoveTradingAccountFromChain: async () => {},
  onExportTradeAccount: () => {},
  onSetTempTrading: () => {},
  onResetTempMnemonic: () => {},
  onResetTempTrading: () => {},
  proxiesAccounts: [],
  proxiesStatus: "idle",
  registerStatus: "idle",
  removingStatus: "idle",
  walletBalance: 0,
  walletStatus: "idle",
  importFromFileStatus: "idle",
  proxiesHasError: false,
  proxiesLoading: false,
  proxiesSuccess: false,
  registerError: undefined,
  removingError: undefined,
  walletHasError: false,
  walletLoading: false,
  walletSuccess: false,
  importFromFileError: undefined,
  mainProxiesAccounts: [],
  mainProxiesLoading: false,
  mainProxiesSuccess: false,
});

const Provider = ({
  value,
  children,
}: PropsWithChildren<{ value: ConnectWalletState }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
