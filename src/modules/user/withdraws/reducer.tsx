import { WithdrawsAction } from "./actions";
import {
  CLAIM_WITHDRAW_RESET,
  WITHDRAWS_CLAIM_DATA,
  WITHDRAWS_CLAIM_ERROR,
  WITHDRAWS_CLAIM_FETCH,
  WITHDRAWS_DATA,
  WITHDRAWS_ERROR,
  WITHDRAWS_FETCH,
} from "./constants";

export interface WithdrawsState {
  error?: string;
  loading: boolean;
  success: boolean;
  claimLoading: boolean;
  claimsInLoading: Array<number>;
  claimSuccess: boolean;
}

const initialState: WithdrawsState = {
  loading: false,
  success: false,
  claimLoading: false,
  claimsInLoading: [],
  claimSuccess: false,
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
    case WITHDRAWS_CLAIM_FETCH:
      return {
        ...state,
        claimLoading: true,
        claimsInLoading: [...state.claimsInLoading, action.payload.sid],
        claimSuccess: false,
      };
    case WITHDRAWS_CLAIM_DATA:
      return {
        ...state,
        claimLoading: false,
        claimsInLoading: state.claimsInLoading.filter((sid) => sid !== action.payload.sid),
        claimSuccess: true,
      };
    case WITHDRAWS_CLAIM_ERROR:
      return {
        ...state,
        claimLoading: false,
        claimSuccess: false,
        error: action.error,
      };
    case CLAIM_WITHDRAW_RESET:
      return initialState;
    default:
      return state;
  }
};
