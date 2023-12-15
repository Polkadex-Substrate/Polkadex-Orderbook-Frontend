// wrapper hook for connecting wallet state

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
import { useMemo, useState } from "react";
import {
  AddProxyAccountArgs,
  RemoveProxyAccountArgs,
  useAddProxyAccount,
  useOnChainBalances,
  useProxyAccounts,
  useRemoveProxyAccount,
} from "@orderbook/core/hooks";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { POLKADEX_ASSET } from "@orderbook/core/constants";

import { DecodedFile } from "@/ui/templates/ConnectWallet/importTradingAccount";

type GenericStatus = "error" | "idle" | "success" | "loading";

type ExportTradeAccountProps = {
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
  onImportFromFile: (file: DecodedFile, password?: string) => Promise<void>;
  onRegisterTradeAccount: (props: AddProxyAccountArgs) => Promise<void>;
  onRemoveTradingAccountFromDevice: (value: string) => Promise<void>;
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
};
export const useConnectWallet = (): ConnectWalletState => {
  const [tempMnemonic, setTempMnemonic] = useState<string>("");
  const [tempTrading, setTempTrading] = useState<KeyringPair>();
  const {
    selectedAddresses,
    onUserSelectMainAddress,
    selectedExtension,
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
  const { wallet } = useUserAccounts();
  const {
    error: registerError,
    mutateAsync: onRegisterTradeAccount,
    status: registerStatus,
  } = useAddProxyAccount({
    onError,
    onSuccess,
  });

  const {
    error: removingError,
    mutateAsync: onRemoveTradingAccountFromChain,
    status: removingStatus,
  } = useRemoveProxyAccount({ onError, onSuccess });

  const {
    onChainBalances,
    isOnChainBalanceLoading,
    isOnChainBalanceSuccess,
    isOnChainBalanceError,
    onChainBalanceStatus,
  } = useOnChainBalances([POLKADEX_ASSET.id]);

  const {
    allProxiesAccounts,
    proxiesHasError,
    proxiesLoading,
    proxiesSuccess,
    proxiesStatus,
  } = useProxyAccounts(extensionAccounts);

  const selectedWallet = selectedAddresses.mainAddress
    ? extensionAccounts.find((e) => e.address === selectedAddresses.mainAddress)
    : undefined;

  const selectedAccount = selectedAddresses.tradeAddress
    ? wallet.getPair(selectedAddresses.tradeAddress)
    : undefined;
  const localTradingAccounts = wallet.getAll();

  const proxiesAccounts = useMemo(() => {
    return allProxiesAccounts
      .filter(({ mainAddress }) =>
        [selectedWallet?.address, tempTrading?.address].includes(mainAddress)
      )
      .map(({ tradeAddress }) => tradeAddress);
  }, [allProxiesAccounts, selectedWallet?.address, tempTrading?.address]);

  // TODO: rename to onSelectExtensionAccount
  const onSelectWallet = (payload: ExtensionAccount) => {
    const mainAddress = payload.address;
    onUserSelectMainAddress({ mainAddress });
  };

  const onSelectExtensionAccount = (
    payload: (typeof ExtensionsArray)[0],
    callbackFn?: () => void
  ) => {
    selectedExtension(payload);
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

  const onRemoveTradingAccountFromDevice = async (value: string) => {
    if (selectedAddresses.tradeAddress === value) {
      onResetTempTrading();
    }
    wallet.remove(value);
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

  return {
    selectedWallet,
    selectedAccount,
    selectedExtension,
    localTradingAccounts,
    onSelectWallet,
    onSelectTradingAccount: onUserSelectTradingAddress,
    onExportTradeAccount,
    onRemoveTradingAccountFromDevice,
    onSelectExtension: onSelectExtensionAccount,
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
  };
};
