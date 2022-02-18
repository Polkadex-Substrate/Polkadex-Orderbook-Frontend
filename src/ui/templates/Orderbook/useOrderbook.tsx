import { useDispatch } from "react-redux";

import {
  Market,
  selectCurrentMarket,
  selectCurrentPrice,
  selectDepthAsks,
  selectDepthBids,
  selectLastRecentTrade,
  selectCurrentMarketTickers,
  selectOpenOrdersList,
  setCurrentPrice,
  Ticker,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { accumulateVolume, calcMaxVolume, sortAsks, sortBids } from "@polkadex/web-helpers";

const defaultTicker = {
  amount: "0",
  low: "0",
  last: "0",
  high: "0",
  volume: "0",
  open: "0",
  price_change_percent: "+0.00%",
};

export const useOrderbook = () => {
  const bids = useReduxSelector(selectDepthBids);
  const asks = useReduxSelector(selectDepthAsks);
  const currentPrice = useReduxSelector(selectCurrentPrice);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const lastRecentTrade = useReduxSelector(selectLastRecentTrade);
  const marketTickers = useReduxSelector(selectCurrentMarketTickers);
  const openOrdersList = useReduxSelector(selectOpenOrdersList);

  const dispatch = useDispatch();

  const getTickerValue = (currentMarket: Market, tickers: { [key: string]: Ticker }) => {
    return tickers[currentMarket.id] || defaultTicker;
  };

  // Get Last Price
  const getLastPrice = () => {
    if (currentMarket) {
      let lastPrice = "";
      if (lastRecentTrade?.market === currentMarket.id) {
        lastPrice = lastRecentTrade.price;
        return {
          lastPrice: Decimal.format(lastPrice, currentMarket.price_precision, ","),
          isPositive: Number(lastRecentTrade.price_change) >= 0,
        };
      } else {
        const currentTicker = currentMarket && getTickerValue(currentMarket, marketTickers);
        lastPrice = currentTicker.last;
        return {
          lastPrice: Decimal.format(lastPrice, currentMarket.price_precision, ","),
          isPositive: currentTicker.price_change_percent.includes("+"),
        };
      }
    } else {
      return {
        lastPrice: "",
        isPositive: false,
      };
    }
  };

  // Header Base
  const formattedBaseUnit =
    currentMarket && currentMarket.base_unit
      ? `(${currentMarket.base_unit.toUpperCase()})`
      : "";

  // Header Quote
  const formattedQuoteUnit =
    currentMarket && currentMarket.quote_unit
      ? `(${currentMarket.quote_unit.toUpperCase()})`
      : "";

  // Orderbook Transactions
  const renderOrderBook = (isAsks = true) => {
    const arr = isAsks ? sortBids(bids) : sortAsks(asks);
    let total = accumulateVolume(arr);
    const priceFixed = currentMarket ? currentMarket.price_precision : 0;
    const amountFixed = currentMarket ? currentMarket.amount_precision : 0;

    return arr.length
      ? arr.map((item, i) => {
          const [price, volume] = item;
          switch (isAsks) {
            case isAsks:
              total = accumulateVolume(arr.slice(0).reverse()).slice(0).reverse();

              return [
                <Decimal
                  key={i}
                  fixed={priceFixed}
                  thousSep=","
                  prevValue={arr[i + 1] ? arr[i + 1][0] : 0}>
                  {price}
                </Decimal>,
                <Decimal key={i} fixed={amountFixed} thousSep=",">
                  {volume}
                </Decimal>,
                <Decimal key={i} fixed={amountFixed} thousSep=",">
                  {total[i]}
                </Decimal>,
              ];
            default:
              return [
                <Decimal
                  key={i}
                  fixed={priceFixed}
                  thousSep=","
                  prevValue={arr[i - 1] ? arr[i - 1][0] : 0}>
                  {price}
                </Decimal>,
                <Decimal key={i} fixed={amountFixed} thousSep=",">
                  {volume}
                </Decimal>,
                <Decimal key={i} fixed={amountFixed} thousSep=",">
                  {total[i]}
                </Decimal>,
              ];
          }
        })
      : [[[""], ""]];
  };

  // Set Bid
  const handleSelectBids = (index: string) => {
    const priceToSet = bids[Number(index)] && Number(bids[Number(index)][0]);
    if (currentPrice !== priceToSet) {
      dispatch(setCurrentPrice(priceToSet));
    }
  };

  // Set Asks
  const handleSelectAks = (index: string) => {
    const priceToSet = asks[Number(index)] && Number(asks[Number(index)][0]);
    if (currentPrice !== priceToSet) {
      dispatch(setCurrentPrice(priceToSet));
    }
  };

  // Cal Max Volume
  // const maxVolume = calcMaxVolume(sortBids(bids), sortAsks(asks));

  // // Accumulate Volume
  // const accVolume = (side: "asks" | "bids") => accumulateVolume(side);

  // const mapValues = (maxVolume?: number, data?: number[]) => {
  //   const resultData =
  //     data && maxVolume && data.length
  //       ? data.map((currentVolume) => {
  //           // tslint:disable-next-line:no-magic-numbers
  //           return { value: (currentVolume / maxVolume) * 100 };
  //         })
  //       : [];

  //   return resultData;
  // };

  // // Used to Calculate Row Width
  // const resultData = mapValues(maxVolume, accVolume("asks"));

  return {
    handleSelectAks,
    handleSelectBids,
    renderOrderBook,
    formattedQuoteUnit,
    formattedBaseUnit,
    getLastPrice,
    openOrdersList,
    currentMarket,
    // resultData,
  };
};
