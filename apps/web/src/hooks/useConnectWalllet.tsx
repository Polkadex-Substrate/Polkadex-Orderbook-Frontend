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
  onSelectExtension: (
    payload: (typeof ExtensionsArray)[0],
    callbackFn?: CallbackFn
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
  onExportTradeAccount: (account: KeyringPair, password?: string) => void;
  onRemoveTradingAccountFromDevice: (value: string) => Promise<void>;
  onRemoveTradingAccountFromChain: (address: string) => Promise<void>;
  // TODO: all the below must be moved into local state of ConnectWalletInteraction
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
};
export const useConnectWallet = (): ConnectWalletState => {
  const {
    selectedAddresses: { mainAddress, tradeAddress },
    onUserSelectMainAddress,
  } = useProfile();
  const { extensionAccounts } = useExtensionAccounts();
  const { wallet } = useUserAccounts();

  const selectedWallet =
    mainAddress && extensionAccounts.find((e) => e.address === mainAddress);

  const selectedAccount = tradeAddress && wallet.getPair(tradeAddress);
  const localTradingAccounts = wallet.getAll();

  // TODO: rename to onSelectExtensionAccount
  const onSelectWallet = (payload: ExtensionAccount) => {
    const mainAddress = payload.address;
    onUserSelectMainAddress(mainAddress);
  };

  return {
    selectedWallet,
    selectedAccount,
    localTradingAccounts,
    onSelectWallet,
  };
};
