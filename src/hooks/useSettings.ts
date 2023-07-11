// TODO: Refactor hook
import { useMemo, useState } from "react";

import { useAuth } from "../providers/user/auth";
import { useExtensionWallet } from "../providers/user/extensionWallet";
import { useTradeWallet } from "../providers/user/tradeWallet";

import { ExtensionAccount } from "@polkadex/orderbook/providers/types";
import { IUserTradeAccount } from "@polkadex/orderbook/hooks/types";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

export const useSettings = () => {
  const [showRegistered, setShowRegistered] = useState(false);
  const [filterControllerWallets, setFilterControllerWallets] = useState("");
  const [filterTradeAccounts, setFilterTradeAccounts] = useState("");
  const [filterTradeAccountsByControllerAccount, setFilterTradeAccountsByControllerAccount] =
    useState("All");
  const [avatarModal, setAvatarModal] = useState(false);

  const [currentControllerWallet, setCurrentControllerWallet] =
    useState<ExtensionAccount | null>(null);

  const handleChangeCurrentControllerWallet = (account: ExtensionAccount | null) =>
    setCurrentControllerWallet(account);

  const profileState = useProfile();
  const authState = useAuth();
  const extensionWalletState = useExtensionWallet();
  const tradeWalletState = useTradeWallet();

  const currentTradeAccount = profileState.selectedAccount;
  const isTradeAccountLoading = tradeWalletState.registerAccountLoading;
  const isControllerAccountLoading = extensionWalletState.registerMainAccountLoading;
  const controllerWallets = extensionWalletState.allAccounts;
  const browserTradeAccounts = tradeWalletState.allBrowserAccounts;
  const {
    userData: { userAccounts: allAccounts },
  } = useProfile();
  const authInfo = profileState.authInfo;
  const user = {
    ...authInfo,
    email: authState.email,
    isConfirmed: authState.userConfirmed,
  };
  const {
    userData: { userAccounts },
  } = useProfile();
  const linkedMainAddress = profileState.userData?.mainAccounts;
  const isTradeAccountSuccess = tradeWalletState.registerAccountSuccess;
  const isImportAccountSuccess = tradeWalletState.importAccountSuccess;
  const { isActive } = tradeWalletState?.registerAccountModal;
  const { selectedAccount: usingAccount } = useProfile();
  const isRegisterMainAccountSuccess = extensionWalletState.registerMainAccountSuccess;
  const defaultTradeAddress = profileState.defaultTradeAccount;
  const defaultFundingAddress =
    defaultTradeAddress &&
    profileState.userData?.userAccounts?.find(
      ({ tradeAddress }) => tradeAddress === defaultTradeAddress
    )?.mainAddress;

  const isPreviewActive = tradeWalletState.previewAccountModal.isActive;
  const previewAccountSelected = tradeWalletState.previewAccountModal.selected;
  const isLoading = isTradeAccountLoading || isControllerAccountLoading;

  const tradeAccounts = useMemo(
    () =>
      allAccounts?.map(({ tradeAddress }): IUserTradeAccount => {
        const account = browserTradeAccounts.find(({ address }) => address === tradeAddress);
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
    [allAccounts, browserTradeAccounts]
  );

  const allFilteredTradeAccounts = useMemo(
    () =>
      tradeAccounts?.reduce((pv, cv) => {
        const { account } = cv;
        const checker = filterTradeAccounts?.toLowerCase();
        const address = account?.address?.toLowerCase();
        const name = String(account?.meta?.name)?.toLowerCase();
        const filterByController = filterTradeAccountsByControllerAccount?.toLowerCase();
        const isLinkedAccount = !!userAccounts.some(
          (v) =>
            v.tradeAddress?.toLowerCase() === cv.address?.toLowerCase() &&
            filterByController === v.mainAddress?.toLowerCase()
        );
        if (
          (isLinkedAccount || filterByController?.includes("all")) &&
          (address?.includes(checker) || name?.includes(checker))
        ) {
          pv.push(cv);
        }
        return pv;
      }, []),
    [filterTradeAccounts, tradeAccounts, userAccounts, filterTradeAccountsByControllerAccount]
  );

  /* Filtering the controllerWallets array based on the filterControllerWallets string. Sort and filter by registered address */
  const allFilteredControllerWallets = useMemo(
    () =>
      controllerWallets
        ?.sort((a) => (linkedMainAddress?.includes(a.account.address) ? -1 : 1))
        ?.filter((value) =>
          showRegistered ? linkedMainAddress?.includes(value.account.address) : value
        )
        ?.reduce((pv, cv) => {
          const { account } = cv;
          const checker = filterControllerWallets?.toLowerCase();
          const address = account?.address?.toLowerCase();
          const name = account?.meta?.name?.toLowerCase();

          if (address?.includes(checker) || name?.includes(checker)) {
            pv.push(cv);
          }
          return pv;
        }, []),
    [filterControllerWallets, controllerWallets, showRegistered, linkedMainAddress]
  );

  const hasRegisteredMainAccount = useMemo(
    () => linkedMainAddress?.length > 0,
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
  const handleClosePreviewModal = () => tradeWalletState.onPreviewAccountModalCancel();

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
    user,
    userAccounts,
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
    filterTradeAccountsByControllerAccount: filterTradeAccountsByControllerAccountHeader,
    handleFilterTradeAccountByController: setFilterTradeAccountsByControllerAccount,
    defaultTradeAddress,
    defaultFundingAddress,
    avatarModal,
    handleCloseAvatarModal: () => setAvatarModal(false),
    handleOpenAvatarModal: () => setAvatarModal(true),
    hasRegisteredMainAccount,
  };
};
