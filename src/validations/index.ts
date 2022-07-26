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
