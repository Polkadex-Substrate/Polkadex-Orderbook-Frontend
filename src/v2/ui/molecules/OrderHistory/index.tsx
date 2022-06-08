import { useDispatch } from "react-redux";

import * as S from "./styles";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { orderCancelFetch } from "@polkadex/orderbook-modules";
import * as T from "@orderbook/v2/ui/molecules/OrderHistoryTable/types";
import { calcStatusOfOrder } from "@polkadex/orderbook/v2/helpers/calcOrderStatus";
import { calcAveragePrice } from "@polkadex/orderbook/v2/helpers/calcAverageTradePrice";

export const OrderHistory = ({ orders, priceFixed, amountFixed, getAsset }: T.Props) => {
  const dispatch = useDispatch();
  return (
    <>
      {orders?.map((order, i) => {
        const date = new Date(Number(order.timestamp)).toLocaleString();
        const isSell = order.order_side === "Ask";
        const isLimit = order.order_type === "LIMIT";
        const baseUnit = getAsset(order.base_asset_type).symbol;
        const quoteUnit = getAsset(order.quote_asset_type).symbol;
        const filled = Number(order.filled_qty);
        const avgPrice = calcAveragePrice(order.filled_qty, order.filled_price);
        const status = order.status.toUpperCase();
        console.log(">>>", order.order_side);
        return (
          <S.Card key={i} isOpenOrder={order.status === "Open"}>
            <S.CardWrapper>
              <S.CardBox>
                <S.CardInfoToken>
                  <Icon name={isSell ? "OrderSell" : "OrderBuy"} size="large" color="text" />
                  <S.Tag isSell={isSell}>{order.order_side}</S.Tag>
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
                  <p>Limit({quoteUnit})</p>
                </S.CardInfo>
              )}
              <S.CardInfo>
                <span>{isLimit ? calcStatusOfOrder(status) : "CLOSED"}</span>
                <p>Status</p>
              </S.CardInfo>
              <S.CardInfo>
                <span>{Decimal.format(order.qty, amountFixed, ",")}</span>
                <p>Amount</p>
              </S.CardInfo>

              <S.CardInfo>
                <span>{filled}</span>
                <p>Filled</p>
              </S.CardInfo>
              <S.CardInfo>
                <span>{Decimal.format(avgPrice, priceFixed, ",")}</span>
                <p>Avg Price</p>
              </S.CardInfo>
            </S.CardWrapper>
            {order.status === "Accepted" && isLimit && (
              <S.CardActions>
                <div>
                  <AvailableMessage message="Soon">
                    <ul>
                      <AvailableMessage message="Soon">
                        <S.Cancel
                          onClick={() => {
                            dispatch(orderCancelFetch({ order_id: order.txid }));
                          }}>
                          Cancel
                        </S.Cancel>
                      </AvailableMessage>
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
};
