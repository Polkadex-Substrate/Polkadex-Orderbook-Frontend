import { useEffect, useState } from "react";

import {
  selectCurrentMarket,
  selectDepthAsks,
  selectDepthBids,
  selectCurrentMarketTickers,
  selectCurrentTrade,
  selectLastRecentTrade,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";

export function useOrderbook() {
  const [isPriceUp, setIsPriceUp] = useState(true);
  const [prevTradePrice, setPrevTradePrice] = useState(0);

  const bids = useReduxSelector(selectDepthBids);
  const asks = useReduxSelector(selectDepthAsks);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const currentTrade = useReduxSelector(selectCurrentTrade);
  const lastTrade = useReduxSelector(selectLastRecentTrade);
  const currentTicker = useReduxSelector(selectCurrentMarketTickers);

  const currentPrice = Number(currentTrade?.price);
  const lastPrice = Number(lastTrade?.price);
  /**
   * @description Get last market price
   *
   * @returns {string}
   */
  const lastMarketPrice =
    currentTrade?.market_id[0].Asset === currentMarket?.symbolArray[0] &&
    currentTrade?.market_id[1].Asset === currentMarket?.symbolArray[1]
      ? currentTrade?.price
      : currentTicker?.last;

  /**
   * @description Check if price is up or down
   */
  const isPriceUpValue =
    currentPrice > lastPrice ? true : lastPrice === prevTradePrice && isPriceUp;

  /**
   * @description Get last price change
   */
  const lastPriceValue = Decimal.format(lastMarketPrice, currentMarket?.price_precision, ",");

  useEffect(() => {
    setIsPriceUp(isPriceUpValue);
    setPrevTradePrice(lastPrice);
  }, [currentPrice, isPriceUpValue, lastPrice]);

  return {
    isPriceUp,
    lastPriceValue,
    hasMarket: !!currentMarket,
    asks,
    bids,
  };
}
