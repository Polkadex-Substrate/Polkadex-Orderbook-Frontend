import { useMemo, useState } from "react";

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
import { IUserTradeAccount } from "@polkadex/orderbook/hooks/types";

export const useSettings = () => {
  const [state, setState] = useState(false);
  const [preview, setPreview] = useState<{ status: boolean; selected: IUserTradeAccount }>({
    status: false,
    selected: null,
  });
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
  const allAccounts = useReduxSelector(selectUserAccounts);
  const user = useReduxSelector(selectUserInfo);
  const userAccounts = useReduxSelector(selectUserAccounts);
  const linkedMainAddress = useReduxSelector(selectLinkedMainAddresses);
  const isTradeAccountSuccess = useReduxSelector(selectRegisterTradeAccountSuccess);
  const isImportAccountSuccess = useReduxSelector(selectImportTradeAccountSuccess);

  const [filterControllerWallets, setFilterControllerWallets] = useState(controllerWallets);
  const { isActive } = useReduxSelector(selectRegisterTradeAccountInfo);
  const usingAccount = useReduxSelector(selectUsingAccount);
  const isLoading = isTradeAccountLoading || isControllerAccountLoading;
  const isRegisterControllerAccountSuccess = useReduxSelector(
    selectRegisterTradeAccountSuccess
  );

  const tradeAccounts = useMemo(() => {
    return allAccounts.map(({ tradeAddress }): IUserTradeAccount => {
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
    });
  }, [allAccounts, browserTradeAccounts]);

  const [filterTradeAccounts, setFilterTradeAccounts] =
    useState<IUserTradeAccount[]>(tradeAccounts);

  const handleFilterTradeAccounts = (filterParam: string) => {
    const res = tradeAccounts.filter((data) => {
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
    tradeAccounts,
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
