import { Formik, Form } from "formik";

import * as S from "./styles";

import { Button, Dropdown, Icon, SecondaryInput } from "@polkadex/orderbook-ui/molecules";

const defaultValues = {
  walletAddress: "",
  amount: 0.0,
  amountInFiat: 0.0,
};

export const Withdraw = () => {
  return (
    <S.Wrapper>
      <Formik
        initialValues={defaultValues}
        onSubmit={async (values) => {
          console.log(values);
          // dispatch(

          // );
        }}>
        {({ errors, touched }) => (
          <Form>
            <S.Form>
              <S.FormAddress>
                <SecondaryInput
                  label="Wallet Address"
                  name="walletAddress"
                  value="0x1q2w3e4r5t6y7ui89o0pa1s2s3d4f5g6h7j7k8l9l0">
                  <Button size="extraSmall" color="white" background="secondaryBackground">
                    PASTE
                  </Button>
                </SecondaryInput>
              </S.FormAddress>

              <S.FormAmount>
                <SecondaryInput label="Amount" name="amount">
                  <span>PDEX</span>
                </SecondaryInput>
                <Icon
                  name="Swap"
                  size="medium"
                  style={{ marginBottom: "0.5rem", transform: "rotate(90deg)" }}
                />
                <SecondaryInput label="In Fiat" name="amountInFiat">
                  <span>USD</span>
                </SecondaryInput>
              </S.FormAmount>
              <S.Info>
                <Dropdown header="Fee: 0.00001 BTC">Testing</Dropdown>
                <p>
                  You will get <strong> 0.0006108506 BTC</strong>
                </p>
              </S.Info>
              <Button background="primary" size="extraLarge" color="white" isFull>
                Withdraw
              </Button>
              <S.Footer>
                <span>Minimum withdrawal: 0.002 BTC</span>
                <p>
                  Please make sure you insert the correct BTC address. Withdrawals processed to
                  an incorrect address are not reversible.
                </p>
              </S.Footer>
            </S.Form>
          </Form>
        )}
      </Formik>
    </S.Wrapper>
  );
};
