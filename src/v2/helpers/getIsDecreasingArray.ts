import { PublicTrade } from "@polkadex/orderbook-modules";
// TODO: Type response

export const getIsDecreasingArray = (recentTrades: PublicTrade[]): [boolean] => {
  const res: any = new Array(recentTrades.length);
  for (let i = recentTrades.length - 1; i >= 0; i--) {
    if (i === recentTrades.length - 1) {
      res[i] = false;
    } else if (Number(recentTrades[i].price) < Number(recentTrades[i + 1].price)) {
      res[i] = true;
    } else if (Number(recentTrades[i].price) === Number(recentTrades[i + 1].price)) {
      res[i] = res[i + 1];
    } else res[i] = false;
  }
  return res;
};
