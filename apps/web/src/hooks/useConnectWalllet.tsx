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
  selectedWallet?: ExtensionAccount;
  // active trading account
  selectedAccount?: KeyringPair;
  // selected extension
  selectedExtension?: (typeof ExtensionsArray)[0];
  // list of all trading accounts in browser
  localTradingAccounts: KeyringPair[];

  onSelectWallet: (payload: ExtensionAccount) => void;
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
  // TODO: all the below must be moved into state of ConnectWalletInteraction
  onSetTempTrading: (value: KeyringPair) => void;
  onResetTempMnemonic: () => void;
  onResetTempTrading: () => void;
  tempMnemonic?: string;
  tempTrading?: KeyringPair;
  proxiesAccounts?: string[];
  proxiesHasError: boolean;
  proxiesLoading: boolean;
  proxiesSuccess: boolean;

  registerError: unknown;
  registerStatus: GenericStatus;
  removingStatus: GenericStatus;
  removingError: unknown;

  tradingAccounts?: KeyringPair[];
  tradingHasError: boolean;
  tradingLoading: boolean;
  tradingSuccess: boolean;

  walletBalance?: number;
  walletHasError: boolean;
  walletLoading: boolean;
  walletSuccess: boolean;

  importFromFileStatus: GenericStatus;
  importFromFileError: unknown;
};
export const useConnectWallet = (): ConnectWalletState => {
  const {
    selectedAccount: { mainAddress, tradeAddress },
  } = useProfile();
  const { extensionAccounts } = useExtensionAccounts();
  const { wallet } = useUserAccounts();

  const selectedWallet =
    mainAddress && extensionAccounts.find((e) => e.address === mainAddress);

  const selectedAccount = tradeAddress && wallet.getPair(tradeAddress);
  const localTradingAccounts = wallet.getAll();

  return {
    selectedWallet,
    selectedAccount,
    localTradingAccounts,
  };
};
