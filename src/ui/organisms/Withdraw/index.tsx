import { Formik, Form } from "formik";

import * as S from "./styles";

import { Button, Dropdown, Icon, SecondaryInput } from "@polkadex/orderbook-ui/molecules";
import { FlexSpaceBetween } from "@polkadex/orderbook-ui/atoms";

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
            <SecondaryInput
              label="Wallet Address"
              name="walletAddress"
              value="0x1q2w3e4r5t6y7ui89o0pa1s2s3d4f5g6h7j7k8l9l0"
            />
            <S.Form>
              <SecondaryInput label="Amount" name="amount" token="PDEX" value={0.0} />
              <Icon name="Exchange" size="medium" style={{ marginBottom: "0.5rem" }} />
              <SecondaryInput label="In Fiat" name="amountInFiat" token="USD" value={0.0} />
            </S.Form>
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
          </Form>
        )}
      </Formik>
    </S.Wrapper>
  );
};
