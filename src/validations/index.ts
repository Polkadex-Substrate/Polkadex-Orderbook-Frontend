import * as Yup from "yup";

export const signInValidations = Yup.object().shape({
  password: Yup.string().required("Required"),
  account: Yup.string().required("Required"),
});

export const loginValidations = Yup.object().shape({
  password: Yup.string().required("Required"),
  // account: Yup.array().of(
  //   Yup.object().shape({
  //     name: Yup.string(),
  //   })
  // ),
  accountName: Yup.string().required("Required"),
  terms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
});
