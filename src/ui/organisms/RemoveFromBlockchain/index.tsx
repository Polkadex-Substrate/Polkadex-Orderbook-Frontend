import { useFormik } from "formik";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Button, InputLine } from "@polkadex/orderbook-ui/molecules";
import { typeValidations } from "@polkadex/orderbook/validations";
import { removeProxyAccountFromChainFetch } from "@polkadex/orderbook-modules";

export const RemoveFromBlockchain = ({ handleClose, address }) => {
  const dispatch = useDispatch();
  const { values, touched, handleSubmit, errors, getFieldProps } = useFormik({
    initialValues: {
      account: "",
    },
    validationSchema: typeValidations,
    onSubmit: () => {
      dispatch(removeProxyAccountFromChainFetch({ address }));
    },
  });
  const phrase = "delete account";

  const isDisabled = useMemo(() => values.account === phrase, [values]);
  return (
    <S.Wrapper>
      <S.Tag>
        <strong>Warning: </strong>This action is not reversible
      </S.Tag>
      <S.Title>
        <h2>Remove account from the blockchain</h2>
        <p>Don’t worry, your funds are safe in the your main account</p>
      </S.Title>
      <form onSubmit={handleSubmit}>
        <InputLine
          name="account"
          label={
            <>
              To verify, type <S.Strong>{phrase}</S.Strong> below:
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
