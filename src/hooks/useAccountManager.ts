import keyring from "@polkadot/ui-keyring";
import { useDispatch } from "react-redux";

import {
  removeTradeAccountFromBrowser,
  selectBrowserTradeAccounts,
  selectCurrentTradeAccount,
  setCurrentTradeAccount,
} from "../modules/user/tradeAccount";

import { useReduxSelector } from "./useReduxSelector";

export const useAccountManager = () => {
  const dispatch = useDispatch();
  const allTradeAccInDevice = useReduxSelector(selectBrowserTradeAccounts);
  const currentTradeAddr = useReduxSelector(selectCurrentTradeAccount);
  const tradingAccounts = useReduxSelector(selectBrowserTradeAccounts)?.map((acc) => ({
    id: acc.address,
    address: acc.address,
    name: acc.meta.name,
    isActive: acc.address === currentTradeAddr.address,
  }));

  const removeFromDevice = (address: string) => {
    keyring.forgetAccount(address);
    dispatch(removeTradeAccountFromBrowser({ address }));
  };

  const handleSelectTradeAccount = (address: string) => {
    const acc = allTradeAccInDevice.find((acc) => acc.address === address);
    dispatch(setCurrentTradeAccount(acc));
  };

  return {
    removeFromDevice,
    handleSelectTradeAccount,
    tradingAccounts,
    currentTradeAddr,
  };
};
