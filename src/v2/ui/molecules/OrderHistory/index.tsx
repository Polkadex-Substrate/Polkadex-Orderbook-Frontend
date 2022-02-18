import * as S from "./styles";

import { EmptyData, Logged } from "@orderbook/v2/ui/molecules";
import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";
import { useOrderHistory } from "@polkadex/orderbook/v2/hooks";
import { localeDate } from "@polkadex/web-helpers";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";

export const OrderHistory = () => {
  const { priceFixed, amountFixed, orders, userLoggedIn, openOrders } = useOrderHistory();
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
                          <AvailableMessage message="Soon">
                            <ul>
                              {Number(order.filled_qty) < 100 ? (
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
                          <p>Amount</p>
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
