import { useEffect, useState } from "react";

import {
  selectCurrentMarket,
  selectDepthAsks,
  selectDepthBids,
  selectCurrentTradePrice,
  selectLastTradePrice,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useOrderbook() {
  const [isPriceUp, setIsPriceUp] = useState(true);
  const [prevTradePrice, setPrevTradePrice] = useState(0);

  const bids = useReduxSelector(selectDepthBids);
  const asks = useReduxSelector(selectDepthAsks);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const currentTrade = useReduxSelector(selectCurrentTradePrice);
  const lastTrade = useReduxSelector(selectLastTradePrice);

  const bidsSorted = sortArrayDescending(bids);
  const asksSorted = sortArrayDescending(asks);

  const currentPrice = Number(currentTrade);
  const lastPrice = Number(lastTrade);

  const isPriceUpValue =
    currentPrice > lastPrice ? true : lastPrice === prevTradePrice && isPriceUp;

  useEffect(() => {
    setIsPriceUp(isPriceUpValue);
    setPrevTradePrice(lastPrice);
  }, [currentPrice, isPriceUpValue, lastPrice, currentMarket]);

  return {
    isPriceUp,
    lastPriceValue: currentPrice,
    hasMarket: !!currentMarket,
    asks: asksSorted,
    bids: bidsSorted,
  };
}
function sortArrayDescending(arr: string[][]) {
  return arr?.sort((a, b) => Number(b[0]) - Number(a[0]));
}
