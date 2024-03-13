import {PublicTrade} from "@orderbook/core/utils/orderbookService";

export const getIsDecreasingArray = (recentTrades: PublicTrade[]): [boolean] => {
  const res: [boolean] = new Array(recentTrades.length) as [boolean];

  for (let i = recentTrades.length - 1; i >= 0; i--) {
    if (i === recentTrades.length - 1) {
      res[i] = false;
    } else if (
      Number(recentTrades[i].price) < Number(recentTrades[i + 1].price)
    ) {
      res[i] = true;
    } else if (
      Number(recentTrades[i].price) === Number(recentTrades[i + 1].price)
    ) {
      res[i] = res[i + 1];
    } else res[i] = false;
  }
  return res;
};
