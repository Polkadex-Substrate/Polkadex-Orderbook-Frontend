import { sendQueryToAppSync } from "./appsync";
import { processKlineData } from "./processKlineData";

import { getKlinesbyMarketInterval } from "@/graphql/queries";
import { KlineDbData, KlineEvent } from "@/providers/public/klineProvider";

export const fetchKlineAsync = async (
  market: string,
  interval: string,
  from: Date,
  to: Date,
): Promise<KlineEvent[]> => {
  if (!market) {
    return [];
  }
  const res = await sendQueryToAppSync({
    query: getKlinesbyMarketInterval,
    variables: {
      market,
      interval,
      from: from.toISOString(),
      to: to.toISOString(),
    },
  });
  const data: KlineDbData[] = res.data?.getKlinesbyMarketInterval?.items;
  if (!data) {
    return [];
  }
  return processKlineData(data);
};
