import { useReduxSelector } from "src/hooks";
import {
  alertPush,
  RootState,
  selectCurrentPrice,
  selectDepthAsks,
  selectDepthBids,
  selectMobileDeviceState,
  selectOrderExecuteLoading,
  selectUserLoggedIn,
  selectWallets,
  setCurrentPrice,
  Wallet,
  walletsFetch,
} from "src/modules";
import {
  Market,
  selectCurrentMarket,
  selectCurrentMarketFilters,
  selectMarketTickers,
} from "src/modules/public/markets";

export const useP2P = () => {
  const bids = useReduxSelector(selectDepthBids);
  const asks = useReduxSelector(selectDepthAsks);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const currentMarketFilters = useReduxSelector(selectCurrentMarketFilters);
  const executeLoading = useReduxSelector(selectOrderExecuteLoading);
  const marketTickers = useReduxSelector(selectMarketTickers);
  const wallets = useReduxSelector(selectWallets);
  const currentPrice = useReduxSelector(selectCurrentPrice);
  const userLoggeIn = useReduxSelector(selectUserLoggedIn);

  const getWallet = (currency: string, wallets: Wallet[]) => {
    const currencyLower = currency.toLowerCase();
    return wallets.find((w) => w.currency === currencyLower) as Wallet;
  };

  const getAvailableValue = (wallet: Wallet | undefined) => {
    return wallet && wallet.balance ? Number(wallet.balance) : 0;
  };

  const walletBase =
    currentMarket && wallets && getWallet(currentMarket.base_unit, wallets);
  const walletQuote =
    currentMarket && wallets && getWallet(currentMarket.quote_unit, wallets);

  const currentTicker =
    marketTickers && currentMarket && marketTickers[currentMarket.id];

  const defaultCurrentTicker = { last: "0" };

  return {
    bids,
    asks,
    currentMarket,
    currentMarketFilters,
    executeLoading,
    marketTickers,
    wallets,
    currentPrice,
    userLoggeIn,
    getWallet,
    getAvailableValue,
    walletBase,
    currentTicker,
    walletQuote,
    defaultCurrentTicker,
  };
};
