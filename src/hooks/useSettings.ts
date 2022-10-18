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
  const [showRegistered, setShowRegistered] = useState(false);
  const [filterControllerWallets, setFilterControllerWallets] = useState("");
  const [filterTradeAccounts, setFilterTradeAccounts] = useState("");

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
  const { isActive } = useReduxSelector(selectRegisterTradeAccountInfo);
  const usingAccount = useReduxSelector(selectUsingAccount);
  const isLoading = isTradeAccountLoading || isControllerAccountLoading;
  const isRegisterControllerAccountSuccess = useReduxSelector(
    selectRegisterTradeAccountSuccess
  );

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

        if (address?.includes(checker) || name?.includes(checker)) {
          pv.push(cv);
        }
        return pv;
      }, []),
    [filterTradeAccounts, tradeAccounts]
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
    setPreview,
    setNewAccount,
    handleFilterTradeAccounts: setFilterTradeAccounts,
    handleFilterControllerWallets: setFilterControllerWallets,
    handleChangeCurrentControllerWallet,
    showRegistered,
    handleChangeShowRegistered: () => setShowRegistered(!showRegistered),
  };
};
