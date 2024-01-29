import { getKlinesByMarketInterval } from "@orderbook/core/graphql/queries";
import {
  KlineDbData,
  KlineEvent,
} from "@orderbook/core/providers/public/klineProvider";

import { sendQueryToAppSync } from "./appsync";
import { processKlineData } from "./processKlineData";

export const fetchKlineAsync = async (
  market: string,
  interval: string,
  from: Date,
  to: Date
): Promise<KlineEvent[]> => {
  if (!market) {
    return [];
  }
  const res = await sendQueryToAppSync({
    query: getKlinesByMarketInterval,
    variables: {
      market,
      interval,
      from: from.toISOString(),
      to: to.toISOString(),
    },
  });
  const data: KlineDbData[] = res.data?.getKlinesByMarketInterval?.items;
  if (!data) {
    return [];
  }
  return processKlineData(data);
};
