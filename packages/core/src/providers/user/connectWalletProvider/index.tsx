"use client";

import {
  ExtensionAccount,
  useExtensionAccounts,
  useUserAccounts,
} from "@polkadex/react-providers";
import FileSaver from "file-saver";
import { KeyringPair } from "@polkadot/keyring/types";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { GDriveExternalAccountStore } from "@polkadex/local-wallets";
import { defaultConfig } from "@orderbook/core/config";
import keyring from "@polkadot/ui-keyring";

import { POLKADEX_ASSET } from "../../../constants";
import { transformAddress, useProfile } from "../../user/profile";
import {
  AddProxyAccountArgs,
  ImportFromFile,
  ImportFromMnemonic,
  RemoveProxyAccountArgs,
  useAddProxyAccount,
  useImportProxyAccount,
  useImportProxyAccountMnemonic,
  useOnChainBalances,
  useProxyAccounts,
  useRemoveProxyAccount,
  useSingleProxyAccount,
} from "../../../hooks";
import { useSettingsProvider } from "../../public/settings";

export type GenericStatus = "error" | "idle" | "success" | "loading";

export { useConnectWalletProvider } from "./useConnectWallet";
export type ExportTradeAccountProps = {
  account: KeyringPair;
  password?: string;
};

export const GoogleDrive = new GDriveExternalAccountStore(
  defaultConfig.googleApiKey,
  defaultConfig.googleClientId
);

export type Account = {
  data: KeyringPair;
  type: "Browser" | "Google Drive";
};
type ConnectWalletState = {
  // active extension account
  // TODO: rename to selectedExtensionAccount
  selectedWallet?: ExtensionAccount;
  // active trading account
  // TODO: rename to selectedTradingAccount
  selectedAccount?: Account; // TODO: Remove
  // selected extension
  selectedExtension?: (typeof ExtensionsArray)[0];
  // list of all trading accounts in browser
  localTradingAccounts: Account[];
  // TODO: rename to onSelectExtensionAccount
  onSelectWallet: (payload: ExtensionAccount) => void;
  onSelectTradingAccount: (value: Account) => void;
  // TODO: redefine type in polkadex-ts
  onSelectExtension: (
    payload: (typeof ExtensionsArray)[0],
    callbackFn?: () => void
  ) => void;
  onResetWallet: () => void;
  onResetExtension: () => void;
  onLogout: () => void;
  onImportFromFile: (value: ImportFromFile) => Promise<void>;
  onImportFromMnemonic: (value: ImportFromMnemonic) => Promise<void>;
  onRegisterTradeAccount: (props: AddProxyAccountArgs) => Promise<void>;
  onRemoveTradingAccountFromDevice: (value: string) => void;
  onRemoveTradingAccountFromChain: (
    value: RemoveProxyAccountArgs
  ) => Promise<void>;
  // TODO: all the below must be moved into local state of ConnectWalletInteraction
  onExportTradeAccount: (value: ExportTradeAccountProps) => void;
  onSetTempTrading: (value: Account) => void;
  onResetTempMnemonic: () => void;
  onResetTempTrading: () => void;
  tempMnemonic?: string;
  tempTrading?: Account;
  proxiesAccounts?: string[];
  proxiesStatus: GenericStatus;
  registerStatus: GenericStatus;
  removingStatus: GenericStatus;
  walletBalance?: number;
  walletStatus: GenericStatus;
  importFromFileStatus: GenericStatus;
  importFromMnemonicStatus: GenericStatus;
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
  importFromMnemonicError: unknown;
  browserAccountPresent: boolean;
  extensionAccountPresent: boolean;
  hasAccount: boolean;

  onBackupGoogleDrive: (value: ExportTradeAccountProps) => Promise<void>;
  backupGoogleDriveLoading: UseMutationResult["isLoading"];
  backupGoogleDriveSuccess: UseMutationResult["isSuccess"];

  onConnectGoogleDrive: () => Promise<void>;
  connectGoogleDriveLoading: UseMutationResult["isLoading"];
  connectGoogleDriveSuccess: UseMutationResult["isSuccess"];

  onRemoveGoogleDrive: (value: string) => Promise<void>;
  removeGoogleDriveLoading: UseMutationResult["isLoading"];
  removeGoogleDriveSuccess: UseMutationResult["isSuccess"];

  gDriveReady: boolean;
  googleDriveAccounts?: Account[];
};

