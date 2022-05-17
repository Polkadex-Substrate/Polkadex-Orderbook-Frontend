import { PublicTrade, RootState } from "../..";
import { selectCurrentMarket } from "../markets";

export const selectRecentTrades = (state: RootState): PublicTrade[] =>
  state.public.recentTrades.list;

export const selectCurrentTrade = (state: RootState): PublicTrade | undefined =>
  state.public.recentTrades.currentTrade;

export const selectLastRecentTrade = (state: RootState): PublicTrade | undefined =>
  state.public.recentTrades.lastTrade;

export const selectRecentTradesOfCurrentMarket = (state: RootState): PublicTrade[] => {
  const currentMarket = selectCurrentMarket(state);
  return state.public.recentTrades.list;
  // TODO: filter based on market
  // return currentMarket
  //   ? state.public.recentTrades.list.filter(
  //       (trade: PublicTrade) =>
  //         trade.market_id[0].Asset === currentMarket.symbolArray[0] &&
  //         trade.market_id[1].Asset === currentMarket.symbolArray[1]
  //     )
  //   : [];
};

export const selectRecentTradesLoading = (state: RootState): boolean | undefined =>
  state.public.recentTrades.loading;
