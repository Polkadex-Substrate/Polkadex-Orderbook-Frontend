import { RootState } from "../../index";

import { DepthIncrementState, DepthState } from "./types";

import { defaultConfig } from "@polkadex/orderbook-config";

const { incrementalOrderBook } = defaultConfig;
export const selectOrderBookLoading = (state: RootState): boolean =>
  state.public.orderBook.loading;

export const selectDepthAsks = incrementalOrderBook
  ? (state: RootState): DepthState["asks"] => state.public.incrementDepth.asks
  : (state: RootState): DepthIncrementState["asks"] => state.public.depth.asks;

export const selectDepthBids = incrementalOrderBook
  ? (state: RootState): DepthState["bids"] => state.public.incrementDepth.bids
  : (state: RootState): DepthIncrementState["bids"] => state.public.depth.bids;

export const selectDepthLoading = incrementalOrderBook
  ? (state: RootState): boolean => state.public.incrementDepth.loading
  : (state: RootState): boolean => state.public.depth.loading;

export const selectOrderBookSequence = (state: RootState): number | null =>
  state.public.incrementDepth.sequence;

export const selectBestBidPrice = (state: RootState): number => {
  const bids = selectDepthBids(state);
  return bids.length > 0 ? parseFloat(bids[0][0]) : 0;
};
export const selectBestAskPrice = (state: RootState): number => {
  const asks = selectDepthAsks(state);
  return asks.length > 0 ? parseFloat(asks[asks.length - 1][0]) : 0;
};
