import * as S from "./styles";
import * as T from "./types";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";

export const TableRow = ({ isOpenOrder = false, header = [], children }: T.Props) => (
  <S.Wrapper>
    <S.Flex>
      {header.map((item, i) => (
        <S.HeaderItem key={i}>
          <span>{item}</span>
        </S.HeaderItem>
      ))}
      {isOpenOrder && (
        <S.HeaderActions>
          <span>Actions</span>
        </S.HeaderActions>
      )}
    </S.Flex>
    {children}
  </S.Wrapper>
);

export const TableCard = ({
  isSell,
  filledQuantity = 0,
  orderSide,
  baseUnit,
  quoteUnit,
  data = [],
  isOpenOrder = false,
}: T.CardProps) => (
  <S.Container isOpenOrder={isOpenOrder}>
    <S.CardFlex>
      <S.Box>
        <S.InfoToken>
          <Icon name={isSell ? "OrderSell" : "OrderBuy"} size="large" color="text" />
          <S.Tag isSell={isSell}>{orderSide} </S.Tag>
        </S.InfoToken>
        <div>
          <span>
            {baseUnit}/{quoteUnit}
          </span>
        </div>
      </S.Box>
      {data.map((item, i) => (
        <S.Info key={i}>
          <span>{item.value}</span>
          {item.title && <p>{item.title}</p>}
        </S.Info>
      ))}
      {isOpenOrder && (
        <AvailableMessage message="Soon">
          <S.Actions hasOrder={filledQuantity < 100}>
            <div>
              <ul>
                <S.Cancel>Cancel</S.Cancel>
              </ul>
            </div>
          </S.Actions>
        </AvailableMessage>
      )}
    </S.CardFlex>
  </S.Container>
);
