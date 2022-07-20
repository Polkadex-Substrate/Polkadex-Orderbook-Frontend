import { useFormik } from "formik";
import { useMemo } from "react";

import * as S from "./styles";

import { Button, InputLine } from "@polkadex/orderbook-ui/molecules";
import { typeValidations } from "@polkadex/orderbook/validations";

export const RemoveFromBlockchain = ({ handleClose }) => {
  const { values, touched, handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
      account: "",
    },
    validationSchema: typeValidations,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const accountName = "trading";

  const isDisabled = useMemo(
    () => values.account === `delete ${accountName} account`,
    [values]
  );
  return (
    <S.Wrapper>
      <S.Tag>
        <strong>Warning: </strong> Warning: This action is not reversible
      </S.Tag>
      <S.Title>
        <h2>Remove account from the blockchain</h2>
        <p>Don’t worry your funds are safe in the your main account</p>
      </S.Title>
      <form onSubmit={handleSubmit}>
        <InputLine
          name="account"
          label={
            <>
              To verify, type <S.Strong> delete {accountName} account</S.Strong> below:
            </>
          }
          error={errors.account && touched.account && errors.account}
          {...getFieldProps("account")}
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
            type="submit"
            disabled={!isDisabled}
            onClick={() => console.log("testing")}>
            Continue
          </Button>
        </S.Actions>
      </form>
    </S.Wrapper>
  );
};
