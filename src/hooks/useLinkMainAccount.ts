import keyring from "@polkadot/ui-keyring";
import { useDispatch } from "react-redux";

import {
  MainAccount,
  registerMainAccountFetch,
  selectExtensionWalletAccounts,
  selectCurrentMainAccount,
  setMainAccountFetch,
} from "../modules/user/mainAccount";

import { useMnemonic } from "./useMnemonic";
import { useReduxSelector } from "./useReduxSelector";

export const useLinkMainAccount = () => {
  const dispatch = useDispatch();
  const mainAccounts = useReduxSelector(selectExtensionWalletAccounts);
  const currentMainAccount = useReduxSelector(selectCurrentMainAccount);
  const { mnemoicString } = useMnemonic();
  const handleSelectMainAccount = (address: string) => {
    dispatch(setMainAccountFetch(mainAccounts.find((acc) => acc.address === address)));
  };

  const registerMainAccount = (acc: MainAccount) => {
    const tradeAcc = keyring.addUri(mnemoicString, "", { name: "trade-account-1" });
    dispatch(
      registerMainAccountFetch({ mainAccount: acc, tradeAddress: tradeAcc.pair.address })
    );
  };

  return {
    mainAccounts,
    handleSelectMainAccount,
    currentMainAccount,
    registerMainAccount,
  };
};
