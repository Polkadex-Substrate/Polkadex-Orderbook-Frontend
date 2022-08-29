import { WithdrawsAction } from "./actions";
import { WITHDRAWS_DATA, WITHDRAWS_ERROR, WITHDRAWS_FETCH } from "./constants";

export interface WithdrawsState {
  error?: string;
  loading: boolean;
  success: boolean;
}

const initialState: WithdrawsState = {
  loading: false,
  success: false,
};

export const withdrawsReducer = (
  state = initialState,
  action: WithdrawsAction
): WithdrawsState => {
  switch (action.type) {
    case WITHDRAWS_FETCH:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case WITHDRAWS_DATA:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case WITHDRAWS_ERROR:
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