export const ConnectWalletProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [gDriveReady, setGDriveReady] = useState(false);
  const [tempMnemonic, setTempMnemonic] = useState<string>("");
  const [tempTrading, setTempTrading] = useState<Account>();
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
  const { onHandleAlert, onHandleError } = useSettingsProvider();
  const { extensionAccounts } = useExtensionAccounts();
  // TODO: rename to useBrowserAccounts
  const { wallet, isReady, localAddresses } = useUserAccounts();
  const onSetTempMnemonic = (value: string) => setTempMnemonic(value);

  const {
    error: removingError,
    mutateAsync: onRemoveTradingAccountFromChain,
    status: removingStatus,
  } = useRemoveProxyAccount({
    onError: (e: Error) => {
      onHandleError(e.message);
    },
    onSuccess: (msg) => msg && onHandleAlert(msg),
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
    onSuccess: (msg) => msg && onHandleAlert(msg),
  });

  const {
    error: importFromMnemonicError,
    mutateAsync: onImportFromMnemonic,
    status: importFromMnemonicStatus,
  } = useImportProxyAccountMnemonic({
    onSuccess: (msg) => msg && onHandleAlert(msg),
  });

  const selectedWallet = useMemo(
    () =>
      selectedAddresses?.mainAddress
        ? extensionAccounts.find(
            (e) => e.address === selectedAddresses.mainAddress
          )
        : undefined,
    [extensionAccounts, selectedAddresses.mainAddress]
  );

  // Sort proxy accounts in order of thier presence in browser
  const sortedMainProxiesAccounts = useMemo(
    () =>
      mainProxiesAccounts.sort((a, b) => {
        if (localAddresses.indexOf(a) < localAddresses.indexOf(b)) {
          return 1;
        } else {
          return -1;
        }
      }),
    [localAddresses, mainProxiesAccounts]
  );

  const proxiesAccounts = useMemo(() => {
    return allProxiesAccounts
      .filter(({ mainAddress }) =>
        [selectedWallet?.address, tempTrading?.data?.address].includes(
          mainAddress
        )
      )
      .map(({ tradeAddress }) => tradeAddress);
  }, [allProxiesAccounts, selectedWallet?.address, tempTrading?.data?.address]);

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

  const onSetTempTrading = (value: Account) => {
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
    setTempTrading(undefined);
  };
  const onLogout = () => {
    onUserLogout();
  };

  const onRemoveTradingAccountFromDevice = (value: string) => {
    if (selectedAddresses.tradeAddress === value) {
      onUserResetTradingAddress();
    }
    wallet.remove(value);
    onHandleAlert("Trading account removed from device");
  };

  const onExportTradeAccount = ({
    account: tradeAccount,
    password,
  }: ExportTradeAccountProps) => {
    try {
      tradeAccount.isLocked && tradeAccount.unlock(password);
      const blob = new Blob([JSON.stringify(tradeAccount.toJson(password))], {
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

  const extensionAccountPresent = useMemo(
    () => !!Object.keys(selectedWallet ?? {})?.length,
    [selectedWallet]
  );

  const hasAccount = useMemo(
    () => !!mainProxiesAccounts?.length,
    [mainProxiesAccounts?.length]
  );
  const {
    mutateAsync: onBackupGoogleDrive,
    isLoading: backupGoogleDriveLoading,
    isSuccess: backupGoogleDriveSuccess,
  } = useMutation({
    mutationFn: async ({
      account: tradeAccount,
      password,
    }: ExportTradeAccountProps) => {
      tradeAccount.isLocked && tradeAccount.unlock(password);
      const jsonAccount = tradeAccount.toJson(password);
      if (!gDriveReady) {
        await GoogleDrive.init();
        setGDriveReady(true);
      }
      await GoogleDrive.addFromJson(jsonAccount);
    },
    onError: (error: { message: string }) =>
      onHandleError(error?.message ?? error),
  });

  const {
    mutateAsync: onConnectGoogleDrive,
    isLoading: connectGoogleDriveLoading,
    isSuccess: connectGoogleDriveSuccess,
  } = useMutation({
    mutationFn: async () => {
      if (!gDriveReady) {
        await GoogleDrive.init();
        setGDriveReady(true);
      }
    },
    onError: (error: { message: string }) =>
      onHandleError(error?.message ?? error),
  });

  const { data: googleDriveAccounts, refetch: onRefetchGoogleDriveAccounts } =
    useQuery({
      enabled: gDriveReady,
      queryKey: [!!gDriveReady],
      initialData: [],
      queryFn: async () => {
        const accounts = await GoogleDrive.getAll();
        return accounts.map((account) => ({
          type: "Google Drive",
          data: keyring.createFromJson(account),
        })) as Account[];
      },
      onError: (error: { message: string }) =>
        onHandleError(error?.message ?? error),
    });

  const {
    error: registerError,
    mutateAsync: onRegisterTradeAccount,
    status: registerStatus,
  } = useAddProxyAccount({
    onError: (e: Error) => onHandleError(e.message),
    onSuccess: (msg) => msg && onHandleAlert(msg),
    onSetTempMnemonic,
    onRefetchGoogleDriveAccounts,
  });
  const {
    mutateAsync: onRemoveGoogleDrive,
    isLoading: removeGoogleDriveLoading,
    isSuccess: removeGoogleDriveSuccess,
  } = useMutation({
    mutationFn: async (value: string) => {
      if (!gDriveReady) {
        await GoogleDrive.init();
        setGDriveReady(true);
      }

      await GoogleDrive.remove(value);
      await onRefetchGoogleDriveAccounts();
    },
    onError: (error: { message: string }) =>
      onHandleError(error?.message ?? error),
  });

  const localAccounts = useMemo(
    () =>
      isReady
        ? (localAddresses?.map((value) => ({
            type: "Browser",
            data: wallet.getPair(value),
          })) as Account[])
        : [],
    [localAddresses, wallet, isReady]
  );

  const localTradingAccounts = useMemo(
    () => [...googleDriveAccounts, ...localAccounts],
    [localAccounts, googleDriveAccounts]
  );

  const selectedAccount = useMemo(() => {
    const selected = selectedAddresses?.tradeAddress;
    const availableLocalAccount = localAccounts?.find(
      (e) => e.data.address === selectedAddresses?.tradeAddress
    );
    const availableExternalAccount = googleDriveAccounts?.find(
      (e) => e.data.address === selectedAddresses?.tradeAddress
    );
    if (availableLocalAccount && selected && isReady) {
      return availableLocalAccount;
    } else if (availableExternalAccount && selected)
      return availableExternalAccount;

    return undefined;
  }, [
    googleDriveAccounts,
    localAccounts,
    isReady,
    selectedAddresses?.tradeAddress,
  ]);

  const browserAccountPresent = useMemo(
    () => !!Object.keys(selectedAccount ?? {})?.length,
    [selectedAccount]
  );

  const onSelectTradingAccount = useCallback(
    async ({ type, data }: Account) => {
      await onUserSelectTradingAddress({
        tradeAddress: data.address,
        isNew: type !== "Browser",
      });
    },
    [onUserSelectTradingAddress]
  );

  return (
    <Provider
      value={{
        hasAccount,
        browserAccountPresent,
        extensionAccountPresent,
        selectedWallet,
        selectedAccount,
        selectedExtension,
        localTradingAccounts,
        onSelectExtension,
        onSelectTradingAccount,
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

        importFromMnemonicError,
        importFromMnemonicStatus,
        onImportFromMnemonic,

        mainProxiesAccounts: sortedMainProxiesAccounts,
        mainProxiesLoading,
        mainProxiesSuccess,

        onBackupGoogleDrive,
        backupGoogleDriveLoading,
        backupGoogleDriveSuccess,

        onConnectGoogleDrive,
        connectGoogleDriveLoading,
        connectGoogleDriveSuccess,

        onRemoveGoogleDrive,
        removeGoogleDriveLoading,
        removeGoogleDriveSuccess,

        gDriveReady,
        googleDriveAccounts,
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
  onImportFromMnemonic: async () => {},
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
  importFromMnemonicStatus: "idle",
  proxiesHasError: false,
  proxiesLoading: false,
  proxiesSuccess: false,
  registerError: undefined,
  removingError: undefined,
  walletHasError: false,
  walletLoading: false,
  walletSuccess: false,
  importFromFileError: undefined,
  importFromMnemonicError: undefined,
  mainProxiesAccounts: [],
  mainProxiesLoading: false,
  mainProxiesSuccess: false,
  extensionAccountPresent: false,
  browserAccountPresent: false,
  hasAccount: false,
  onBackupGoogleDrive: async () => {},
  backupGoogleDriveLoading: true,
  backupGoogleDriveSuccess: false,
  onConnectGoogleDrive: async () => {},
  connectGoogleDriveLoading: true,
  connectGoogleDriveSuccess: false,
  onRemoveGoogleDrive: async () => {},
  removeGoogleDriveLoading: true,
  removeGoogleDriveSuccess: false,
  googleDriveAccounts: [],
  gDriveReady: false,
});

const Provider = ({
  value,
  children,
}: PropsWithChildren<{ value: ConnectWalletState }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
