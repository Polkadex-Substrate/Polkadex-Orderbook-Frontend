import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentMarket,
  orderBookChannelFetch,
  orderBookFetch,
} from "@polkadex/orderbook-modules";

export const useOrderBookMarketsFetch = () => {
  const dispatch = useDispatch();
  const currentMarket = useSelector(selectCurrentMarket);

  useEffect(() => {
    if (currentMarket?.m) {
      dispatch(orderBookFetch(currentMarket));
      dispatch(orderBookChannelFetch(currentMarket));
    }
  }, [currentMarket, dispatch]);
};
