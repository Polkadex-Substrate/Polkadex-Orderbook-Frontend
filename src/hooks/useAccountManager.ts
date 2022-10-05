import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {} from "../modules/user/extensionWallet";
import { notificationPush } from "../modules/user/notificationHandler";
import {
  removeTradeAccountFromBrowser,
  selectBrowserTradeAccounts,
} from "../modules/user/tradeWallet";

import { useReduxSelector } from "./useReduxSelector";

import {
  selectAssociatedTradeAddresses,
  selectUsingAccount,
  userAccountSelectFetch,
} from "@polkadex/orderbook-modules";
import { TradeAccount } from "@polkadex/orderbook/modules/types";

export const useAccountManager = () => {
  const dispatch = useDispatch();
  const allTradeAccInDevice = useReduxSelector(selectBrowserTradeAccounts);
  const selectedAccount = useReduxSelector(selectUsingAccount);
  const currentTradeAddr = selectedAccount.selectedTradeAddress;
  const associatedTradeAccounts = useReduxSelector(
    selectAssociatedTradeAddresses(currentTradeAddr)
  );
  const tradingAccounts: TradeAccount[] = useReduxSelector(selectBrowserTradeAccounts).filter(
    (acc) => associatedTradeAccounts.some((associatedAddr) => associatedAddr === acc.address)
  );

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
