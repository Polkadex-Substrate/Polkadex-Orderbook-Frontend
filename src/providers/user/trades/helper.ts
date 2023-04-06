import * as T from "./types";
import * as A from "./actions";
import * as queries from "@polkadex/orderbook/graphql/queries";
import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";

export function processTradeData(eventData: A.UserTradeEvent): A.UserTrade {
  const [base, quote] = eventData.m.split("-");
  return {
    market_id: eventData.m,
    price: eventData.p,
    qty: eventData.q,
    baseAsset: base,
    quoteAsset: quote,
    timestamp: eventData.t,
    side: "Bid",
  };
}

export const fetchUserTrades = async (
  proxy_account: string,
  dateFrom: Date,
  dateTo: Date
): Promise<A.UserTrade[]> => {
  // TODO: make limit resonable by utilizing nextToken
  const tradesRaw: T.TradesQueryResult[] = await fetchAllFromAppSync(
    queries.listTradesByMainAccount,
    {
      main_account: proxy_account,
      from: dateFrom.toISOString(),
      to: dateTo.toISOString(),
      limit: 100,
    },
    "listTradesByMainAccount"
  );
  const trades: A.UserTrade[] = tradesRaw.map((trade) => ({
    market_id: trade.m,
    price: trade.p,
    qty: trade.q,
    side: trade.s,
    timestamp: Number(trade.t),
    baseAsset: trade.m.split("-")[0],
    quoteAsset: trade.m.split("-")[1],
  }));
  return trades;
};
