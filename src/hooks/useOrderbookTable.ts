import { useDispatch } from "react-redux";
import { MutableRefObject, useEffect } from "react";

import { mapValues, accumulateVolume, calcMaxVolume } from "../helpers";

import {
  DepthState,
  selectCurrentMarket,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { useOrderBook } from "@polkadex/orderbook/providers/public/orderBook";
import { useOrders } from "@polkadex/orderbook/providers/user/orders";

export type Props = {
  isSell?: boolean;
  orders: DepthState["bids"];
  contentRef?: MutableRefObject<HTMLDivElement>;
};

export function useOrderbookTable({ orders, isSell, contentRef }: Props) {
  const dispatch = useDispatch();
  const orderBookState = useOrderBook();
  const ordersState = useOrders();

  const bids = orderBookState.depth.bids;
  const asks = orderBookState.depth.asks;
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const currentPrice = ordersState.currentPrice;

  /**
   * @description Change market price
   *
   * @param {number} index - Market ask/bid index
   * @param {string} side - Market side (asks/bids)
   * @returns {void} Dispatch setCurrentPrice action
   */
  // TODO: Create unbounding
  const changeMarketPrice = (index: number, side: "asks" | "bids"): void => {
    const arr = side === "asks" ? asks : bids;
    const priceToSet = arr[index] && Number(arr[index][0]);
    if (currentPrice !== priceToSet) ordersState.onSetCurrentPrice(priceToSet);
  };

  /**
   * @description Get max volume based on bids and asks
   *
   * @returns {number} max volume value
   */
  const maxVolume = calcMaxVolume(bids, asks);

  /**
   * @description -Get Volume of ther orders
   */
  const cumulativeVolume = isSell
    ? accumulateVolume(orders.slice(0).reverse()).slice(0).reverse()
    : accumulateVolume(orders);
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
    priceFixed: currentMarket?.quote_precision || 0,
    amountFixed: currentMarket?.base_precision || 0,
    total: cumulativeVolume,
  };
}
