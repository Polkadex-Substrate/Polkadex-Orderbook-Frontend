import keyring from "@polkadot/ui-keyring";
import { useCallback, useEffect } from "react";
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

export const useAccountManager = () => {
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
    dispatch(removeTradeAccountFromBrowser({ address }));
    dispatch(
      notificationPush({
        message: { title: "Removed from device", description: address },
        type: "SuccessAlert",
        time: new Date().getTime(),
      })
    );
  };

  const handleSelectTradeAccount = useCallback(
    (address: string) => {
      const acc = allTradeAccInDevice.find((acc) => acc.address === address);
      dispatch(setCurrentTradeAccount(acc));
    },
    [allTradeAccInDevice, dispatch]
  );

  return {
    removeFromDevice,
    handleSelectTradeAccount,
    tradingAccounts,
    currentTradeAddr,
    associatedTradeAccounts,
  };
};
