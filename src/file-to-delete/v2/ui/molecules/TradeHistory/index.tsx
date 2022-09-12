import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import * as T from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/OrderHistoryTable/types";

export const TradeHistory = ({ orders, priceFixed, amountFixed, getAsset }: T.Props) => (
  <>
    {orders.map((order, i) => {
      const date = new Date(parseInt(order.timestamp)).toLocaleString();
      const isSell = order.order_side === "Sell";
      const baseUnit = getAsset(order.base_asset_type).symbol;
      const quoteUnit = getAsset(order.quote_asset_type).symbol;
      return (
        <S.Card key={i}>
          <S.CardWrapper>
            <S.CardBox>
              <S.CardInfoToken>
                <Icon name={isSell ? "OrderSell" : "OrderBuy"} size="large" />
                <S.Tag isSell={isSell}>{order.order_side} </S.Tag>
              </S.CardInfoToken>
              <div>
                <span>
                  {baseUnit}/{quoteUnit}
                </span>
                <p>{date}</p>
              </div>
            </S.CardBox>
            <S.CardInfo>
              <span>{Decimal.format(order.price, priceFixed, ",")}</span>
              <p>Price</p>
            </S.CardInfo>
            <S.CardInfo>
              <span>{Decimal.format(order.qty, amountFixed, ",")}</span>
              <p>Quantity</p>
            </S.CardInfo>
          </S.CardWrapper>
        </S.Card>
      );
    })}
  </>
);
