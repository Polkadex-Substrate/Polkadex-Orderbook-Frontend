// TODO: Refactor hook
import { useMemo, useState } from "react";
import { useExtensionWallet } from "@orderbook/core/providers/user/extensionWallet";
import { useTradeWallet } from "@orderbook/core/providers/user/tradeWallet";
import { ExtensionAccount } from "@orderbook/core/providers/types";
import { useProfile } from "@orderbook/core/providers/user/profile";

import { IUserTradeAccount } from "../";
import { useWalletProvider } from "../providers/user/walletProvider";

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

  const {
    userData: { userAccounts: allAccounts, mainAccounts: linkedMainAddress },
    selectedAccount: currentTradeAccount,
  } = useProfile();
  const extensionWalletState = useExtensionWallet();
  const tradeWalletState = useTradeWallet();

  const {
    registerStatus,
    localTradingAccounts: browserTradeAccounts,
    importFromFileStatus,
  } = useWalletProvider();

  const isTradeAccountLoading = registerStatus === "loading";
  const isControllerAccountLoading =
    extensionWalletState.registerMainAccountLoading;
  const controllerWallets = extensionWalletState.allAccounts;

  const isTradeAccountSuccess = registerStatus === "success";
  const isImportAccountSuccess = importFromFileStatus === "success";
  const { isActive } = tradeWalletState?.registerAccountModal;
  const isRegisterMainAccountSuccess =
    extensionWalletState?.registerMainAccountSuccess;
  const defaultTradeAddress = currentTradeAccount.tradeAddress;
  const defaultFundingAddress =
    defaultTradeAddress &&
    allAccounts?.find(
      ({ tradeAddress }) => tradeAddress === defaultTradeAddress
    )?.mainAddress;

  const isPreviewActive = tradeWalletState.previewAccountModal.isActive;
  const previewAccountSelected = tradeWalletState.previewAccountModal.selected;
  const isLoading = isTradeAccountLoading || isControllerAccountLoading;

  const tradeAccounts = useMemo(
    () =>
      allAccounts?.map(({ tradeAddress }): IUserTradeAccount => {
        const account = browserTradeAccounts?.find(
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
    [allAccounts, browserTradeAccounts]
  );

  const allFilteredTradeAccounts = useMemo(
    () =>
      tradeAccounts
        ?.reduce((pv: IUserTradeAccount[], cv) => {
          const { account } = cv;
          const checker = filterTradeAccounts?.toLowerCase();
          const address = account?.address?.toLowerCase();
          const cvAddress = cv?.address?.toLowerCase();
          const name = String(account?.meta?.name)?.toLowerCase();
          const filterByController =
            filterTradeAccountsByControllerAccount?.toLowerCase();
          const isLinkedAccount = !!allAccounts?.some(
            (v) =>
              v.tradeAddress?.toLowerCase() === cv.address?.toLowerCase() &&
              filterByController === v.mainAddress?.toLowerCase()
          );
          if (
            (isLinkedAccount || filterByController?.includes("all")) &&
            (address?.includes(checker) ||
              name?.includes(checker) ||
              cvAddress.includes(checker))
          ) {
            pv.push(cv);
          }
          return pv;
        }, [])
        // sorting the accounts on the basis of their presence in the browser
        .sort((a, b) => {
          if (a.isPresentInBrowser && !b.isPresentInBrowser) {
            return -1;
          } else if (!a.isPresentInBrowser && b.isPresentInBrowser) {
            return 1;
          } else {
            return 0;
          }
        })
        .filter((v) => (showPresent ? v.isPresentInBrowser : v)) || [],
    [
      tradeAccounts,
      filterTradeAccounts,
      filterTradeAccountsByControllerAccount,
      allAccounts,
      showPresent,
    ]
  );

  /* Filtering the controllerWallets array based on the filterControllerWallets string. Sort and filter by registered address */
  const allFilteredControllerWallets = useMemo(
    () =>
      controllerWallets
        ?.sort((a) => (linkedMainAddress?.includes(a.account.address) ? -1 : 1))
        ?.filter((value) =>
          showRegistered
            ? linkedMainAddress?.includes(value.account.address)
            : value
        )
        ?.reduce((pv: ExtensionAccount[], cv) => {
          const { account } = cv;
          const checker = filterControllerWallets?.toLowerCase();
          const address = account?.address?.toLowerCase();
          const name = account?.meta?.name?.toLowerCase();

          if (address?.includes(checker) || name?.includes(checker)) {
            pv.push(cv);
          }
          return pv;
        }, []),
    [
      filterControllerWallets,
      controllerWallets,
      showRegistered,
      linkedMainAddress,
    ]
  );

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
    userAccounts: allAccounts,
    linkedMainAddress,
    filterControllerWallets: allFilteredControllerWallets,
    isTradeAccountSuccess,
    isImportAccountSuccess,
    isActive,
    usingAccount: currentTradeAccount,
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
