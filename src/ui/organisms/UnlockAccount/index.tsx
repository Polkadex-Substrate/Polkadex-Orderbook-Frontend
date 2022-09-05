import { useFormik } from "formik";

import * as S from "./styles";

import { Button, PassCode } from "@polkadex/orderbook-ui/molecules";
import { unLockAccountValidations } from "@polkadex/orderbook/validations";

export const UnlockAccount = ({ address, handleClose, handleSelectTradeAccount }) => {
  const { setFieldValue, values, handleSubmit, errors, isValid } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: unLockAccountValidations,
    onSubmit: (values) => {
      // Add password values.password
      handleSelectTradeAccount(address);
    },
  });

  return (
    <S.Wrapper>
      <S.Title>
        <h2>Unlock account</h2>
        <p>Input 5-digit trading password to unlock your account</p>
      </S.Title>
      <form onSubmit={handleSubmit}>
        <PassCode
          numInputs={5}
          onChange={(e) => setFieldValue("password", e)}
          value={values.password}
          name="password"
          label="Enter your password"
          error={errors.password}
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
            Unlock
          </Button>
        </S.Actions>
      </form>
    </S.Wrapper>
  );
};
