import { useFormik } from "formik";

import * as S from "./styles";

import { Button, InputLine } from "@polkadex/orderbook-ui/molecules";
import { unLockAccountValidations } from "@polkadex/orderbook/validations";

export const UnlockAccount = ({ address, handleClose, handleSelectTradeAccount }) => {
  const { touched, handleSubmit, errors, getFieldProps, isValid } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: unLockAccountValidations,
    onSubmit: (values) => {
      // Add password
      handleSelectTradeAccount(address);
    },
  });

  return (
    <S.Wrapper>
      <S.Title>
        <h2>Unlock account</h2>
        <p>Inout 6-digit trading password to unlock your account</p>
      </S.Title>
      <form onSubmit={handleSubmit}>
        <InputLine
          name="password"
          label="Enter your password"
          placeholder="Type here"
          error={errors.password && touched.password && errors.password}
          {...getFieldProps("password")}
        />
        <S.Actions>
          <Button
            size="large"
            background="transparent"
            color="tertiraryText"
            type="button"
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="large"
            background="primary"
            color="white"
            type="submit"
            disabled={!isValid}>
            Continue
          </Button>
        </S.Actions>
      </form>
    </S.Wrapper>
  );
};
