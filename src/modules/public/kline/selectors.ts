import { KlineEvent, KlineState, RootState } from "../../";

export const selectKline = (state: RootState): KlineEvent[] => state.public.kline.data;

export const selectKlineInterval = (state: RootState) => state.public.kline.interval;

export const selectLastKline = (state: RootState): KlineState["last"] =>
  state.public.kline.last;

export const selectKlineLoading = (state: RootState): boolean => state.public.kline.loading;
