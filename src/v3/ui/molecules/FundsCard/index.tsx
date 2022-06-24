import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { toCapitalize } from "@polkadex/web-helpers";

const FundsCard = ({
  id,
  name,
  ticker,
  lockedAmount = 0.0,
  lockedAmountFiat = 0.0,
  amount = 0.0,
  amountFiat = 0.0,
  locked = true,
}) => (
  <S.Tr>
    <S.Td>
      <S.Tag>Pair</S.Tag>
      <S.ContainerFlex>
        <S.CardIconWrapper>
          <Icon isToken name={ticker} color="black" size="large" />
        </S.CardIconWrapper>
        <S.CardInfo>
          <p>{toCapitalize(name)}</p>
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
      <S.Tag>Actions</S.Tag>
      <S.ContainerActions>
        <Icon name="Options" background="none" />
      </S.ContainerActions>
    </S.Td>
  </S.Tr>
);

export default FundsCard;
