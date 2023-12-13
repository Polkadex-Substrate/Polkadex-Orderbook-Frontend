// TODO: TOBE DEPRECATED
import { useMemo, useState } from "react";
import { useExtensionWallet } from "@orderbook/core/providers/user/extensionWallet";
import { useTradeWallet } from "@orderbook/core/providers/user/tradeWallet";
import { ExtensionAccount } from "@orderbook/core/providers/types";
import { useProfile } from "@orderbook/core/providers/user/profile";

import { IUserTradeAccount } from "../";

export const useSettings = () => {
  const [showRegistered, setShowRegistered] = useState(false);
  const [showPresent, setShowPresent] = useState(true);

  const [filterControllerWallets, setFilterControllerWallets] = useState("");
  const [filterTradeAccounts, setFilterTradeAccounts] = useState("");
  const [
    filterTradeAccountsByControllerAccount,
    setFilterTradeAccountsByControllerAccount,
  ] = useState("All");
  const [avatarModal, setAvatarModal] = useState(false);

  const [currentControllerWallet, setCurrentControllerWallet] =
    useState<ExtensionAccount | null>(null);

  const handleChangeCurrentControllerWallet = (
    account: ExtensionAccount | null
  ) => setCurrentControllerWallet(account);

  const profileState = useProfile();
  const extensionWalletState = useExtensionWallet();
  const tradeWalletState = useTradeWallet();

  const currentTradeAccount = profileState.selectedAccount;
  const isTradeAccountLoading = tradeWalletState.registerAccountLoading;
  const isControllerAccountLoading =
    extensionWalletState.registerMainAccountLoading;
  const controllerWallets = extensionWalletState.allAccounts;
  const browserTradeAccounts = tradeWalletState.allBrowserAccounts;
  const linkedMainAddress = [];
  const isTradeAccountSuccess = tradeWalletState.registerAccountSuccess;
  const isImportAccountSuccess = tradeWalletState.importAccountSuccess;
  const { isActive } = tradeWalletState?.registerAccountModal;
  const { selectedAccount: usingAccount } = useProfile();
  const isRegisterMainAccountSuccess =
    extensionWalletState?.registerMainAccountSuccess;
  const defaultTradeAddress = "";
  const defaultFundingAddress = "";

  const isPreviewActive = tradeWalletState.previewAccountModal.isActive;
  const previewAccountSelected = tradeWalletState.previewAccountModal.selected;
  const isLoading = isTradeAccountLoading || isControllerAccountLoading;

  const tradeAccounts = useMemo(
    () =>
      []?.map(({ tradeAddress }): IUserTradeAccount => {
        const account = browserTradeAccounts.find(
          ({ address }) => address === tradeAddress
        );
        if (account) {
          return {
            address: tradeAddress,
            isPresentInBrowser: true,
            account: account,
          };
        } else {
          return {
            address: tradeAddress,
            isPresentInBrowser: false,
          };
        }
      }),
    [browserTradeAccounts]
  );

  const allFilteredTradeAccounts = [] as any;

  /* Filtering the controllerWallets array based on the filterControllerWallets string. Sort and filter by registered address */
  const allFilteredControllerWallets = [] as any;
  const hasRegisteredMainAccount = useMemo(
    () => linkedMainAddress && linkedMainAddress?.length > 0,
    [linkedMainAddress]
  );

  const { onRegisterMainAccountReset } = useExtensionWallet();

  const handleCloseNewAccount = () => {
    const hasAction =
      isTradeAccountSuccess ||
      !isLoading ||
      isImportAccountSuccess ||
      isRegisterMainAccountSuccess;

    if (hasAction) {
      if (isRegisterMainAccountSuccess || isImportAccountSuccess) {
        onRegisterMainAccountReset();
        tradeWalletState.onRegisterAccountModalCancel();
      } else if (!isRegisterMainAccountSuccess && isTradeAccountSuccess) {
        tradeWalletState.onRegisterTradeAccountReset();
      } else {
        tradeWalletState.onRegisterAccountModalCancel();
      }
    }
  };
  const handleClosePreviewModal = () =>
    tradeWalletState.onPreviewAccountModalCancel();

  const filterTradeAccountsByControllerAccountHeader = useMemo(
    () =>
      controllerWallets?.find(
        (value) =>
          value?.account?.address?.toLowerCase() ===
          filterTradeAccountsByControllerAccount?.toLowerCase()
      )?.account?.meta?.name || "All",
    [controllerWallets, filterTradeAccountsByControllerAccount]
  );

  return {
    handleClosePreviewModal,
    handleCloseNewAccount,
    currentControllerWallet,
    currentTradeAccount,
    isTradeAccountLoading,
    isControllerAccountLoading,
    controllerWallets,
    tradeAccounts,
    allFilteredTradeAccounts,
    userAccounts: [] as any,
    linkedMainAddress,
    filterControllerWallets: allFilteredControllerWallets,
    isTradeAccountSuccess,
    isImportAccountSuccess,
    isActive,
    usingAccount,
    isRegisterMainAccountSuccess,
    isLoading,
    isPreviewActive,
    previewAccountSelected,
    handleFilterTradeAccounts: setFilterTradeAccounts,
    handleFilterControllerWallets: setFilterControllerWallets,
    handleChangeCurrentControllerWallet,
    showRegistered,
    handleChangeShowRegistered: () => setShowRegistered(!showRegistered),
    showPresent,
    handleChangeShowPresent: () => setShowPresent(!showPresent),
    filterTradeAccountsByControllerAccount:
      filterTradeAccountsByControllerAccountHeader,
    handleFilterTradeAccountByController:
      setFilterTradeAccountsByControllerAccount,
    defaultTradeAddress,
    defaultFundingAddress,
    avatarModal,
    handleCloseAvatarModal: () => setAvatarModal(false),
    handleOpenAvatarModal: () => setAvatarModal(true),
    hasRegisteredMainAccount,
  };
};
