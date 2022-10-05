import keyring from "@polkadot/ui-keyring";
import { useDispatch } from "react-redux";

import {
  registerMainAccountFetch,
  selectExtensionWalletAccounts,
  selectIsRegisterMainAccountLoading,
  selectMainAccount,
} from "../modules/user/mainAccount";

import { useReduxSelector } from "./useReduxSelector";

import {
  selectIsMainAddressRegistered,
  selectUsingAccount,
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
    mnemoicString: string,
    passcode: string | null
  ) => {
    const tradeAcc = keyring.addUri(mnemoicString, passcode, {
      name,
    });
    dispatch(
      registerMainAccountFetch({
        mainAccount: acc,
        tradeAddress: tradeAcc.pair.address,
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
    shortWallet: currentMainAccount?.account.address
      ? currentMainAccount?.account.address?.slice(0, 10) +
        "..." +
        currentMainAccount?.account.address?.slice(
          currentMainAccount?.account.address?.length - 10
        )
      : "",
  };
};
