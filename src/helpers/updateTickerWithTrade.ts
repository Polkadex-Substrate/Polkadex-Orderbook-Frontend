import { Ticker } from "../modules/public/markets";
import { PublicTrade } from "../modules/public/recentTrades";

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
