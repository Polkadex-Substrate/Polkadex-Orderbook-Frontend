import * as React from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  Market,
  selectCurrentMarket,
  selectCurrentPrice,
  selectDepthAsks,
  selectDepthBids,
  selectLastRecentTrade,
  selectMarketTickers,
  setCurrentPrice,
  Ticker,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { Icon, Skeleton, Dropdown, AvailableMessage } from "@polkadex/orderbook-ui/molecules";
import { accumulateVolume, calcMaxVolume } from "@polkadex/web-helpers";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";

export const Orderbook = () => {
  const dispatch = useDispatch();
  const [isPriceUp, setIsPriceUp] = React.useState(true);
  const [prevTradePrice, setPrevTradePrice] = React.useState(0);
  const bids = useReduxSelector(selectDepthBids);
  const asks = useReduxSelector(selectDepthAsks);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const lastRecentTrade = useReduxSelector(selectLastRecentTrade);
  const marketTickers = useReduxSelector(selectMarketTickers);
  const currentPrice = useReduxSelector(selectCurrentPrice);
  const getTickerValue = (currentMarket: Market, tickers: { [key: string]: Ticker }) =>
    tickers[currentMarket?.id];

  const currentTicker = getTickerValue(currentMarket, marketTickers);

  React.useEffect(() => {
    const price = Number(lastRecentTrade?.price);
    const checkIsPriceChanegePositve = () => {
      if (price > prevTradePrice) {
        return true;
      } else if (price === prevTradePrice) {
        return isPriceUp;
      }
      return false;
    };
    const _isPriceUp = checkIsPriceChanegePositve();
    setIsPriceUp(_isPriceUp);
    setPrevTradePrice(price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastRecentTrade]);

  const getLastPrice = () => {
    let lastPrice = "";
    if (
      lastRecentTrade?.market_id[0].Asset === currentMarket.symbolArray[0] &&
      lastRecentTrade?.market_id[1].Asset === currentMarket.symbolArray[1]
    ) {
      lastPrice = lastRecentTrade?.price;
    } else {
      lastPrice = currentTicker?.last;
    }
    return lastPrice;
  };

  const maxVolume = calcMaxVolume(bids, asks);
  const handleSelectPrice = (index: string, side: "asks" | "bids") => {
    const arr = side === "asks" ? asks : bids;
    const priceToSet = arr[Number(index)] && Number(arr[Number(index)][0]);
    if (currentPrice !== priceToSet) dispatch(setCurrentPrice(priceToSet));
  };

  return (
    <S.Wrapper>
      <S.Header>
        <h2>Orderbook</h2>
        <AvailableMessage message="Soon">
          <S.Options>
            <ul>
              <li>
                <Icon name="OrdersBuy" size="extraSmall" />
              </li>
              <li>
                <Icon name="OrdersAll" size="extraSmall" />
              </li>
              <li>
                <Icon name="OrdersSell" size="extraSmall" />
              </li>
            </ul>

            <Dropdown header="001" direction="bottomRight">
              <p>testing</p>
            </Dropdown>
          </S.Options>
        </AvailableMessage>
      </S.Header>
      <S.Content>
        <OrderbookColumn
          data={bids}
          side="bids"
          maxVolume={maxVolume}
          handleSelectPrice={handleSelectPrice}
          isBottomPosition
        />
        <S.Select>
          {currentMarket ? (
            <S.LastPriceWrapper>
              Latest Price
              <S.LastPrice isPositive={isPriceUp}>
                {Decimal.format(getLastPrice(), currentMarket?.price_precision, ",")}&nbsp;
                {currentMarket?.quote_unit.toUpperCase()}
              </S.LastPrice>
            </S.LastPriceWrapper>
          ) : (
            <Skeleton width="3rem" style={{ display: "inline-block", marginLeft: "0.5rem" }} />
          )}
        </S.Select>
        <OrderbookColumn
          data={asks}
          side="asks"
          maxVolume={maxVolume}
          handleSelectPrice={handleSelectPrice}
        />
      </S.Content>
    </S.Wrapper>
  );
};

const mapValues = (maxVolume?: number, data?: number[]) => {
  const resultData =
    data && maxVolume && data.length
      ? data.map((currentVolume) => {
          // tslint:disable-next-line:no-magic-numbers
          return { value: (currentVolume / maxVolume) * 100 };
        })
      : [];
  return resultData;
};
const OrderbookColumn = ({
  data = [],
  maxVolume,
  side = "asks",
  isLarge = true,
  handleSelectPrice,
  isBottomPosition = false,
}) => {
  const currentMarket = useReduxSelector(selectCurrentMarket);

  const formattedBaseUnit = getSymbolFromAssetId(currentMarket?.symbolArray[0]).toUpperCase();
  const formattedQuoteUnit = getSymbolFromAssetId(currentMarket?.symbolArray[1]).toUpperCase();
  const priceFixed = currentMarket?.price_precision || 0;
  const amountFixed = currentMarket?.amount_precision || 0;
  const isSell = side === "asks";

  const valumeData = mapValues(maxVolume, accumulateVolume(data));
  const getRowWidth = (index: number) =>
    valumeData && valumeData.length ? `${valumeData[index].value}%` : "1%";

  const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (isBottomPosition && !!contentRef?.current)
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }, [isBottomPosition, contentRef, data]);

  return (
    <S.Box>
      {data.length ? (
        <>
          <S.BoxHeader onClick={() => console.log(contentRef?.current?.scrollIntoView())}>
            <span>Price({formattedBaseUnit})</span>
            <span>Amount({formattedQuoteUnit})</span>
            <span>Total({formattedBaseUnit})</span>
          </S.BoxHeader>
          <S.BoxContent hasScroll={data.length >= 8}>
            {data.map((item, index) => {
              const total = isLarge
                ? accumulateVolume(data)
                : accumulateVolume(data.slice(0).reverse()).slice(0).reverse();
              const [price, volume] = item;
              return (
                <S.OrderbookCard key={index} onClick={() => handleSelectPrice(index, side)}>
                  <S.OrderbookPrice isSell={isSell}>
                    <Decimal
                      key={index}
                      fixed={priceFixed}
                      thousSep=","
                      prevValue={data[index + 1] ? data[index + 1][0] : 0}>
                      {price}
                    </Decimal>
                  </S.OrderbookPrice>
                  <S.OrderbookAmount>
                    <Decimal key={index} fixed={amountFixed} thousSep=",">
                      {volume}
                    </Decimal>
                  </S.OrderbookAmount>
                  <S.OrderbookCardWrapper>
                    <Decimal key={index} fixed={amountFixed} thousSep=",">
                      {total[index]}
                    </Decimal>
                  </S.OrderbookCardWrapper>
                  <S.VolumeSpan
                    key={index}
                    isSell={isSell}
                    style={{ width: getRowWidth(index) }}
                  />
                </S.OrderbookCard>
              );
            })}
          </S.BoxContent>
        </>
      ) : (
        <LoadingContainer />
      )}
    </S.Box>
  );
};

const LoadingContainer = () => {
  return (
    <S.Box>
      <S.BoxHeader>
        <span>Price</span>
        <span>Amount</span>
        <span>Total</span>
      </S.BoxHeader>
      <S.BoxContent>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </S.BoxContent>
    </S.Box>
  );
};

const LoadingCard = () => {
  return (
    <S.OrderbookCard style={{ marginBottom: "0.8rem" }}>
      <Skeleton height="1rem" />
      <Skeleton height="1rem" />
      <Skeleton height="1rem" />
    </S.OrderbookCard>
  );
};
