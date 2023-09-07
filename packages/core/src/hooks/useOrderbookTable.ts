import { MutableRefObject, useCallback, useEffect } from "react";

import { mapValues, accumulateVolume, calcMaxVolume } from "@/helpers";
import { useMarketsProvider } from "@/providers/public/marketsProvider";
import { OrderBookState, useOrderBook } from "@/providers/public/orderBook";
import { useOrders } from "@/providers/user/orders";

export type Props = {
  isSell?: boolean;
  orders: OrderBookState["depth"]["bids"];
  contentRef?: MutableRefObject<HTMLDivElement>;
};

export function useOrderbookTable({ orders, isSell, contentRef }: Props) {
  const orderBookState = useOrderBook();
  const { currentPrice, onSetCurrentPrice, onSetCurrentAmount } = useOrders();

  const bids = orderBookState.depth.bids;
  const asks = orderBookState.depth.asks;
  const { currentMarket } = useMarketsProvider();

  /**
   * @description -Get Volume of the orders
   */
  const cumulativeVolume = isSell
    ? accumulateVolume(orders.slice(0).reverse()).slice(0).reverse()
    : accumulateVolume(orders);

  /**
   * @description Change market price
   *
   * @param {number} index - Market ask/bid index
   * @param {string} side - Market side (asks/bids)
   * @returns {void} Dispatch setCurrentPrice action
   */
  const changeMarketPrice = useCallback(
    (index: number, side: "asks" | "bids"): void => {
      const arr = side === "asks" ? asks : bids;
      const priceToSet = arr[index] && Number(arr[index][0]);
      if (currentPrice !== priceToSet) onSetCurrentPrice(priceToSet);
    },
    [asks, bids, currentPrice, onSetCurrentPrice],
  );

  /**
   * @description Change market amount
   *
   * @param {number} index - Market ask/bid index
   * @param {string} side - Market side (asks/bids)
   * @returns {void} Dispatch setCurrentAmount action
   */
  const changeMarketAmount = useCallback(
    (index: number, side: "asks" | "bids") => {
      const arr = side === "asks" ? asks : bids;
      const amountToSet = arr[index] && Number(arr[index][1]);
      onSetCurrentAmount(amountToSet.toString());
    },
    [onSetCurrentAmount, asks, bids],
  );

  // Change market amount on click on total/sum field
  const changeMarketAmountSumClick = useCallback(
    (index: number) => {
      onSetCurrentAmount(cumulativeVolume[index].toString());
    },
    [onSetCurrentAmount, cumulativeVolume],
  );

  /**
   * @description Get max volume based on bids and asks
   *
   * @returns {number} max volume value
   */
  const maxVolume = calcMaxVolume(bids, asks);

  const valumeData = mapValues(maxVolume, cumulativeVolume);
  useEffect(() => {
    // Make sure the scroll is always down
    if (isSell && !!contentRef?.current)
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }, [isSell, contentRef, orders]);

  return {
    quoteUnit: currentMarket?.quote_ticker,
    baseUnit: currentMarket?.base_ticker,
    valumeData,
    changeMarketPrice,
    changeMarketAmount,
    changeMarketAmountSumClick,
    priceFixed: currentMarket?.quote_precision || 0,
    amountFixed: currentMarket?.base_precision || 0,
    total: cumulativeVolume,
  };
}
