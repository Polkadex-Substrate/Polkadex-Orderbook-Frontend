import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { balancesFetchInterval, isFinexEnabled } from "src/api";
import { walletsFetch } from "src/modules/user/wallets";

let walletsFetchInterval;

export const WalletFetch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isFinexEnabled()) {
      walletsFetchInterval = setInterval(() => {
        console.log("Fetching Wallet..");
        dispatch(walletsFetch());
      }, parseFloat(balancesFetchInterval()));
    }
    return () => {
      if (!isFinexEnabled()) {
        clearInterval(walletsFetchInterval);
      }
    };
  }, []);

  return null;
};
