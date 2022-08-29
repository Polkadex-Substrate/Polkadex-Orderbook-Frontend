import { useFormik } from "formik";

import * as S from "./styles";

import { Button, InputLine } from "@polkadex/orderbook-ui/molecules";
import { addPasscodeValidations } from "@polkadex/orderbook/validations";

export const AddPasscode = ({ handleClose }) => {
  const { touched, handleSubmit, errors, getFieldProps, isValid } = useFormik({
    initialValues: {
      passcode: "",
    },
    validationSchema: addPasscodeValidations,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <S.Wrapper>
      <S.Title>
        <h2>Trading Passcod (Optional)</h2>
        <p>Protect your transactions with a 6-digit passcode</p>
      </S.Title>
      <form onSubmit={handleSubmit}>
        <InputLine
          name="passcode"
          label="Passcode"
          placeholder="Type here"
          error={errors.passcode && touched.passcode && errors.passcode}
          type="number"
          {...getFieldProps("passcode")}
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
            disabled={isValid}
            onClick={() => console.log("testing")}>
            Continue
          </Button>
        </S.Actions>
      </form>
    </S.Wrapper>
  );
};
