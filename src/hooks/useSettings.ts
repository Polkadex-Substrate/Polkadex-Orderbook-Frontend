import { useState } from "react";
import { useDispatch } from "react-redux";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectBrowserTradeAccounts,
  selectExtensionAccountSelected,
  selectExtensionWalletAccounts,
  selectIsRegisterMainAccountLoading,
  selectLinkedMainAddresses,
  selectRegisterTradeAccountLoading,
  selectUserAccounts,
  selectUserInfo,
  selectUsingAccount,
} from "@polkadex/orderbook-modules";

export const useSettings = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const [preview, setPreview] = useState({ status: false, selected: null });
  const [newAccount, setNewAccount] = useState({ status: false, selected: null });

  const currentControllerWallet = useReduxSelector(selectExtensionAccountSelected);
  const currentTradeAccount = useReduxSelector(selectUsingAccount);

  const isTradeAccountLoading = useReduxSelector(selectRegisterTradeAccountLoading);
  const isControllerAccountLoading = useReduxSelector(selectIsRegisterMainAccountLoading);
  const controllerWallets = useReduxSelector(selectExtensionWalletAccounts);
  const tradeAccounts = useReduxSelector(selectBrowserTradeAccounts);
  const user = useReduxSelector(selectUserInfo);
  const userAccounts = useReduxSelector(selectUserAccounts);
  const linkedMainAddress = useReduxSelector(selectLinkedMainAddresses);
  const [filterTradeAccounts, setFilterTradeAccounts] = useState(tradeAccounts);

  const handleFilterTradeAccounts = (filterParam: string) => {
    return tradeAccounts.every((data) =>
      data.address.toLowerCase().includes(filterParam.toLowerCase())
    );
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
    tradeAccounts,
    user,
    userAccounts,
    linkedMainAddress,
    filterTradeAccounts,
    setState,
    setPreview,
    setNewAccount,
    handleFilterTradeAccounts,
  };
};
