import { useFormik } from "formik";
import { useMemo } from "react";

import * as S from "./styles";

import { Button, InputLine } from "@polkadex/orderbook-ui/molecules";
import { typeValidations } from "@polkadex/orderbook/validations";

export const RemoveFromBlockchain = ({ onClose, onAction, name }) => {
  const { values, touched, handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
      account: "",
    },
    validationSchema: typeValidations,
    onSubmit: onAction,
  });

  const isDisabled = useMemo(
    () => values.account === `delete ${name} account`.replace(/\s+/g, " ").trim(),
    [values, name]
  );
  return (
    <S.Wrapper>
      <S.Tag>
        <strong>Warning: </strong>This action is not reversible
      </S.Tag>
      <S.Title>
        <h2>Remove account from the blockchain</h2>
        <p>Don’t worry your funds are safe in your funding account</p>
      </S.Title>
      <form onSubmit={handleSubmit}>
        <InputLine
          name="account"
          label={
            <>
              To verify, type <S.Strong> delete {name} account</S.Strong> below:
            </>
          }
          placeholder="Type here"
          error={errors.account && touched.account && errors.account}
          {...getFieldProps("account")}
        />
        <S.Actions>
          <Button
            size="large"
            background="transparent"
            color="tertiaryText"
            type="button"
            onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="large"
            color="white"
            background="primary"
            type="submit"
            disabled={!isDisabled}>
            Continue
          </Button>
        </S.Actions>
      </form>
    </S.Wrapper>
  );
};
