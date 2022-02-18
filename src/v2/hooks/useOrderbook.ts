import { useEffect, useState } from "react";

import {
  selectCurrentMarket,
  selectDepthAsks,
  selectDepthBids,
  selectCurrentMarketTickers,
  selectCurrentTrade,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";

export function useOrderbook() {
  const [isPriceUp, setIsPriceUp] = useState(true);
  const [prevTradePrice, setPrevTradePrice] = useState(0);

  const bids = useReduxSelector(selectDepthBids);
  const asks = useReduxSelector(selectDepthAsks);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const lastRecentTrade = useReduxSelector(selectCurrentTrade);
  const currentTicker = useReduxSelector(selectCurrentMarketTickers);

  const lastPrice = Number(lastRecentTrade?.price);

  /**
   * @description Get last market price
   *
   * @returns {string}
   */
  const lastMarketPrice =
    lastRecentTrade?.market_id[0].Asset === currentMarket?.symbolArray[0] &&
    lastRecentTrade?.market_id[1].Asset === currentMarket?.symbolArray[1]
      ? lastRecentTrade?.price
      : currentTicker?.last;

  /**
   * @description Check if price is up or down
   */
  const isPriceUpValue =
    lastPrice > prevTradePrice ? true : lastPrice === prevTradePrice && isPriceUp;

  /**
   * @description Get last price change
   */
  const lastPriceValue = Decimal.format(lastMarketPrice, currentMarket?.price_precision, ",");

  useEffect(() => {
    setIsPriceUp(isPriceUpValue);
    setPrevTradePrice(lastPrice);
  }, [lastRecentTrade, isPriceUpValue, lastPrice]);

  return {
    lastPriceValue,
    hasMarket: !!currentMarket,
    asks,
    bids,
  };
}
