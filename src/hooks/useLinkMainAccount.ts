import keyring from "@polkadot/ui-keyring";
import { useDispatch } from "react-redux";

import {
  extensionWalletAccountSelect,
  registerMainAccountFetch,
  selectExtensionAccountSelected,
  selectExtensionWalletAccounts,
  selectIsRegisterMainAccountLoading,
} from "../modules/user/extensionWallet";

import { useReduxSelector } from "./useReduxSelector";

import {
  selectIsMainAddressRegistered,
  selectUsingAccount,
  tradeAccountPush,
} from "@polkadex/orderbook-modules";
import { ExtensionAccount } from "@polkadex/orderbook/modules/types";

export const useLinkMainAccount = () => {
  const dispatch = useDispatch();
  const accountsInExtension = useReduxSelector(selectExtensionWalletAccounts);
  const { tradeAddress } = useReduxSelector(selectUsingAccount);
  const selectedExtensionAccount = useReduxSelector(selectExtensionAccountSelected);
  const isRegistered = useReduxSelector(
    selectIsMainAddressRegistered(selectedExtensionAccount?.account?.address)
  );
  const loading = useReduxSelector(selectIsRegisterMainAccountLoading);

  const handleSelectMainAccount = (address: string) => {
    const mainAccount = accountsInExtension.find(({ account }) => account.address === address);
    if (mainAccount) {
      dispatch(extensionWalletAccountSelect(mainAccount));
    }
  };

  const registerMainAccount = (
    acc: ExtensionAccount,
    name = "trade-account",
    mnemonicString: string,
    passcode: string | null
  ) => {
    const { pair } = keyring.addUri(mnemonicString, passcode, {
      name,
    });
    dispatch(tradeAccountPush({ pair }));
    dispatch(
      registerMainAccountFetch({
        mainAccount: acc,
        tradeAddress: pair.address,
        password: passcode,
      })
    );
  };

  return {
    mainAccounts: accountsInExtension,
    handleSelectMainAccount,
    currentMainAccount: selectedExtensionAccount,
    registerMainAccount,
    loading,
    tradeAddress: tradeAddress,
    isRegistered,
    shortWallet: selectedExtensionAccount?.account?.address
      ? selectedExtensionAccount?.account?.address?.slice(0, 10) +
        "..." +
        selectedExtensionAccount?.account?.address?.slice(
          selectedExtensionAccount?.account?.address?.length - 10
        )
      : "",
  };
};
