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

export type RabbitmqChannelType = { queue: any; queuePurge: any } | null;

export interface RabbitmqChannelData {
  type: typeof RABBITMQ_CHANNEL_DATA;
  payload: RabbitmqChannelType;
}

export type RabbitmqChannelAction =
  | RabbitmqChannelFetch
  | RabbitmqChannelData
  | RabbitmqChannelError;

export const rabbitmqChannelFetch = (): RabbitmqChannelFetch => ({
  type: RABBITMQ_CHANNEL_FETCH,
});

export const rabbitmqChannelData = (channel: RabbitmqChannelType): RabbitmqChannelData => ({
  type: RABBITMQ_CHANNEL_DATA,
  payload: channel,
});

export const rabbitmqChannelError = (error: CommonError): RabbitmqChannelError => ({
  type: RABBITMQ_CHANNEL_ERROR,
  error,
});
