import { Ticker } from "../providers/public/marketsProvider";
import { PublicTrade } from "../providers/public/recentTradesProvider/types";

export const updateTickerWithTrade = (currentTrade: PublicTrade, currentTicker: Ticker) => {
  const updatedTicker = {
    ...currentTicker,
    last: currentTrade.price,
    high:
      Number(currentTrade.price) > Number(currentTicker.high)
        ? currentTrade.price
        : currentTicker.high,
    low:
      Number(currentTrade.price) < Number(currentTicker.low)
        ? currentTrade.price
        : currentTicker.low,
  };
  return updatedTicker;
};
