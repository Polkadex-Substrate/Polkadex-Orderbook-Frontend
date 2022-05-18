import { ApiPromise } from "@polkadot/api";

import { RootState } from "../..";

import { RangerState } from "./reducer";

export const selectRanger = (state: RootState): RangerState => state.public.ranger;

export const selectRangerApi = (state: RootState): ApiPromise => state.public.ranger.api;

export const selectRangerIsReady = (state: RootState): boolean =>
  state.public.ranger.connected;

export const selectRangerIsConnecting = (state: RootState): boolean =>
  state.public.ranger.connecting;

export const selectRangerTimestamp = (state: RootState): number | undefined =>
  state.public.ranger.timestamp;

export const selectShouldRangerConnect = (state: RootState): boolean =>
  !selectRangerTimestamp(state) && !selectRangerIsConnecting(state);
