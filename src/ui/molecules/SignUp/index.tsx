import { useState } from "react";
import { Formik, Form } from "formik";

import * as S from "./styles";

import { Button } from "src/ui/components";
import { Checkbox, Input, MnemonicImport, MnemonicExport } from "src/ui/molecules";
import { useMnemonic } from "src/hooks/useMnemonic";
import { useDispatch } from "react-redux";
import { signUp } from "src/modules";

const defaultValues = {
  password: "",
  account: "",
  accountName: "",
  terms: false,
};

export const SignUp = () => {
  const [state, setstate] = useState(false);
  const {mnemonic, mnemoicString} = useMnemonic()

  const phrases = mnemonic;
  const dispatch = useDispatch();
  return (
    <S.Wrapper>
      <Formik
        initialValues={defaultValues}
        onSubmit={async (values) => {
          dispatch(signUp({
            username: values.accountName,
            password: values.password,
            mnemonic: mnemoicString
          }))
        }}>
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <S.Container>
              {state ? (
                <MnemonicImport
                  value="witch collapse practice feed shame open despair road again ice least coffee"
                  label="12-word mnemonic seed"
                  name="account"
                  handleChange={() => setstate(false)}
                />
              ) : (
                <MnemonicExport
                  label="12-word mnemonic seed"
                  handleChange={() => setstate(true)}
                  phrases={phrases}
                />
              )}
              <p>
                The mnemonic can be used to restore your wallet. Having the mnemonic phrases
                can have a full control over the assets.
              </p>
            </S.Container>

            <Input
              label="Account name"
              name="accountName"
              placeholder="Enter a name fot this account"
              type="text"
              error={errors.accountName && touched.accountName && errors.accountName}
            />
            <Input
              label="Password"
              name="password"
              placeholder="Enter a new password fot this account"
              type="password"
              error={errors.password && touched.password && errors.password}
            />
            <Checkbox
              name="terms"
              label="I have saved my mnemonic seed safely"
              error={errors.terms && touched.terms && errors.terms}
            />
            <Button
              title="Sign In"
              type="submit"
              style={{ width: "100%", marginTop: 20, justifyContent: "center" }}
            />
          </Form>
        )}
      </Formik>
    </S.Wrapper>
  );
};

