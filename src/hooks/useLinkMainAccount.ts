import keyring from "@polkadot/ui-keyring";
import { useDispatch } from "react-redux";

import {
  registerMainAccountFetch,
  selectExtensionWalletAccounts,
  selectIsRegisterMainAccountLoading,
  selectMainAccount,
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
  const mainAccounts = useReduxSelector(selectExtensionWalletAccounts);
  const { linkedMainAddress, selectedTradeAddress } = useReduxSelector(selectUsingAccount);
  const currentMainAccount = useReduxSelector(selectMainAccount(linkedMainAddress));
  const isRegistered = useReduxSelector(selectIsMainAddressRegistered(linkedMainAddress));
  const loading = useReduxSelector(selectIsRegisterMainAccountLoading);

  const handleSelectMainAccount = (address: string) =>
    console.log("not implemented yet", address);

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
    mainAccounts,
    handleSelectMainAccount,
    currentMainAccount,
    registerMainAccount,
    loading,
    selectedTradeAddress,
    isRegistered,
    shortWallet: currentMainAccount?.account?.address
      ? currentMainAccount?.account?.address?.slice(0, 10) +
        "..." +
        currentMainAccount?.account?.address?.slice(
          currentMainAccount?.account?.address?.length - 10
        )
      : "",
  };
};
