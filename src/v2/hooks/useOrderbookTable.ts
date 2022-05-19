import { useDispatch } from "react-redux";
import { MutableRefObject, useEffect } from "react";

import { getSymbolFromId, mapValues } from "../helpers";

import { accumulateVolume, calcMaxVolume } from "@polkadex/web-helpers";
import {
  DepthState,
  selectCurrentMarket,
  selectCurrentPrice,
  selectDepthAsks,
  selectDepthBids,
  setCurrentPrice,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export type Props = {
  isSell?: boolean;
  orders: DepthState["bids"];
  contentRef?: MutableRefObject<HTMLDivElement>;
};

export function useOrderbookTable({ orders, isSell, contentRef }: Props) {
  const dispatch = useDispatch();

  const bids = useReduxSelector(selectDepthBids);
  const asks = useReduxSelector(selectDepthAsks);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const currentPrice = useReduxSelector(selectCurrentPrice);

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
    if (currentPrice !== priceToSet) dispatch(setCurrentPrice(priceToSet));
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
    quoteUnit: getSymbolFromId("quote", currentMarket?.assetIdArray),
    baseUnit: getSymbolFromId("base", currentMarket?.assetIdArray),
    valumeData,
    changeMarketPrice,
    priceFixed: currentMarket?.price_precision || 0,
    amountFixed: currentMarket?.amount_precision || 0,
    total: cumulativeVolume,
  };
}
