import { CommonError } from "../../types";

import {
  USER_EVENTSCHANNEL_DATA,
  USER_EVENTSCHANNEL_ERROR,
  USER_EVENTSCHANNEL_FETCH,
  USER_UNKNOWN_EVENT,
} from "./constants";

export type UserEvent = any;

export interface UserEventsFetch {
  type: typeof USER_EVENTSCHANNEL_FETCH;
  payload: {
    mainAddress: string;
  };
}

export interface UserEventsError {
  type: typeof USER_EVENTSCHANNEL_ERROR;
  error: CommonError;
}

export interface UserEventsData {
  type: typeof USER_EVENTSCHANNEL_DATA;
  payload: UserEvent[];
}

export type UserEventsAction = UserEventsFetch | UserEventsError | UserEventsData;

export const userEventsFetch = (payload: UserEventsFetch["payload"]): UserEventsFetch => ({
  type: USER_EVENTSCHANNEL_FETCH,
  payload,
});

export const userEventsData = (payload: UserEvent[]): UserEventsData => ({
  type: USER_EVENTSCHANNEL_DATA,
  payload,
});

export const userEventsError = (error: CommonError): UserEventsError => ({
  type: USER_EVENTSCHANNEL_ERROR,
  error,
});

export const userUnknownEvent = () => ({
  type: USER_UNKNOWN_EVENT,
});
