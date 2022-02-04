import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentMarket, orderBookChannelFetch } from "@polkadex/orderbook-modules";

export const useOrderBookMarketsFetch = () => {
  const dispatch = useDispatch();
  const currentMarket = useSelector(selectCurrentMarket);
  // TODO: pass current market as argument to the orderbookChannelFetch
  // This will break the current implementation as the orderBookChannelFetch should only
  // be called after the rabbitmq channel connection has been established
  useEffect(() => {
    // if (currentMarket) dispatch(orderBookChannelFetch(currentMarket));
  }, [currentMarket, dispatch]);
};
