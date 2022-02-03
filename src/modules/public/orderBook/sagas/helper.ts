import { DepthState, OrderBookState } from "..";

export function getDepthFromOrderbook(data: OrderBookState): DepthState {
  let bids = data.bid.map((bid) => {
    return [bid.price, bid.amount];
  });
  bids = sortArrayDescending(bids);
  let asks = data.ask.map((ask) => {
    return [ask.price, ask.amount];
  });
  asks = sortArrayDescending(asks);
  return { bids, asks };
}

function sortArrayDescending(arr: string[][]) {
  return arr.sort((a, b) => Number(b[0]) - Number(a[0]));
}
