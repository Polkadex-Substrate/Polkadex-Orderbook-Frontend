import * as S from "./styles";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";
import * as T from "@orderbook/v2/ui/molecules/OrderHistoryTable/types";

export const OrderHistory = ({ orders, priceFixed, amountFixed }: T.Props) => (
  <>
    {orders?.map((order, i) => {
      const date = new Date(Number(order.timestamp)).toLocaleTimeString();
      const isSell = order.order_side === "Sell";
      const isLimit = order.order_type === "Limit";
      const baseUnit = getSymbolFromAssetId(order.base_asset);
      const quoteUnit = getSymbolFromAssetId(order.quote_asset);
      const filled = Number(order.filled_qty).toFixed(5);

      return (
        <S.Card key={i} isOpenOrder={order.status === "Open"}>
          <S.CardWrapper>
            <S.CardBox>
              <S.CardInfoToken>
                <Icon name={isSell ? "OrderSell" : "OrderBuy"} size="large" color="text" />
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
              <span>{order.order_type}</span>
              <p>Type</p>
            </S.CardInfo>
            {isLimit && (
              <S.CardInfo>
                <span>{Decimal.format(order.price, priceFixed, ",")}</span>
                <p>Limit</p>
              </S.CardInfo>
            )}
            <S.CardInfo>
              <span>{Decimal.format(order.amount, amountFixed, ",")}</span>
              <p>Amount</p>
            </S.CardInfo>
            <S.CardInfo>
              <span>{filled}</span>
              <p>Filled</p>
            </S.CardInfo>
            <S.CardInfo>
              <span>
                {Decimal.format(Number(order.price) * Number(order.amount), amountFixed, ",")}
              </span>
              <p>Total</p>
            </S.CardInfo>
          </S.CardWrapper>
          {order.status === "Open" && (
            <S.CardActions>
              <div>
                <AvailableMessage message="Soon">
                  <ul>
                    <S.Cancel>Cancel</S.Cancel>
                  </ul>
                </AvailableMessage>
              </div>
            </S.CardActions>
          )}
        </S.Card>
      );
    })}
  </>
);
