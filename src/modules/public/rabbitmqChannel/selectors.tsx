import { RootState } from "../..";

import { RabbitmqChannelType } from "./actions";

export const selectRabbitmqChannelConnected = (state: RootState): boolean =>
  state.public.rabbitmqChannel.success;
export const selectRabbitmqChannelError = (state: RootState): string =>
  state.public.rabbitmqChannel.error;
export const selectRabbitmqChannelLoading = (state: RootState): boolean =>
  state.public.rabbitmqChannel.loading;
export const selectRabbitmqChannel = (state: RootState): RabbitmqChannelType =>
  state.public.rabbitmqChannel.channel;
