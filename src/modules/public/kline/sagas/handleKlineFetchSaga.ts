import { call, put } from "redux-saga/effects";
import { API } from "aws-amplify";

import { sendError } from "../../../";
import { klineData, klineError, KlineFetch } from "../actions";

import { getKlinesbyMarketInterval } from "@polkadex/orderbook/graphql/queries";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

type KlineDbData = {
  m: string;
  interval: string;
  o: string;
  c: string;
  h: string;
  l: string;
  v_base: string;
  v_quote: string;
  time: string;
};

export function* handleKlineFetchSaga(action: KlineFetch) {
  try {
    const { market, resolution, from, to } = action.payload;
    const data: KlineDbData[] = yield call(() =>
      fetchKlineAsync(market, resolution, from, to)
    );
    const convertedData = data.map((x) => ({
      timestamp: Number(x.time),
      open: Number(x.o),
      high: Number(x.h),
      low: Number(x.l),
      close: Number(x.c),
      volume: Number(x.v_base),
    }));
    yield put(klineData({ list: convertedData, market, interval: resolution }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: klineError,
        },
      })
    );
  }
}

const fetchKlineAsync = async (
  market: string,
  interval: string,
  from: Date,
  to: Date
): Promise<KlineDbData[]> => {
  const res: any = await sendQueryToAppSync(getKlinesbyMarketInterval, {
    market,
    interval,
    from: from.toISOString(),
    to: to.toISOString(),
  });
  return res.data.getKlinesbyMarketInterval.items;
};
