import { selectCurrentMarket, selectUserInfo } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export const usePlaceOrder = () => {
  // get the current market
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userInfo = useReduxSelector(selectUserInfo);

  return {
    currentMarket,
    userInfo,
  };
};
