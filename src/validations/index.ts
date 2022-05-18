import * as Yup from "yup";

export const signInValidations = Yup.object().shape({
  password: Yup.string().required("Required"),
  account: Yup.string().required("Required"),
});

export const loginValidations = Yup.object().shape({
  password: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});
