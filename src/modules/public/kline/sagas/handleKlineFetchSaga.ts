import { call, put } from "redux-saga/effects";

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
  t: string;
};

export function* handleKlineFetchSaga(action: KlineFetch) {
  try {
    const { market, resolution, from, to } = action.payload;
    const data: KlineDbData[] = yield call(() =>
      fetchKlineAsync(market, resolution, from, to)
    );
    const convertedData = processKlineData(data);
    yield put(klineData({ list: convertedData, market, interval: resolution }));
  } catch (error) {
    console.log("got kline fetch error", error);
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
  const res: any = await sendQueryToAppSync({
    query: getKlinesbyMarketInterval,
    variables: {
      market,
      interval,
      from: from.toISOString(),
      to: to.toISOString(),
    },
  });
  return res.data.getKlinesbyMarketInterval.items;
};

const processKlineData = (data: any[]) => {
  const klinesData = data.map((x) => ({
    timestamp: Number(x.t.split(",")[0].split("=")[1]) * 1000,
    open: Number(x.o),
    high: Number(x.h),
    low: Number(x.l),
    close: Number(x.c),
    volume: Number(x.vb),
  }));
  // if volume is 0, take previous close as candle
  klinesData.forEach((elem, idx) => {
    if (idx === 0) {
      return;
    }
    if (!elem.volume) {
      elem.low = klinesData[idx - 1].close;
      elem.high = klinesData[idx - 1].close;
      elem.close = klinesData[idx - 1].close;
      elem.open = klinesData[idx - 1].close;
      elem.volume = 0;
    }
  });
  return klinesData;
};
