import { BalancesAction, UserBalance } from "./actions";
import { BALANCES_DATA, BALANCES_ERROR, BALANCES_FETCH } from "./constants";

export interface BalancesState {
  error?: string;
  loading: boolean;
  success: boolean;
  balances?: UserBalance;
}

const initialState: BalancesState = {
  loading: false,
  success: false,
};

export const balancesReducer = (state = initialState, action: BalancesAction) => {
  switch (action.type) {
    case BALANCES_FETCH:
      return {
        ...state,
        laoding: true,
        success: false,
      };
    case BALANCES_DATA:
      return {
        ...state,
        balances: { ...action.payload },
        laoding: false,
        success: true,
      };
    case BALANCES_ERROR:
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
