import { useCallback, useReducer } from "react";
import { API } from "aws-amplify";
import { reverse } from "d3-array";

import { useSettingsProvider } from "../settings";

import * as A from "./actions";
import { Provider } from "./context";
import { KlineComponent, KlineEvent } from "./types";
import { initialKlineState, klineReducer } from "./reducer";
import { getAbsoluteResolution } from "./helper";

import * as subscriptions from "@/graphql/subscriptions";
import {
  getCorrectTimestamp,
  fetchKlineAsync,
  getResolutionInMilliSeconds,
} from "@/helpers";
import { READ_ONLY_TOKEN } from "@/constants";

export const KlineProvider: KlineComponent = ({ children }) => {
  const [state, dispatch] = useReducer(klineReducer, initialKlineState);
  const { onHandleError } = useSettingsProvider();

  const onHandleKlineFetch = useCallback(
    async (payload: A.KlineFetch["payload"]): Promise<KlineEvent[]> => {
      dispatch(A.klineFetch(payload));
      try {
        const { market, resolution: currentResolution, from, to } = payload;
        const resolution = getAbsoluteResolution(currentResolution);
        const data = await fetchKlineAsync(market, resolution, from, to);
        dispatch(A.klineData({ list: data, market, interval: resolution }));
        const klineData = reverse(data);
        klineData.pop();
        return klineData;
      } catch (error) {
        console.log("Kline fetch error", error);
        onHandleError("Kline fetch error");
      }
    },
    [onHandleError],
  );
  // for testing kline provider , will be integrating with the UI  once trading view purchase is completed
  // const { currentMarket } = useMarketsProvider();
  // onHandleKlineFetch({
  //   market: currentMarket.m,
  //   resolution: "1m",
  //   from: new Date(new Date(new Date().setHours(new Date().getHours() - 24))),
  //   to: new Date(),
  // });

  const processKline = (data: any, interval: string): KlineEvent => {
    const kline = {
      open: Number(data.o),
      close: Number(data.c),
      high: Number(data.h),
      low: Number(data.l),
      timestamp: getCorrectTimestamp(data.t),
      volume: Number(data.vb),
    };
    const close = kline.close;
    const resolution = getResolutionInMilliSeconds(interval);

    const currentBucket =
      Math.floor(new Date().getTime() / resolution) * resolution;
    if (kline.timestamp < currentBucket) {
      kline.open = close;
      kline.low = close;
      kline.high = close;
      kline.volume = 0;
      kline.timestamp = currentBucket;
    }
    return kline;
  };

  const onFetchKlineChannel = useCallback(
    (payload: A.KlineSubscribe["payload"]) => {
      dispatch(A.klineSubscribe(payload));
      const { market, interval, onUpdateTradingViewRealTime } = payload;
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
              market: dataParsed.m,
              interval,
            }),
          );
          onUpdateTradingViewRealTime({
            time: kline.timestamp,
            low: kline.low,
            high: kline.high,
            open: kline.open,
            close: kline.close,
            volume: kline.volume,
          });
        },
        error: (err) => {
          console.warn("error in onCandleStickEvents channel", err);
          onHandleError("error in onCandleStickEvents channel");
        },
      });
      return () => {
        subscription.unsubscribe();
      };
    },
    [onHandleError],
  );

  return (
    <Provider
      value={{
        ...state,
        onHandleKlineFetch,
        onFetchKlineChannel,
      }}
    >
      {children}
    </Provider>
  );
};
