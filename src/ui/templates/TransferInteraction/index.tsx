import React from "react";
import { Formik, Form } from "formik";

import * as S from "./styles";

import {
  Button,
  SelectAccount,
  AmountInput,
  Popup,
  Portal,
} from "@polkadex/orderbook-ui/molecules";

export const TransferInteraction = ({ isActive = false, onClose }) => {
  const tokens = [];

  const defaultValues = {
    amount: "0",
  };

  return (
    <Portal>
      <Popup isVisible={isActive} size="small" onClose={onClose}>
        <S.Wrapper>
          <S.Header>
            <h2>Transfer</h2>
            <Button
              size="small"
              icon={{ name: "Close", size: "small", background: "none" }}
              onClick={onClose}>
              Cancel
            </Button>
          </S.Header>
          <S.Content>
            <Formik
              initialValues={defaultValues}
              onSubmit={async (values) => {
                console.log(values);
                // dispatch();
              }}>
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <S.Card>
                    <S.CardTitle>From</S.CardTitle>
                    <SelectAccount
                      withButton={false}
                      accountName="Main Account"
                      address="Balance: 0"
                    />
                  </S.Card>
                  <S.Card>
                    <S.CardTitle>To</S.CardTitle>
                    <SelectAccount
                      withButton={false}
                      accountName="Trading Account"
                      address="Balance: 0"
                    />
                  </S.Card>
                  <S.Card>
                    <S.CardTitle>Amount</S.CardTitle>
                    <AmountInput
                      data={tokens}
                      name="accountName"
                      placeholder="Amount"
                      type="text"
                      error={errors.amount && touched.amount && errors.amount}
                    />
                  </S.Card>
                  <Button type="submit" isFull>
                    Confirm
                  </Button>
                </Form>
              )}
            </Formik>
          </S.Content>
        </S.Wrapper>
      </Popup>
    </Portal>
  );
};
