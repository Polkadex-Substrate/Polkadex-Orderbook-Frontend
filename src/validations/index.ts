import * as Yup from "yup";

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

export const depositValidations = Yup.object().shape({
  amount: Yup.number()
    .required("Required")
    .min(0.0000000001, "Too Short!")
    .typeError("Must be a number"),
  asset: Yup.object({
    assetId: Yup.string(),
    name: Yup.string(),
    symbol: Yup.string(),
    decimals: Yup.string(),
    isFrozen: Yup.bool(),
  })
    .required("Required")
    .nullable(),
  address: Yup.string().required("Required"),
});

export const signUpValidations = Yup.object().shape({
  password: Yup.string().required("Required").min(2, "Too Short!").max(20, "Too Long!"),
  repeatPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  email: Yup.string().email("Must be a valid email").required("Required"),
});

export const signValidations = Yup.object().shape({
  password: Yup.string().required("Required"),
  email: Yup.string().email("Must be a valid email").required("Required"),
});

export const codeValidations = Yup.object().shape({
  code: Yup.string().required("Required"),
});

export const withdrawValidations = Yup.object().shape({
  amount: Yup.number()
    .required("Required")
    .min(0.01, "Too Short!")
    .typeError("Must be a number"),
});
export const typeValidations = Yup.object().shape({
  account: Yup.string().required("Required"),
});
export const unLockAccountValidations = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .matches(/^[0-9]+$/, "Must be only digits"),
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
  name: Yup.string().min(2, "Too Short!").max(30, "Too long!"),
  passcode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits")
    .nullable(),
  file: Yup.mixed().required("Required"),
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
