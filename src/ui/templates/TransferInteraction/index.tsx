import React from "react";
import { Formik, Form } from "formik";

import * as S from "./styles";

import { AmountInput, Button, MyCurrentAccountHeader, Popup, Portal } from "src/ui";

export const TransferInteraction = ({ isActive = false, onClose }) => {
  const tokens = [];

  const defaultValues = {
    amount: "0",
  };

  return (
    <Portal>
      <Popup isVisible={isActive} size="xxSmall" onClose={onClose}>
        <S.Wrapper>
          <S.Header>
            <h2>Transfer</h2>
            <Button
              title="Cancel"
              size="small"
              icon={{ icon: "Close", size: "xxsmall", background: "none" }}
              onClick={onClose}
            />
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
                    <MyCurrentAccountHeader
                      isHeader
                      withButton={false}
                      name="Main Account"
                      address="Balance: 0"
                    />
                  </S.Card>
                  <S.Card>
                    <S.CardTitle>To</S.CardTitle>
                    <MyCurrentAccountHeader
                      isHeader
                      withButton={false}
                      name="Trading Account"
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
                  <Button type="submit" title="Confirm" isFull />
                </Form>
              )}
            </Formik>
          </S.Content>
        </S.Wrapper>
      </Popup>
    </Portal>
  );
};
