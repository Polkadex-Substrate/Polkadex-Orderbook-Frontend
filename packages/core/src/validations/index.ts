import * as Yup from "yup";
import {
  getAbsoluteNumber,
  getDigitsAfterDecimal,
} from "@orderbook/core/helpers";
import {
  ErrorMessages,
  MAX_DIGITS_AFTER_DECIMAL,
} from "@orderbook/core/constants";

export const signInValidations = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(2, "Too Short!")
    .max(20, "Too Long!"),
  accountName: Yup.string()
    .required("Required")
    .min(5, "Too Short!")
    .max(15, "Too Long!"),
  selectedAccount: Yup.object({
    address: Yup.string().required("Required"),
  }),
});

export const loginValidations = Yup.object().shape({
  password: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

export const depositValidations = (
  chainBalance: number,
  isPolkadexToken: boolean,
  existentialBalance: number
) => {
  return Yup.object().shape({
    amount: Yup.string()
      .required("Required")
      .test(
        ErrorMessages.WHITESPACE_NOT_ALLOWED,
        ErrorMessages.WHITESPACE_NOT_ALLOWED,
        (value) => !/\s/.test(value || "")
      )
      .test(
        ErrorMessages.MUST_BE_A_NUMBER,
        ErrorMessages.MUST_BE_A_NUMBER,
        (value) => /^\d+(\.\d+)?$/.test(value || "")
      )
      .test(
        ErrorMessages.TOO_SMALL,
        ErrorMessages.TOO_SMALL,
        (value) => Number(value) >= 0.00001
      )
      .test(
        ErrorMessages.CHECK_BALANCE,
        ErrorMessages.CHECK_BALANCE,
        (value) => Number(value) <= Number(chainBalance)
      )
      .test(
        ErrorMessages.CHECK_VALID_AMOUNT,
        ErrorMessages.CHECK_VALID_AMOUNT,
        (value) =>
          !(value?.toString().includes("e") || value?.toString().includes("o"))
      )
      .test(
        ErrorMessages.MAX_DIGIT_AFTER_DECIMAL,
        ErrorMessages.MAX_DIGIT_AFTER_DECIMAL,
        (value) =>
          value
            ? getDigitsAfterDecimal(value) <= MAX_DIGITS_AFTER_DECIMAL
            : false
      )
      .test(
        ErrorMessages.REMAINING_BALANCE,
        ErrorMessages.REMAINING_BALANCE,
        (value) => {
          const balanceAfterDeposit = chainBalance - Number(value);
          return !(isPolkadexToken && balanceAfterDeposit < 1);
        }
      )
      .test(
        ErrorMessages.REMAINING_BALANCE_IF_NOT_PDEX,
        ErrorMessages.REMAINING_BALANCE_IF_NOT_PDEX,
        (value) => {
          const balanceAfterDeposit = Number(chainBalance) - Number(value);
          return !(
            !isPolkadexToken &&
            Number(value) &&
            balanceAfterDeposit < existentialBalance
          );
        }
      ),
  });
};

export const signUpValidations = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(8, "Too Short!")
    .max(20, "Too Long!"),
  repeatPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  email: Yup.string().email("Must be a valid email").required("Required"),
  termsAccepted: Yup.boolean().oneOf([true]).required("Required"),
});

export const newPasswordValidations = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(8, "Too Short!")
    .max(20, "Too Long!"),
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
        (value) => (value ? !/\s/.test(value) : false)
      )
      .test(
        ErrorMessages.MUST_BE_A_NUMBER,
        ErrorMessages.MUST_BE_A_NUMBER,
        (value) => (value ? /^\d+(\.\d+)?$/.test(value) : false)
      )
      .test(
        ErrorMessages.TOO_SMALL,
        ErrorMessages.TOO_SMALL,
        (value) => Number(value) >= 0.00001
      )
      .test(
        ErrorMessages.CHECK_BALANCE,
        ErrorMessages.CHECK_BALANCE,
        (value) => Number(value) <= Number(balance)
      )
      .test(
        ErrorMessages.MAX_DIGIT_AFTER_DECIMAL,
        ErrorMessages.MAX_DIGIT_AFTER_DECIMAL,
        (value) =>
          value
            ? getDigitsAfterDecimal(value) <= MAX_DIGITS_AFTER_DECIMAL
            : false
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
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
});
export const createAccountValidations = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too long!")
    .required("Required"),
  passcode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits")
    .nullable(),
});
export const importAccountValidations = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(30, "Too long!"),
  passcode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits")
    .nullable(),
  mnemonic: Yup.string()
    .required("Required")
    .test("Invalid Mnemonic", "Invalid Mnemonic", (value) => {
      return value?.split(" ").length === 12;
    }),
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

export const buySellValidation = Yup.object().shape({
  password: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
});

type LimitOrderValidations = {
  isSell?: boolean;
  minMarketPrice: number;
  maxMarketPrice: number;
  minQuantity: number;
  maxQuantity: number;
  availableBalance: number;
};
export const limitOrderValidations = ({
  isSell = false,
  minMarketPrice,
  maxMarketPrice,
  minQuantity,
  maxQuantity,
  availableBalance,
}: LimitOrderValidations) =>
  Yup.object().shape({
    price: Yup.string()
      .required("Required")
      .test("Valid number", "Must be a number", (value) =>
        value ? /^\d+(\.\d+)?$/.test(value) : false
      )
      .test(
        "Min Price",
        `Minimum price: ${minMarketPrice}`,
        (value) => Number(value || 0) >= minMarketPrice
      )
      .test(
        "Max Price",
        `Maximum price: ${maxMarketPrice}`,
        (value) => Number(value || 0) <= maxMarketPrice
      ),
    amount: Yup.string()
      .required("Required")
      .test("Valid number", "Must be a number", (value) =>
        value ? /^\d+(\.\d+)?$/.test(value) : false
      )
      .test(
        "Min Quantity",
        `Minimum amount: ${minQuantity}`,
        (value) => Number(value || 0) >= minQuantity
      )
      .test(
        "Max Quantity",
        `Maximum amount: ${maxQuantity}`,
        (value) => Number(value || 0) <= maxQuantity
      )
      .test("Balance check", `You don't have enough balance`, (value) =>
        !isSell ? true : +(value || 0) <= availableBalance
      ),
    total: Yup.string()
      .test("Valid number", "Must be a number", (value) =>
        value ? /^\d+(\.\d+)?$/.test(value) : false
      )
      .test("Balance check", `You don't have enough balance`, (value) =>
        isSell ? true : getAbsoluteNumber(value || 0) <= availableBalance
      ),
  });
