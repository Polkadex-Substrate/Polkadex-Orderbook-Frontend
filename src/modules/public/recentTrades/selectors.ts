import { PublicTrade, RootState } from "../..";

export const selectCurrentTradePrice = (state: RootState): string =>
  state.public.recentTrades.list.length > 0 ? state.public.recentTrades.list[0].price : "0";

export const selectLastTradePrice = (state: RootState): string =>
  state.public.recentTrades.list.length > 1 ? state.public.recentTrades.list[1].price : "0";

export const selectRecentTradesOfCurrentMarket = (state: RootState): PublicTrade[] => {
  return state.public.recentTrades.list;
};

export const selectRecentTradesLoading = (state: RootState): boolean | undefined =>
  state.public.recentTrades.loading;
