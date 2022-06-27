import { KlineEvent, KlineState, RootState } from "../../";

export const selectKline = (state: RootState): KlineEvent[] => state.public.kline.data;
export const selectLastKline = (state: RootState): KlineState["last"] =>
  state.public.kline.last;
