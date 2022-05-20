import * as Yup from "yup";

export const signInValidations = Yup.object().shape({
  password: Yup.string().required("Required"),
  account: Yup.string().required("Required"),
});

export const loginValidations = Yup.object().shape({
  password: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

export const depositValidations = Yup.object().shape({
  amount: Yup.number().required("Required").typeError("Must be a number"),
  asset: Yup.string().required("Required"),
  market: Yup.object({
    id: Yup.string(),
    name: Yup.string(),
    base_unit: Yup.string(),
    quote_unit: Yup.string(),
    amount_precision: Yup.number(),
    price_precision: Yup.number(),
    state: Yup.string(),
    tokenTickerName: Yup.string(),
    base_ticker: Yup.string(),
    quote_ticker: Yup.string(),
  })
    .required("Required")
    .nullable(),
  address: Yup.string().required("Required"),
});
