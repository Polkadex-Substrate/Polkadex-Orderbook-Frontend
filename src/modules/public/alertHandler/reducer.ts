import { AlertState, AlertAction } from "./actions";
import { ALERT_DATA, ALERT_DELETE, ALERT_PUSH } from "./constants";

export const initialAlertState: AlertState = {
  type: "",
  status: false,
  message: {
    title: "",
    description: "",
  },
};

export const alertReducer = (state = initialAlertState, action: AlertAction) => {
  switch (action.type) {
    case ALERT_DATA:
      return {
        ...state,
        status: true,
        ...action.payload,
      };
    case ALERT_DELETE:
      return {
        ...state,
        ...initialAlertState,
      };

    case ALERT_PUSH:
    default:
      return state;
  }
};
