import { RabbitmqChannelAction, RabbitmqChannelType } from "./actions";
import {
  RABBITMQ_CHANNEL_DATA,
  RABBITMQ_CHANNEL_ERROR,
  RABBITMQ_CHANNEL_FETCH,
} from "./constants";

export interface RabbitmqChannel {
  RabbitmqChannel: string;
}

export interface RabbitmqChannelState {
  error?: string;
  loading: boolean;
  success: boolean;
  channel: RabbitmqChannelType;
}

export const initialState: RabbitmqChannelState = {
  loading: false,
  success: false,
  channel: null,
};

export const rabbitmqChannelReducer = (
  state = initialState,
  action: RabbitmqChannelAction
) => {
  switch (action.type) {
    case RABBITMQ_CHANNEL_FETCH:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case RABBITMQ_CHANNEL_DATA:
      return {
        ...state,
        loading: false,
        success: true,
        channel: action.payload,
      };
    case RABBITMQ_CHANNEL_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
};
