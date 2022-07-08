import { call, put } from "redux-saga/effects";
import { API } from "aws-amplify";

import { sendError } from "../../../";
import { klineData, klineError, KlineFetch } from "../actions";

import { getKlinesbyMarketInterval } from "@polkadex/orderbook/graphql/queries";

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

    const convertedData = data.map((x) => ({
      timestamp: new Date(x.t).getTime(),
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
  const res: any = await API.graphql({
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
