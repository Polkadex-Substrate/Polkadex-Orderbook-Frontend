import * as S from "./styles";
import * as T from "./types";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";

export const TableRow = ({
  isOpenOrder = false,
  isSell,
  filledQuantity = 0,
  orderSide,
  baseUnit,
  quoteUnit,
  data = [],
}: T.Props) => (
  <S.Container isOpenOrder={isOpenOrder}>
    <S.Wrapper columns={data.length}>
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
          <span>{item}</span>
        </S.Info>
      ))}
    </S.Wrapper>
    {isOpenOrder && (
      <S.Actions hasOrder={filledQuantity < 100}>
        <div>
          <AvailableMessage message="Soon">
            <ul>
              {filledQuantity < 100 ? (
                <S.Cancel>Cancel</S.Cancel>
              ) : (
                <>
                  <S.Deposit>Deposit</S.Deposit>
                  <li>Withdraw</li>
                </>
              )}
            </ul>
          </AvailableMessage>
        </div>
      </S.Actions>
    )}
  </S.Container>
);
