import { DepositsAction, Deposits } from "./actions";
import { DEPOSITS_DATA, DEPOSITS_ERROR, DEPOSITS_FETCH } from "./constants";

export interface DepositsState {
  error?: string;
  loading: boolean;
  success: boolean;
  data?: Deposits[];
}

const initialState: DepositsState = {
  loading: false,
  success: false,
};

export const depositsReducer = (state = initialState, action: DepositsAction) => {
  switch (action.type) {
    case DEPOSITS_FETCH:
      return {
        ...state,
        laoding: true,
        success: false,
      };
    case DEPOSITS_DATA:
      return {
        ...state,
        laoding: false,
        success: true,
        data: action.payload,
      };
    case DEPOSITS_ERROR:
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
