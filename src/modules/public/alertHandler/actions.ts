import { ALERT_DATA, ALERT_DELETE, ALERT_PUSH } from "./constants";

export type AlertTypes = "Error" | "Successful" | "Attention" | "Loading" | "Alert";

export interface AlertState {
  type?: AlertTypes;
  status?: boolean;
  message?: {
    title?: string;
    description?: string;
  };
}

export interface AlertPush {
  type: typeof ALERT_PUSH;
  payload: AlertState;
}

export interface AlertData {
  type: typeof ALERT_DATA;
  payload: AlertState;
}

export interface AlertDelete {
  type: typeof ALERT_DELETE;
}

export type AlertAction = AlertPush | AlertData | AlertDelete;

export const alertPush = (payload: AlertPush["payload"]): AlertPush => ({
  type: ALERT_PUSH,
  payload,
});

export const alertData = (payload: AlertData["payload"]): AlertData => ({
  type: ALERT_DATA,
  payload,
});

export const alertDelete = (): AlertDelete => ({
  type: ALERT_DELETE,
});
