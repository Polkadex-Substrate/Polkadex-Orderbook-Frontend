import { DepthState, OrderBookDbState } from "..";

// TODO: UNUSED_DELETE
export function getDepthFromOrderbook(data: OrderBookDbState[]): DepthState {
  const bids = data
    .filter((data) => data.side === "Bid")
    ?.map((bid) => {
      return [bid.price, bid.qty];
    });
  const asks = data
    .filter((data) => data.side === "Ask")
    .map((ask) => {
      return [ask.price, ask.qty];
    });
  return { bids, asks };
}
