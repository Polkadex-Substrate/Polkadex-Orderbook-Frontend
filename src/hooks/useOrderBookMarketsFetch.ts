import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentMarket,
  orderBookChannelFetch,
} from "@polkadex/orderbook-modules";

import { useOrderBook } from "@polkadex/orderbook/providers/public/orderBook";

export const useOrderBookMarketsFetch = () => {
  const dispatch = useDispatch();
  const { onOrderBook } = useOrderBook();
  const currentMarket = useSelector(selectCurrentMarket);

  useEffect(() => {
    if (currentMarket?.m) {
      onOrderBook(currentMarket);
      dispatch(orderBookChannelFetch(currentMarket));
    }
  }, [currentMarket, dispatch]);
};
