import { Icon } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";

export const FundsCard = ({
  name,
  ticker,
  lockedAmount = 0.0,
  amount = 0.0,
}) => (
  <S.Tr>
    <S.Td>
      <S.Tag>Pair</S.Tag>
      <S.ContainerFlex>
        <S.CardIconWrapper>
          <Icon isToken name={ticker} color="text" size="medium" />
        </S.CardIconWrapper>
        <S.CardInfo>
          <p>{name}</p>
          <span>{ticker}</span>
        </S.CardInfo>
      </S.ContainerFlex>
    </S.Td>
    <S.Td>
      <S.Tag>Available</S.Tag>
      <S.ContainerFlex>{amount.toFixed(7)}</S.ContainerFlex>
    </S.Td>
    <S.Td>
      <S.Tag>Locked</S.Tag>
      <S.ContainerFlex>
        <span>{lockedAmount.toFixed(7)}</span>
      </S.ContainerFlex>
    </S.Td>
    <S.Td>
      <S.Tag>Reserved for withdraw</S.Tag>
      <S.ContainerFlex>
        <span>0.000</span>
      </S.ContainerFlex>
    </S.Td>
    <S.Td>
      <S.Tag>Actions</S.Tag>
      <S.ContainerActions>
        <Icon name="Options" size="medium" background="none" />
      </S.ContainerActions>
    </S.Td>
  </S.Tr>
);
