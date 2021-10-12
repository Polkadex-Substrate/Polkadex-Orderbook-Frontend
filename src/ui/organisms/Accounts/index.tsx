import { useState } from "react";

import * as S from "./styles";

import { Icon, TransferInteraction } from "src/ui";

export const Accounts = () => {
  const [state, setState] = useState(false);
  // Form..

  return (
    <S.Wrapper>
      <TransferInteraction isActive={state} onClose={() => setState(!state)} />
      <h3>Accounts</h3>
      <S.Container>
        <AccountCard
          accountName="Main Account"
          ticket="PDEX"
          amount="0"
          ticketInFiat="USD"
          amountInFiat="0"
          onClick={() => setState(!state)}
        />
        <AccountCard
          accountName="Trader Account"
          ticket="PDEX"
          amount="0"
          ticketInFiat="USD"
          amountInFiat="0"
          onClick={() => setState(!state)}
        />
      </S.Container>
    </S.Wrapper>
  );
};

const AccountCard = ({
  accountName = "",
  ticket = "",
  amount = "",
  ticketInFiat = "",
  amountInFiat = "",
  ...props
}) => {
  return (
    <S.Card>
      <S.CardInformation>
        <span>
          {amount} {ticket}
        </span>
        <p>
          ~{amountInFiat} {ticketInFiat}
        </p>
      </S.CardInformation>
      <S.CardInformation>
        <span>{accountName}</span>
        <button type="button" {...props}>
          Transfer
          <Icon
            icon="ArrowRight"
            background="none"
            style={{ display: "inline-block", verticalAlign: "middle", padding: 0, margin: 0 }}
          />
        </button>
      </S.CardInformation>
      <S.CardAssets>See assets</S.CardAssets>
    </S.Card>
  );
};
