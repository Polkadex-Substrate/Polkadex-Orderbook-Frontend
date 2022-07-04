import { PublicTrade, RootState } from "../..";
import { selectCurrentMarket } from "../markets";

export const selectRecentTrades = (state: RootState): PublicTrade[] =>
  state.public.recentTrades.list;

export const selectCurrentTradePrice = (state: RootState): string =>
  state.public.recentTrades.list.length > 0 ? state.public.recentTrades.list[0].price : "0";

export const selectLastTradePrice = (state: RootState): string =>
  state.public.recentTrades.list.length > 1 ? state.public.recentTrades.list[1].price : "0";

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
