import { RootState } from "../..";

export const selectRabbitmqChannelSuccess = (state: RootState): boolean =>
  state.public.rabbitmqChannel.success;
export const selectRabbitmqChannelError = (state: RootState): string =>
  state.public.rabbitmqChannel.error;
export const selectRabbitmqChannelLoading = (state: RootState): boolean =>
  state.public.rabbitmqChannel.loading;
