import { useState } from "react";
import { useDispatch } from "react-redux";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectBrowserTradeAccounts,
  selectExtensionWalletAccounts,
  selectImportTradeAccountSuccess,
  selectIsRegisterMainAccountLoading,
  selectLinkedMainAddresses,
  selectRegisterTradeAccountInfo,
  selectRegisterTradeAccountLoading,
  selectRegisterTradeAccountSuccess,
  selectUserAccounts,
  selectUserInfo,
  selectUsingAccount,
} from "@polkadex/orderbook-modules";
import { ExtensionAccount } from "@polkadex/orderbook/modules/types";

export const useSettings = () => {
  const [state, setState] = useState(false);
  const [preview, setPreview] = useState({ status: false, selected: null });
  const [newAccount, setNewAccount] = useState({ status: false, selected: null });

  const [currentControllerWallet, setCurrentControllerWallet] =
    useState<ExtensionAccount | null>(null);

  const handleChangeCurrentControllerWallet = (account: ExtensionAccount | null) =>
    setCurrentControllerWallet(account);

  const currentTradeAccount = useReduxSelector(selectUsingAccount);

  const isTradeAccountLoading = useReduxSelector(selectRegisterTradeAccountLoading);
  const isControllerAccountLoading = useReduxSelector(selectIsRegisterMainAccountLoading);
  const controllerWallets = useReduxSelector(selectExtensionWalletAccounts);
  const browserTradeAccounts = useReduxSelector(selectBrowserTradeAccounts);
  const user = useReduxSelector(selectUserInfo);
  const userAccounts = useReduxSelector(selectUserAccounts);
  const linkedMainAddress = useReduxSelector(selectLinkedMainAddresses);
  const isTradeAccountSuccess = useReduxSelector(selectRegisterTradeAccountSuccess);
  const isImportAccountSuccess = useReduxSelector(selectImportTradeAccountSuccess);
  const [filterTradeAccounts, setFilterTradeAccounts] = useState(browserTradeAccounts);
  const [filterControllerWallets, setFilterControllerWallets] = useState(controllerWallets);
  const { isActive } = useReduxSelector(selectRegisterTradeAccountInfo);
  const usingAccount = useReduxSelector(selectUsingAccount);
  const isLoading = isTradeAccountLoading || isControllerAccountLoading;
  const isRegisterControllerAccountSuccess = useReduxSelector(
    selectRegisterTradeAccountSuccess
  );

  const handleFilterTradeAccounts = (filterParam: string) => {
    const res = browserTradeAccounts.filter((data) => {
      const { address, meta } = data as any;
      const checker = filterParam?.toLowerCase();
      return (
        address?.toLowerCase().includes(checker) || meta?.name?.toLowerCase().includes(checker)
      );
    });
    setFilterTradeAccounts(res);
  };

  const handleFilterControllerWallets = (filterParam: string) => {
    const res = controllerWallets.filter((data) => {
      const {
        account: { address, meta },
      } = data;
      const checker = filterParam?.toLowerCase();
      return (
        address?.toLowerCase().includes(checker) || meta?.name?.toLowerCase().includes(checker)
      );
    });
    setFilterControllerWallets(res);
  };

  return {
    state,
    preview,
    newAccount,
    currentControllerWallet,
    currentTradeAccount,
    isTradeAccountLoading,
    isControllerAccountLoading,
    controllerWallets,
    browserTradeAccounts,
    user,
    userAccounts,
    linkedMainAddress,
    filterTradeAccounts,
    filterControllerWallets,
    isTradeAccountSuccess,
    isImportAccountSuccess,
    isActive,
    usingAccount,
    isRegisterControllerAccountSuccess,
    isLoading,
    setState,
    setPreview,
    setNewAccount,
    handleFilterTradeAccounts,
    handleFilterControllerWallets,
    handleChangeCurrentControllerWallet,
  };
};
