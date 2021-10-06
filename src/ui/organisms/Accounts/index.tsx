import { useEffect, useState } from "react";

import * as S from "./styles";

import { Button, Decimal, Icon, Skeleton, TabHeader, Tabs } from "src/ui/components";

export const Accounts = () => {
  return (
    <S.Wrapper>
      <h3>Accounts and Assets</h3>
      <S.Container>
        <AccountCard
          accountName="Main Account"
          ticket="PDEX"
          amount="0"
          ticketInFiat="USD"
          amountInFiat="0"
        />
         <AccountCard
          accountName="Trader Account"
          ticket="PDEX"
          amount="0"
          ticketInFiat="USD"
          amountInFiat="0"
        />
      </S.Container>
    </S.Wrapper>
  );
};

const AccountCard = ({accountName = "", ticket = "", amount = "", ticketInFiat = "", amountInFiat = "" }) => {
  return(
    <S.Card>
      <S.CardInformation>
        <span>{amount} {ticket}</span>
        <p>~{amountInFiat} {ticketInFiat}</p>
      </S.CardInformation>
      <S.CardInformation>
        <span>{accountName}</span>
        <button onClick={()=> console.log("Transfer interaction")}>Transfer <Icon icon="ArrowRight" background="none" style={{display: "inline-block", verticalAlign:"middle", padding: 0, margin: 0}}/></button>
      </S.CardInformation>
      <S.CardAssets>
          See assets
      </S.CardAssets>
    </S.Card>
  )
}
