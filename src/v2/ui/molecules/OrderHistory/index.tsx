import { useDispatch } from "react-redux";

import * as S from "./styles";

import { EmptyData, Logged } from "@orderbook/v2/ui/molecules";
import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";
import { useOrderHistory } from "@polkadex/orderbook/v2/hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";
import { orderCancelFetch } from "@polkadex/orderbook-modules";

export const OrderHistory = () => {
  const { priceFixed, amountFixed, orders, userLoggedIn, openOrders } = useOrderHistory();
  const dispatch = useDispatch();
  return (
    <>
      {userLoggedIn ? (
        <>
          {!!openOrders.length || !!orders.length ? (
            <>
              {!!openOrders.length &&
                openOrders.map((order, i) => {
                  const date = new Date(Number(order.timestamp)).toLocaleTimeString();
                  const isSell = order.order_side === "Sell";
                  const isLimit = order.order_type === "Limit";
                  const baseUnit = getSymbolFromAssetId(order.base_asset);
                  const quoteUnit = getSymbolFromAssetId(order.quote_asset);
                  const filled = Number(order.filled_qty).toFixed(2);
                  console.log(order.order_id);
                  return (
                    <S.Card key={i} isOpenOrder={true}>
                      <S.CardWrapper>
                        <S.CardBox>
                          <S.CardInfoToken>
                            <Icon
                              name={isSell ? "OrderSell" : "OrderBuy"}
                              size="large"
                              color="text"
                            />
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
                          <span>{Decimal.format(order.amount, amountFixed, ",")}</span>
                          <p>Amount({isLimit ? baseUnit : quoteUnit})</p>
                        </S.CardInfo>
                        <S.CardInfo>
                          <span>{filled}</span>
                          <p>Filled</p>
                        </S.CardInfo>
                        <S.CardInfo>
                          <span>
                            {Decimal.format(
                              Number(order.price) * Number(order.amount),
                              amountFixed,
                              ","
                            )}
                          </span>
                          <p>Total</p>
                        </S.CardInfo>
                      </S.CardWrapper>

                      <S.CardActions>
                        <div>
                          <ul>
                            {order.status === "Open" ? (
                              <S.Cancel>
                                <button
                                  onClick={() => {
                                    dispatch(orderCancelFetch({ order_id: order.order_id }));
                                  }}>
                                  Cancel
                                </button>
                              </S.Cancel>
                            ) : (
                              <>
                                <S.Deposit>Deposit</S.Deposit>
                                <li>Withdraw</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </S.CardActions>
                    </S.Card>
                  );
                })}
              {!!orders.length &&
                orders.map((order, i) => {
                  const date = new Date(Number(order.timestamp)).toLocaleTimeString();
                  const isSell = order.order_side === "Sell";
                  const isLimit = order.order_type === "Limit";
                  const baseUnit = getSymbolFromAssetId(order.base_asset);
                  const quoteUnit = getSymbolFromAssetId(order.quote_asset);
                  const filled = Number(order.filled_qty).toFixed(2);
                  return (
                    <S.Card key={i}>
                      <S.CardWrapper>
                        <S.CardBox>
                          <S.CardInfoToken>
                            <Icon
                              name={isSell ? "OrderSell" : "OrderBuy"}
                              size="large"
                              color="text"
                            />
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
                          <p>Amount({isLimit ? baseUnit : quoteUnit})</p>
                        </S.CardInfo>
                        <S.CardInfo>
                          <span>{filled}</span>
                          <p>Filled</p>
                        </S.CardInfo>
                        <S.CardInfo>
                          <span>
                            {Decimal.format(
                              Number(order.price) * Number(order.amount),
                              amountFixed,
                              ","
                            )}
                          </span>
                          <p>Total</p>
                        </S.CardInfo>
                      </S.CardWrapper>
                    </S.Card>
                  );
                })}
            </>
          ) : (
            <EmptyData />
          )}
        </>
      ) : (
        <Logged />
      )}
    </>
  );
};
