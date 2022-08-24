import keyring from "@polkadot/ui-keyring";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import {
  selectAssociatedTradeAccounts,
  selectCurrentMainAccount,
} from "../modules/user/mainAccount";
import { notificationPush } from "../modules/user/notificationHandler";
import {
  removeTradeAccountFromBrowser,
  selectBrowserTradeAccounts,
  selectCurrentTradeAccount,
  setCurrentTradeAccount,
  tradeAccountsFetch,
} from "../modules/user/tradeAccount";

import { useReduxSelector } from "./useReduxSelector";

export const useAccountManager = (showSelected: boolean = false) => {
  const dispatch = useDispatch();
  const allTradeAccInDevice = useReduxSelector(selectBrowserTradeAccounts);
  const currentMainAcc = useReduxSelector(selectCurrentMainAccount);
  const currentTradeAddr = useReduxSelector(selectCurrentTradeAccount);
  const associatedTradeAccounts = useReduxSelector(selectAssociatedTradeAccounts);
  const tradingAccounts = useReduxSelector(selectBrowserTradeAccounts)?.map((acc) => ({
    id: acc.address,
    address: acc.address,
    name: acc.meta.name,
    isActive: acc.address === currentTradeAddr.address,
  }));
  useEffect(() => {
    dispatch(tradeAccountsFetch());
  }, [currentMainAcc, dispatch]);

  const removeFromDevice = (address: string) => {
    keyring.forgetAccount(address);
    dispatch(removeTradeAccountFromBrowser({ address }));
    dispatch(
      notificationPush({
        message: { title: "Removed from device", description: address },
        type: "SuccessAlert",
        time: new Date().getTime(),
      })
    );
  };

  const handleSelectTradeAccount = (address: string) => {
    const acc = allTradeAccInDevice.find((acc) => acc.address === address);
    dispatch(setCurrentTradeAccount(acc));
  };

  const allTradingAccounts = useMemo(
    () =>
      tradingAccounts.filter((value) =>
        showSelected ? associatedTradeAccounts?.includes(value?.address) : value
      ),
    [tradingAccounts, associatedTradeAccounts, showSelected]
  );

  useEffect(() => {
    if (tradingAccounts.length === 1 && !tradingAccounts[0].isActive) {
      handleSelectTradeAccount(tradingAccounts[0].address);
    }
  }, [allTradingAccounts]);


  return {
    removeFromDevice,
    handleSelectTradeAccount,
    tradingAccounts,
    currentTradeAddr,
    associatedTradeAccounts,
    allTradingAccounts
  };
};
