import { RabbitmqChannelAction } from "./actions";
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
  // RabbitmqChannel: RabbitmqChannel
}

export const initialState: RabbitmqChannelState = {
  loading: false,
  success: false,
};

export const rabbitmqChannelReducer = (
  state = initialState,
  action: RabbitmqChannelAction
) => {
  switch (action.type) {
    case RABBITMQ_CHANNEL_FETCH:
      return {
        ...state,
        laoding: true,
        success: false,
      };
    case RABBITMQ_CHANNEL_DATA:
      return {
        ...state,
        laoding: false,
        success: true,
      };
    case RABBITMQ_CHANNEL_ERROR:
      return {
        ...state,
        laoding: false,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
};
