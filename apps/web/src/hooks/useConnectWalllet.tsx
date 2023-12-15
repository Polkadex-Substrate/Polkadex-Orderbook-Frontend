// wrapper hook for connecting wallet state

import {
  ExtensionAccount,
  useExtensionAccounts,
  useUserAccounts,
} from "@polkadex/react-providers";
import { KeyringPair } from "@polkadot/keyring/types";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { useProfile } from "@orderbook/core/providers/user/profile";
// TODO: should be moved to polkadex-ts types
import { useState } from "react";

import { DecodedFile } from "@/ui/templates/ConnectWallet/importTradingAccount";

type GenericStatus = "error" | "idle" | "success" | "loading";

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
  // TODO: rename to onSelectTradingAccount
  onSelectAccount: (payload: KeyringPair) => void;
  // TODO: redefine type in polkadex-ts
  onSelectExtension: (
    payload: (typeof ExtensionsArray)[0],
    callbackFn?: () => void
  ) => void;
  onResetWallet: () => void;
  onResetExtension: () => void;
  onLogout: () => void;
  onImportFromFile: (file: DecodedFile, password?: string) => Promise<void>;
  onRegisterTradeAccount: (
    mnemonic: string,
    password: string,
    name: string
  ) => Promise<void>;
  onRemoveTradingAccountFromDevice: (value: string) => Promise<void>;
  onRemoveTradingAccountFromChain: (address: string) => Promise<void>;
  // TODO: all the below must be moved into local state of ConnectWalletInteraction
  onExportTradeAccount: (account: KeyringPair, password?: string) => void;
  onSetTempTrading: (value: KeyringPair) => void;
  onResetTempMnemonic: () => void;
  onResetTempTrading: () => void;
  tempMnemonic?: string;
  tempTrading?: KeyringPair;
  proxiesAccounts?: string[];
  proxiesStatus: GenericStatus;
  registerStatus: GenericStatus;
  removingStatus: GenericStatus;
  tradingAccounts?: KeyringPair[];
  tradingStatus: GenericStatus;
  walletBalance?: number;
  walletStatus: GenericStatus;
  importFromFileStatus: GenericStatus;
  // mutation status
  proxiesHasError: boolean;
  proxiesLoading: boolean;
  proxiesSuccess: boolean;
  registerError: unknown;
  removingError: unknown;
  tradingHasError: boolean;
  tradingLoading: boolean;
  tradingSuccess: boolean;
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
  } = useProfile();
  const { extensionAccounts } = useExtensionAccounts();
  // TODO: rename to useBrowserAccounts
  const { wallet } = useUserAccounts();

  const selectedWallet = selectedAddresses.mainAddress
    ? extensionAccounts.find((e) => e.address === selectedAddresses.mainAddress)
    : undefined;

  const selectedAccount = selectedAddresses.tradeAddress
    ? wallet.getPair(selectedAddresses.tradeAddress)
    : undefined;
  const localTradingAccounts = wallet.getAll();

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
      onUserResetTradingAddress();
    }
    wallet.remove(value);
  };

  return {
    selectedWallet,
    selectedAccount,
    localTradingAccounts,
    onSelectWallet,
    onRemoveTradingAccountFromDevice,
    onSelectExtensionAccount,
    onSetTempTrading,
    onResetExtension,
    onResetWallet,
    onResetTempMnemonic,
    onResetTempTrading,
    onLogout,
  };
};
