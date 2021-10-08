import React from "react";

import * as S from "./styles";

import { AmountInput, Button, MyCurrentAccountHeader } from "src/ui";

export const TransferInteraction = ({ onClose }) => {
  const tokens = [];
  return (
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
        <form>
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
            <AmountInput data={tokens} />
          </S.Card>
          <Button title="Confirm" isFull />
        </form>
      </S.Content>
    </S.Wrapper>
  );
};
