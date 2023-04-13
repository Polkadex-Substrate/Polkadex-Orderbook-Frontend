import { useReducer } from "react";
import { API } from "aws-amplify";

import * as subscriptions from "../../../graphql/subscriptions";
import { useMarketsProvider } from "../marketsProvider/useMarketsProvider";

import * as A from "./actions";
import { Provider } from "./context";
import { KlineComponent, KlineDbData, KlineEvent } from "./types";
import { initialKlineState, klineReducer } from "./reducer";

import { getKlinesbyMarketInterval } from "@polkadex/orderbook/graphql/queries";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { getResolutionInMilliSeconds } from "@polkadex/orderbook/helpers/klineIntervalHelpers";
import { READ_ONLY_TOKEN } from "@polkadex/web-constants";

export const KlineProvider: KlineComponent = ({ onError, children }) => {
  const [state, dispatch] = useReducer(klineReducer, initialKlineState);
  console.log("kline");

  const fetchKlineAsync = async (
    market: string,
    interval: string,
    from: Date,
    to: Date
  ): Promise<KlineEvent[]> => {
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

  const processKlineData = (data: KlineDbData[]) => {
    console.log(data, "process");

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

  const onHandleKlineFetch = async (payload: A.KlineFetch["payload"]) => {
    try {
      const { market, resolution, from, to } = payload;
      const data = await fetchKlineAsync(market, resolution, from, to);
      dispatch(A.klineData({ list: data, market, interval: resolution }));
    } catch (error) {
      console.log("Kline fetch error", error);
      onError("Kline fetch error");
    }
  };
  const { currentMarket } = useMarketsProvider();
  onHandleKlineFetch({
    market: currentMarket.m,
    resolution: "1m",
    from: new Date(new Date(new Date().setHours(new Date().getHours() - 24))),
    to: new Date(),
  });

  const processKline = (data: any, interval: string): KlineEvent => {
    const kline = {
      open: Number(data.o),
      close: Number(data.c),
      high: Number(data.h),
      low: Number(data.l),
      timestamp: Number(data.t.secs_since_epoch) * 1000,
      volume: Number(data.v_base),
    };
    const close = kline.close;
    const resolution = getResolutionInMilliSeconds(interval);

    const currentBucket = Math.floor(new Date().getTime() / resolution) * resolution;
    if (kline.timestamp < currentBucket) {
      kline.open = close;
      kline.low = close;
      kline.high = close;
      kline.volume = 0;
      kline.timestamp = currentBucket;
    }
    return kline;
  };

  const onFetchKlineChannel = (payload: A.KlineSubscribe["payload"]) => {
    const { market, interval } = payload;
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: `${market}_${interval.toLowerCase()}` },
      authToken: READ_ONLY_TOKEN,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        const dataParsed = JSON.parse(data.value.data.websocket_streams.data);
        const kline = processKline(dataParsed, interval);
        dispatch(
          A.klinePush({
            kline: kline,
            market: data.m,
            interval: data.interval,
          })
        );
      },
      error: (err) => {
        console.warn("error in onCandleStickEvents channel", err);
        onError("error in onCandleStickEvents channel");
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  };

  return (
    <Provider
      value={{
        ...state,
        onHandleKlineFetch,
        onFetchKlineChannel,
      }}>
      {children}
    </Provider>
  );
};
