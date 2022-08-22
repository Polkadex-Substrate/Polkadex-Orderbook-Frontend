import { object, string } from "yup";

export const importValiations = () => {
  return object().shape({
    password: string()
      .min(8, "password should be greater than 8")
      .max(20, "Too large!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
        "Must Contain one uppercase, one lowercase, one number and one special case character"
      )
      .required("Required"),
    accountName: string()
      .min(3, "Account name should be greater than 4 characters")
      .max(13, "Too large!")
      .required("Required"),
  });
};
