import { CommonError } from "../../types";

import {
  RABBITMQ_CHANNEL_DATA,
  RABBITMQ_CHANNEL_ERROR,
  RABBITMQ_CHANNEL_FETCH,
} from "./constants";

export interface RabbitmqChannelFetch {
  type: typeof RABBITMQ_CHANNEL_FETCH;
}

export interface RabbitmqChannelError {
  type: typeof RABBITMQ_CHANNEL_ERROR;
  error: CommonError;
}

export interface RabbitmqChannelData {
  type: typeof RABBITMQ_CHANNEL_DATA;
}

export type RabbitmqChannelAction =
  | RabbitmqChannelFetch
  | RabbitmqChannelData
  | RabbitmqChannelError;

export const rabbitmqChannelFetch = (): RabbitmqChannelFetch => ({
  type: RABBITMQ_CHANNEL_FETCH,
});

export const rabbitmqChannelData = (): RabbitmqChannelData => ({
  type: RABBITMQ_CHANNEL_DATA,
});

export const rabbitmqChannelError = (error: CommonError): RabbitmqChannelError => ({
  type: RABBITMQ_CHANNEL_ERROR,
  error,
});
