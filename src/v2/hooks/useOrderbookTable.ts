import { useDispatch } from "react-redux";

import { getSymbolFromId } from "../helpers";

import {
  DepthState,
  selectCurrentMarket,
  selectCurrentPrice,
  selectDepthAsks,
  selectDepthBids,
  setCurrentPrice,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { accumulateVolume, calcMaxVolume } from "@polkadex/web-helpers";

export type Props = {
  isSell?: boolean;
  orders: DepthState["bids"];
};

export function useOrderbookTable({ orders, isSell }: Props) {
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
  return {
    quoteUnit: getSymbolFromId("quote", currentMarket?.symbolArray),
    baseUnit: getSymbolFromId("base", currentMarket?.symbolArray),
    maxVolume,
    changeMarketPrice,
    priceFixed: currentMarket?.price_precision || 0,
    amountFixed: currentMarket?.amount_precision || 0,
    total: isSell
      ? accumulateVolume(orders)
      : accumulateVolume(orders.slice(0).reverse()).slice(0).reverse(),
  };
}
