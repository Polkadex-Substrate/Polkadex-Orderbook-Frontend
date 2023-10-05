import * as queries from "@orderbook/core/graphql/queries";
import { fetchBatchFromAppSync, Utils } from "@orderbook/core/helpers";
import { TRADE_HISTORY_PER_PAGE_LIMIT } from "@orderbook/core/constants";

import * as T from "./types";

export function processTradeData(eventData: T.UserTradeEvent): T.UserTrade {
  const [base, quote] = eventData.m.split("-");
  return {
    market_id: eventData.m,
    price: eventData.p,
    qty: eventData.q,
    baseAsset: base,
    quoteAsset: quote,
    timestamp: eventData.t,
    side: "Bid",
    isReverted: null,
  };
}

export const fetchUserTrades = async (
  proxyAccount: string,
  dateFrom: Date,
  dateTo: Date,
  tradeHistoryFetchToken: string | null
): Promise<{ trades: T.UserTrade[]; nextToken: string | null }> => {
  const dateFromStr = Utils.date.formatDateToISO(dateFrom);
  const dateToStr = Utils.date.formatDateToISO(dateTo);

  const { response: tradesRaw, nextToken }: T.FetchUserTradesResult =
    await fetchBatchFromAppSync(
      queries.listTradesByMainAccount,
      {
        main_account: proxyAccount,
        from: dateFromStr,
        to: dateToStr,
        limit: TRADE_HISTORY_PER_PAGE_LIMIT,
        nextToken: tradeHistoryFetchToken,
      },
      "listTradesByMainAccount"
    );

  const trades: T.UserTrade[] = tradesRaw.map((trade) => ({
    market_id: trade.m,
    price: trade.p,
    qty: trade.q,
    side: trade.s,
    timestamp: Number(trade.t),
    baseAsset: trade.m.split("-")[0],
    quoteAsset: trade.m.split("-")[1],
    isReverted: trade.isReverted,
  }));
  return { nextToken, trades };
};
