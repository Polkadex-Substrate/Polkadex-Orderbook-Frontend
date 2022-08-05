import keyring from "@polkadot/ui-keyring";
import { useDispatch } from "react-redux";

import {
  removeTradeAccountFromBrowser,
  selectBrowserTradeAccounts,
  setCurrentTradeAccount,
} from "../modules/user/tradeAccount";

import { useReduxSelector } from "./useReduxSelector";

export const useAccountManager = () => {
  const dispatch = useDispatch();
  const allTradeAccInDevice = useReduxSelector(selectBrowserTradeAccounts);

  const removeFromDevice = (address: string) => {
    keyring.forgetAccount(address);
    dispatch(removeTradeAccountFromBrowser({ address }));
  };

  const useTradeAccount = (address: string) => {
    const acc = allTradeAccInDevice.find((acc) => acc.address === address);
    dispatch(setCurrentTradeAccount(acc));
  };

  return { removeFromDevice, useTradeAccount };
};
