import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { selectAssociatedTradeAccounts } from "../modules/user/mainAccount";
import { notificationPush } from "../modules/user/notificationHandler";
import {
  removeTradeAccountFromBrowser,
  selectBrowserTradeAccounts,
} from "../modules/user/tradeAccount";

import { useReduxSelector } from "./useReduxSelector";

import { selectUsingAccount, userAccountSelectFetch } from "@polkadex/orderbook-modules";

export const useAccountManager = () => {
  const dispatch = useDispatch();
  const allTradeAccInDevice = useReduxSelector(selectBrowserTradeAccounts);
  const selectedAccount = useReduxSelector(selectUsingAccount);
  const currentTradeAddr = selectedAccount.selectedTradeAddress;
  const associatedTradeAccounts = useReduxSelector(selectAssociatedTradeAccounts);
  const tradingAccounts = useReduxSelector(selectBrowserTradeAccounts)?.map((acc) => ({
    id: acc.address,
    address: acc.address,
    name: acc.meta.name,
    isActive: acc.address === currentTradeAddr,
  }));

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
      dispatch(userAccountSelectFetch({ tradeAddress: address }));
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
