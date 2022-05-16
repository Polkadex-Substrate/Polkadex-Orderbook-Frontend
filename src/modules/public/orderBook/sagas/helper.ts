import { DepthState, OrderBookState } from "..";

// TODO: UNUSED_DELETE
export function getDepthFromOrderbook(data: OrderBookState): DepthState {
  let bids = data.bids?.map((bid) => {
    return [bid[0], bid.amount];
  });
  bids = sortArrayDescending(bids);
  let asks = data.asks?.map((ask) => {
    return [ask.price, ask.amount];
  });
  asks = sortArrayDescending(asks);
  return { bids, asks };
}

function sortArrayDescending(arr: string[][]) {
  return arr?.sort((a, b) => Number(b[0]) - Number(a[0]));
}
