import { MutableRefObject, useCallback, useEffect } from "react";
import {
  mapValues,
  accumulateVolume,
  calcMaxVolume,
} from "@orderbook/core/helpers";
import { useProfile } from "@orderbook/core/providers/user/profile";

export type Props = {
  asks: string[][];
  bids: string[][];
  isSell?: boolean;
  orders: string[][];
  contentRef?: MutableRefObject<HTMLDivElement> | null;
};

export function useOrderbookTable({
  orders,
  isSell,
  contentRef,
  asks,
  bids,
}: Props) {
  const {
    price: currentPrice,
    onSetPrice: onSetCurrentPrice,
    onSetAmount: onSetCurrentAmount,
    onSetTotal: onSetCurrentTotal,
  } = useProfile();

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
      if (+currentPrice !== priceToSet) onSetCurrentPrice(String(priceToSet));
    },
    [asks, bids, currentPrice, onSetCurrentPrice]
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
    [onSetCurrentAmount, asks, bids]
  );

  // Change market amount on click on total/sum field
  const changeMarketAmountSumClick = useCallback(
    (index: number) => {
      onSetCurrentTotal(cumulativeVolume[index].toString());
    },
    [onSetCurrentTotal, cumulativeVolume]
  );

  /**
   * @description Get max volume based on bids and asks
   *
   * @returns {number} max volume value
   */
  const maxVolume = calcMaxVolume(bids, asks);

  const volumeData = mapValues(maxVolume, cumulativeVolume);
  useEffect(() => {
    // Make sure the scroll is always down
    if (isSell && !!contentRef?.current)
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }, [isSell, contentRef, orders]);

  return {
    volumeData,
    total: cumulativeVolume,
    changeMarketPrice,
    changeMarketAmount,
    changeMarketAmountSumClick,
  };
}
