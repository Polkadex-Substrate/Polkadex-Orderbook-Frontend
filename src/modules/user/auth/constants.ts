export const AUTH_SIGN_IN_FETCH = "auth/SIGN_IN_FETCH";
export const AUTH_SIGN_IN_DATA = "auth/SIGN_IN_DATA";
export const AUTH_SIGN_IN_ERROR = "auth/SIGN_IN_ERROR";

export const AUTH_SIGN_UP_DATA = "auth/SIGN_UP_DATA";
export const AUTH_SIGN_UP_FETCH = "auth/SIGN_UP_FETCH";
export const AUTH_SIGN_UP_ERROR = "auth/SIGN_UP_ERROR";

export const AUTH_CODE_VERIFY_FETCH = "auth/CODE_VERIFY_FETCH";
export const AUTH_CODE_VERIFY_DATA = "auth/CODE_VERIFY_DATA";
export const AUTH_CODE_VERIFY_ERROR = "auth/CODE_VERIFY_ERROR";

export const AUTH_RESEND_CODE_FETCH = "auth/RESEND_CODE_FETCH";
export const AUTH_RESEND_CODE_DATA = "auth/RESEND_CODE_DATA";
export const AUTH_RESEND_CODE_ERROR = "auth/RESEND_CODE_ERROR";

export const AUTH_CHANGE_PASSWORD_FETCH = "auth/AUTH_CHANGE_PASSWORD_FETCH";
export const AUTH_CHANGE_PASSWORD_DATA = "auth/AUTH_CHANGE_PASSWORD_DATA";
export const AUTH_CHANGE_PASSWORD_ERROR = "auth/AUTH_CHANGE_PASSWORD_ERROR";

export const AUTH_FORGOT_PASSWORD_FETCH = "auth/AUTH_FORGOT_PASSWORD_FETCH";
export const AUTH_FORGOT_PASSWORD_DATA = "auth/AUTH_FORGOT_PASSWORD_DATA";
export const AUTH_FORGOT_PASSWORD_ERROR = "auth/AUTH_FORGOT_PASSWORD_ERROR";

export const AUTH_LOGOUT_FETCH = "auth/LOGOUT_FETCH";
export const AUTH_LOGOUT_DATA = "auth/LOGOUT_DATA";
export const AUTH_LOGOUT_FAILURE = "auth/LOGOUT_FAILURE";

export const AUTH_ERROR_CODES = {
  USER_ALREADY_EXIST: "UsernameExistsException", // email account already exists
  USER_NOT_CONFIRMED: "UserNotConfirmedException", // resend code verification
  PASSWORD_RESET_REQUIRED: "PasswordResetRequiredException", // Reset Password Required
  NOT_AUTHORIZED: "NotAuthorizedException", // Not Authorised (Incorrect Password)
  RESOURCE_NOT_FOUND: "ResourceNotFoundException", // User Not found
};
