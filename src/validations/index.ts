import * as Yup from "yup";

import { ErrorMessages, MAX_DIGITS_AFTER_DECIMAL } from "@polkadex/web-constants";
import { getDigitsAfterDecimal } from "@polkadex/orderbook/helpers";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";

export const signInValidations = Yup.object().shape({
  password: Yup.string().required("Required").min(2, "Too Short!").max(20, "Too Long!"),
  accountName: Yup.string().required("Required").min(5, "Too Short!").max(15, "Too Long!"),
  selectedAccount: Yup.object({
    address: Yup.string().required("Required"),
  }),
});

export const loginValidations = Yup.object().shape({
  password: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

export const depositValidations = (chainBalance: number, assetId: string) => {
  return Yup.object().shape({
    amount: Yup.string()
      .required("Required")
      .test(
        ErrorMessages.WHITESPACE_NOT_ALLOWED,
        ErrorMessages.WHITESPACE_NOT_ALLOWED,
        (value) => !/\s/.test(value)
      )
      .test("Must be a number", "Must be a number", (value) => /^\d+(\.\d+)?$/.test(value))
      .test("Minimum value", "Too Small!", (value) => Number(value) > 0.0001)
      .test(
        "Test Value greater than balance",
        "The amount you entered exceeds your balance",
        (value) => Number(value) <= Number(chainBalance)
      )
      .test(
        ErrorMessages.CHECK_VALID_AMOUNT,
        ErrorMessages.CHECK_VALID_AMOUNT,
        (value) => !(value?.toString().includes("e") || value?.toString().includes("o"))
      )
      .test(
        ErrorMessages.MAX_EIGHT_DIGIT_AFTER_DECIMAL,
        ErrorMessages.MAX_EIGHT_DIGIT_AFTER_DECIMAL,
        (value) => getDigitsAfterDecimal(value) <= MAX_DIGITS_AFTER_DECIMAL
      )
      .test(ErrorMessages.REMAINING_BALANCE, ErrorMessages.REMAINING_BALANCE, (value) => {
        const balanceAfterDeposit = chainBalance - Number(value);
        return !(isAssetPDEX(assetId) && balanceAfterDeposit < 1);
      })
      .test(
        ErrorMessages.REMAINING_BALANCE_IF_NOT_PDEX,
        ErrorMessages.REMAINING_BALANCE_IF_NOT_PDEX,
        (value) => {
          const balanceAfterDeposit = chainBalance - Number(value);
          return !(
            !isAssetPDEX(assetId) &&
            Number(value) &&
            balanceAfterDeposit < Math.pow(10, -12)
          );
        }
      )
      .test(
        ErrorMessages.CHECK_BALANCE,
        ErrorMessages.CHECK_BALANCE,
        (value) => +value <= chainBalance
      ),
  });
};

export const signUpValidations = Yup.object().shape({
  password: Yup.string().required("Required").min(8, "Too Short!").max(20, "Too Long!"),
  repeatPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  email: Yup.string().email("Must be a valid email").required("Required"),
  termsAccepted: Yup.boolean().oneOf([true]).required("Required"),
});

export const newPasswordValidations = Yup.object().shape({
  password: Yup.string().required("Required").min(8, "Too Short!").max(20, "Too Long!"),
  repeatPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  code: Yup.string().required("Required"),
});

export const signValidations = Yup.object().shape({
  password: Yup.string().required("Required"),
  email: Yup.string().email("Must be a valid email").required("Required"),
});

export const codeValidations = Yup.object().shape({
  code: Yup.string().required("Required"),
});

export const resetPasswordValidations = Yup.object().shape({
  email: Yup.string().email("Must be a valid email").required("Required"),
});

export const withdrawValidations = (balance: string) => {
  return Yup.object().shape({
    amount: Yup.string()
      .required("Required")
      .test(
        ErrorMessages.WHITESPACE_NOT_ALLOWED,
        ErrorMessages.WHITESPACE_NOT_ALLOWED,
        (value) => !/\s/.test(value)
      )
      .test("Must be a number", "Must be a number", (value) => /^\d+(\.\d+)?$/.test(value))
      .test("Minimum value", "Too Small!", (value) => Number(value) > 0.0001)
      .test(
        "Test Value greater than balance",
        "The amount you entered exceeds your balance",
        (value) => Number(value) <= Number(balance)
      )
      .test(
        ErrorMessages.MAX_EIGHT_DIGIT_AFTER_DECIMAL,
        ErrorMessages.MAX_EIGHT_DIGIT_AFTER_DECIMAL,
        (value) => getDigitsAfterDecimal(value) <= MAX_DIGITS_AFTER_DECIMAL
      ),
  });
};
export const typeValidations = Yup.object().shape({
  account: Yup.string().required("Required"),
});
export const unLockAccountValidations = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(4, "Must be exactly 5 digits")
    .max(4, "Must be exactly 5 digits"),
});
export const createAccountValidations = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(30, "Too long!"),
  passcode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits")
    .nullable(),
  controllerWallet: Yup.object({
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  }),
});
export const importAccountValidations = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(30, "Too long!"),
  passcode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits")
    .nullable(),
  mnemonic: Yup.array()
    .of(Yup.string())
    .required("Required")
    .min(12, "Must be exactly 12 digits")
    .max(12, "Must be exactly 12 digits"),
});

export const importAccountJsonValidations = Yup.object().shape({
  passcode: Yup.string().nullable(),
  file: Yup.mixed().required("Required"),
  name: Yup.string().min(2, "Too Short!").max(30, "Too long!"),
});
export const linkAccountValidations = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(30, "Too long!"),
  passcode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits")
    .nullable(),
});

export const importValiations = () => {
  return Yup.object().shape({
    accountName: Yup.string()
      .min(3, "Account name should be greater than 4 characters")
      .max(13, "Too large!")
      .required("Required"),
  });
};
