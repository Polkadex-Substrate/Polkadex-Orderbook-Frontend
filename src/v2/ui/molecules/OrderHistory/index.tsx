import { useDispatch } from "react-redux";

import * as S from "./styles";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";
import { orderCancelFetch } from "@polkadex/orderbook-modules";
import * as T from "@orderbook/v2/ui/molecules/OrderHistoryTable/types";

export const OrderHistory = ({ orders, priceFixed, amountFixed, getAsset }: T.Props) => {
  const dispatch = useDispatch();
  return (
    <>
      {orders?.map((order, i) => {
        const date = new Date(Number(order.timestamp)).toLocaleTimeString();
        const isSell = order.order_side === "Sell";
        const isLimit = order.order_type === "Limit";
        const baseUnit = getAsset(order.base_asset_type).symbol;
        const quoteUnit = getAsset(order.quote_asset_type).symbol;
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
                  <p>Limit({quoteUnit})</p>
                </S.CardInfo>
              )}
              <S.CardInfo>
                <span>{Decimal.format(order.qty, amountFixed, ",")}</span>
                <p>Amount({isLimit ? baseUnit : quoteUnit})</p>
              </S.CardInfo>
              <S.CardInfo>
                <span>{filled}</span>
                <p>Filled</p>
              </S.CardInfo>
              <S.CardInfo>
                <span>
                  {Decimal.format(Number(order.price) * Number(order.qty), amountFixed, ",")}
                </span>
                <p>Total</p>
              </S.CardInfo>
            </S.CardWrapper>
            {order.status === "Open" && (
              <S.CardActions>
                <div>
                  <AvailableMessage message="Soon">
                    <ul>
                      <S.Cancel
                        onClick={() => {
                          dispatch(orderCancelFetch({ order_id: order.txid }));
                        }}>
                        Cancel
                      </S.Cancel>
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
