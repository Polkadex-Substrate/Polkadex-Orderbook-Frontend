import keyring from "@polkadot/ui-keyring";
import { useDispatch } from "react-redux";

import {
  MainAccount,
  registerMainAccountFetch,
  selectExtensionWalletAccounts,
  selectCurrentMainAccount,
  setMainAccountFetch,
  selectIsCurrentAccountRegistered,
  selectIsRegisterMainAccountLoading,
} from "../modules/user/mainAccount";

import { useReduxSelector } from "./useReduxSelector";

export const useLinkMainAccount = () => {
  const dispatch = useDispatch();
  const mainAccounts = useReduxSelector(selectExtensionWalletAccounts);
  const currentMainAccount = useReduxSelector(selectCurrentMainAccount);
  const isRegistered = useReduxSelector(selectIsCurrentAccountRegistered);
  const loading = useReduxSelector(selectIsRegisterMainAccountLoading);
  const handleSelectMainAccount = (address: string) =>
    dispatch(setMainAccountFetch(mainAccounts.find((acc) => acc.address === address)));

  const registerMainAccount = (
    acc: MainAccount,
    name = "trade-account",
    mnemoicString: string,
    passcode: string
  ) => {
    const tradeAcc = keyring.addUri(mnemoicString, passcode.length > 0 ? passcode : null, {
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
    isRegistered,
    shortWallet: currentMainAccount?.address
      ? currentMainAccount?.address?.slice(0, 10) +
        "..." +
        currentMainAccount?.address?.slice(currentMainAccount?.address?.length - 10)
      : "",
  };
};
