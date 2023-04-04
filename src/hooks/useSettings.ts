// TODO: Refactor hook
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  previewAccountModalCancel,
  registerAccountModalCancel,
  registerTradeAccountReset,
  selectBrowserTradeAccounts,
  selectImportTradeAccountSuccess,
  selectIsPreviewTradeAccountActive,
  selectPreviewTradeAccountSelect,
  selectRegisterTradeAccountInfo,
  selectRegisterTradeAccountLoading,
  selectRegisterTradeAccountSuccess,
} from "@polkadex/orderbook-modules";
import { ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { IUserTradeAccount } from "@polkadex/orderbook/hooks/types";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useAuth } from "../providers/user/auth";
import { useExtensionWallet } from "../providers/user/extensionWallet";

export const useSettings = () => {
  const [state, setState] = useState(false);
  const [showRegistered, setShowRegistered] = useState(false);
  const [filterControllerWallets, setFilterControllerWallets] = useState("");
  const [filterTradeAccounts, setFilterTradeAccounts] = useState("");
  const [filterTradeAccountsByControllerAccount, setFilterTradeAccountsByControllerAccount] =
    useState("All");
  const [avatarModal, setAvatarModal] = useState(false);

  const dispatch = useDispatch();
  const [currentControllerWallet, setCurrentControllerWallet] =
    useState<ExtensionAccount | null>(null);

  const handleChangeCurrentControllerWallet = (account: ExtensionAccount | null) =>
    setCurrentControllerWallet(account);

  const profileState = useProfile();
  const authState = useAuth();
  const extensionWalletState = useExtensionWallet();

  const currentTradeAccount = profileState.selectedAccount;
  const isTradeAccountLoading = useReduxSelector(selectRegisterTradeAccountLoading);
  const isControllerAccountLoading = extensionWalletState.registerMainAccountLoading;
  const controllerWallets = extensionWalletState.allAccounts;
  const browserTradeAccounts = useReduxSelector(selectBrowserTradeAccounts);
  const {
    userData: { userAccounts: allAccounts },
  } = useProfile();
  let authInfo = profileState.authInfo;
  const user = {
    ...authInfo,
    email: authState.email,
    isConfirmed: authState.userConfirmed,
  };
  const {
    userData: { userAccounts },
  } = useProfile();
  const linkedMainAddress = profileState.userData.mainAccounts;
  const isTradeAccountSuccess = useReduxSelector(selectRegisterTradeAccountSuccess);
  const isImportAccountSuccess = useReduxSelector(selectImportTradeAccountSuccess);
  const { isActive } = useReduxSelector(selectRegisterTradeAccountInfo);
  const {
    userData: { userAccounts: usingAccount },
  } = useProfile();
  const isRegisterControllerAccountSuccess = useReduxSelector(
    selectRegisterTradeAccountSuccess
  );
  const defaultTradeAddress = profileState.defaultTradeAccount;
  const defaultFundingAddress =
    defaultTradeAddress &&
    profileState.userData?.userAccounts?.find(
      ({ tradeAddress }) => tradeAddress === defaultTradeAddress
    )?.mainAddress;

  const isPreviewActive = useReduxSelector(selectIsPreviewTradeAccountActive);
  const previewAccountSelected = useReduxSelector(selectPreviewTradeAccountSelect);
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
            filterByController === v.mainAddress.toLowerCase()
        );
        if (
          (isLinkedAccount || filterByController.includes("all")) &&
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
        ?.sort((a) => (linkedMainAddress.includes(a.account.address) ? -1 : 1))
        ?.filter((value) =>
          showRegistered ? linkedMainAddress.includes(value.account.address) : value
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
      isRegisterControllerAccountSuccess ||
      isImportAccountSuccess;

    if (hasAction) {
      if (isRegisterControllerAccountSuccess || isImportAccountSuccess)
        onRegisterMainAccountReset();
      else if (!isRegisterControllerAccountSuccess && isTradeAccountSuccess)
        dispatch(registerTradeAccountReset());
      else dispatch(registerAccountModalCancel());
    }
  };
  const handleClosePreviewModal = () => dispatch(previewAccountModalCancel());

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
    state,
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
    isRegisterControllerAccountSuccess,
    isLoading,
    setState,
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
