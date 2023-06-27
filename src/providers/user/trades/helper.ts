import * as T from "./types";
import * as A from "./actions";

import * as queries from "@polkadex/orderbook/graphql/queries";
import { fetchFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import { Utils } from "@polkadex/web-helpers";

const LIMIT = 15;

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
  proxyAccount: string,
  dateFrom: Date,
  dateTo: Date,
  tradeHistoryFetchToken: string | null
): Promise<{ trades: A.UserTrade[]; nextToken: string | null }> => {
  const dateFromStr = Utils.date.formatDateToISO(dateFrom);
  const dateToStr = Utils.date.formatDateToISO(dateTo);

  const { response: tradesRaw, nextToken }: T.FetchUserTradesResult = await fetchFromAppSync(
    queries.listTradesByMainAccount,
    {
      main_account: proxyAccount,
      from: dateFromStr,
      to: dateToStr,
      limit: LIMIT,
      nextToken: tradeHistoryFetchToken,
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
  return { nextToken, trades };
};
