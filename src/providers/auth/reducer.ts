// import type { BalancesActions } from "./actions";
import { AuthState } from "./types";

const initialTemplate = {
  isLoading: false,
  message: null,
  isError: false,
  isSuccess: false,
};

export const initialState: AuthState = {
  user: null,
  email: "",
  requireVerification: false,
  current_password_entropy: 0,
  auth: { ...initialTemplate },
  logout: { ...initialTemplate },
  forgotPassword: { ...initialTemplate, email: "" },
  changePassword: { ...initialTemplate },
};

export const authReducer = (state: AuthState, action: any) => {
  return state;
};
