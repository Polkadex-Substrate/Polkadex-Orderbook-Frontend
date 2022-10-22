import { useState } from "react";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { TransferInteraction } from "@polkadex/orderbook/file-to-delete/v2/ui/organisms/TransferInteraction";

export const Accounts = () => {
  const [state, setState] = useState(false);

  return (
    <S.Wrapper>
      <TransferInteraction isActive={state} onClose={() => setState(!state)} />
      <h3>Accounts</h3>
      <S.Container>
        <AccountCard
          accountName="Funding Account"
          ticket="PDEX"
          amount="0"
          ticketInFiat="USD"
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
            name="ArrowRight"
            background="none"
            style={{ display: "inline-block", verticalAlign: "middle", padding: 0, margin: 0 }}
          />
        </button>
      </S.CardInformation>
      <S.CardAssets>See assets</S.CardAssets>
    </S.Card>
  );
};
