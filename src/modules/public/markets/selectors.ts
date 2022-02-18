import { RootState } from "../../";

import { MarketsState } from "./reducer";
import { Market, Ticker } from "./types";

import { FilterPrice } from "@polkadex/web-helpers";

const selectMarketsState = (state: RootState): MarketsState => state.public.markets;

export const selectMarkets = (state: RootState): Market[] => selectMarketsState(state).list;

export const selectMarketsLoading = (state: RootState): boolean | undefined =>
  selectMarketsState(state).loading;

export const selectMarketsTimestamp = (state: RootState): number | undefined =>
  selectMarketsState(state).timestamp;

export const selectMarketsTickersTimestamp = (state: RootState): number | undefined =>
  selectMarketsState(state).tickersTimestamp;

export const selectCurrentMarket = (state: RootState): Market | undefined =>
  selectMarketsState(state).currentMarket;

export const selectCurrentMarketFilters = (state: RootState): FilterPrice =>
  selectMarketFilters(state)[(selectCurrentMarket(state) || { id: "" }).id];

export const selectCurrentMarketTickers = (state: RootState): Ticker =>
  selectMarketsState(state).currentTicker;

export const selectShouldFetchMarkets = (state: RootState): boolean =>
  !selectMarketsTimestamp(state) && !selectMarketsLoading(state);

export const selectShouldFetchMarketsTickers = (state: RootState): boolean =>
  !selectMarketsTickersTimestamp(state);

export const selectMarketFilters = (state: RootState): MarketsState["filters"] =>
  selectMarketsState(state).filters;

export const selectMarketPrice = (state: RootState): MarketsState["marketPrice"] =>
  selectMarketsState(state).marketPrice;

export const selectMarketPriceFetchSuccess = (state: RootState): boolean =>
  selectMarketsState(state).successMarketPriceFetch;
