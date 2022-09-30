import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";

import { useReduxSelector } from "@polkadex/orderbook/hooks/useReduxSelector";
import {
  changePasswordFetch,
  forgotPasswordFetch,
  selectUserAuthEmail,
} from "@polkadex/orderbook-modules";

export const usePasswordManager = () => {
  const email = useReduxSelector(selectUserAuthEmail);
  const dispatch = useDispatch();
  const sendResetPasswordCode = async () => {
    Auth.forgotPassword(email)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const resetPassword = async (code: string, newPassword: string) => {
    dispatch(forgotPasswordFetch({ username: email, code, newPassword }));
  };
  const updatePassword = async (oldPassword: string, newPassword: string) => {
    dispatch(changePasswordFetch({ oldPassword, newPassword }));
  };
  return { sendResetPasswordCode, resetPassword, updatePassword };
};
