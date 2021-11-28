import { WithdrawsAction, UserWithdraws } from "./actions";
import { WITHDRAWS_DATA, WITHDRAWS_ERROR, WITHDRAWS_FETCH } from "./constants";

export interface WithdrawsState {
  error?: string;
  loading: boolean;
  success: boolean;
  data?: UserWithdraws[];
}

export const initialState: WithdrawsState = {
  loading: false,
  success: false,
};

export const withdrawsReducer = (state = initialState, action: WithdrawsAction) => {
  switch (action.type) {
    case WITHDRAWS_FETCH:
      return {
        ...state,
        laoding: true,
        success: false,
      };
    case WITHDRAWS_DATA:
      return {
        ...state,
        laoding: false,
        success: true,
        data: action.payload,
      };
    case WITHDRAWS_ERROR:
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
