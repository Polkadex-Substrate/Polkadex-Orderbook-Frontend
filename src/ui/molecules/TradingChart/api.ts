// TODO: Check kline subscription updates
import axios from "axios";

import { LibrarySymbolInfo } from "../../../../public/charting_library/datafeed-api";

import { TradingChartComponent } from ".";

import { defaultConfig } from "@polkadex/orderbook-config";
import {
  klineArrayToObject,
  KlineState,
  klineUpdatePeriod,
  klineUpdateTimeRange,
  Market,
} from "@polkadex/orderbook-modules";
import {
  buildQueryString,
  getTimestampPeriod,
  periodMinutesToString,
} from "@polkadex/web-helpers";

export interface CurrentKlineSubscription {
  marketId?: string;
  periodString?: string;
}
export const print = (...x) => window.console.log.apply(null, [">>>> TC", ...x]);

const makeHistoryUrl = (market: string, resolution: number, from: number, to: number) => {
  const payload = {
    period: resolution,
    time_from: getTimestampPeriod(from, resolution),
    time_to: getTimestampPeriod(to, resolution),
  };
  let endPoint = `/public/markets/${market}/k-line`;

  if (payload) {
    endPoint = `${endPoint}?${buildQueryString(payload)}`;
  }

  return `${defaultConfig.polkadexHostUrl}${endPoint}`;
};
const makeOHLCVPayload = (
  market: string,
  resolution: string,
  start?: number,
  stop?: number
) => {
  return {
    symbol: market,
    timeframe: resolution,
    timestamp_start: start,
    timestamp_stop: stop,
  };
};
const resolutionToSeconds = (r: string): number => {
  const minutes = parseInt(r, 10);
  if (r === "1D") {
    return 1440;
  } else if (r === "D") {
    return 4320;
  } else if (!isNaN(minutes)) {
    return minutes;
  } else {
    return 1;
  }
};

const resolutionForPayload = (resolution: string): string => {
  const isNum = /^[0-9]+$/.test(resolution);
  if (isNum) {
    const resNum = parseInt(resolution);
    if (resNum < 60) {
      return `${resNum}m`;
    }
    return `${resNum / 60}h`;
  }

  return resolution;
};

const config = {
  supports_timescale_marks: true,
  supports_time: false,
  supported_resolutions: ["1", "5", "30", "60", "240", "720", "1d", "1w", "1M"],
};

let updateCb = null;
export const dataFeedObject = (tradingChart: TradingChartComponent, markets: Market[]) => {
  const dataFeed = {
    onReady: (cb) => {
      setTimeout(() => cb(config), 0);
    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
      const symbols = markets.map((m) => ({
        symbol: m.id,
        full_name: m.name,
        description: m.name,
        exchange: "Cryptobase",
        ticker: m.id,
        type: "bitcoin",
        currency_code: m.quote_unit.toUpperCase(),
      }));
      setTimeout(() => onResultReadyCallback(symbols), 0);
    },
    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
      const symbol = markets.find((m) => m.id === symbolName || m.name === symbolName);

      if (!symbol) {
        return setTimeout(() => onResolveErrorCallback("Symbol not found"), 0);
      }

      const symbolStub = {
        name: symbol.name,
        currency_code: symbol.quote_unit.toUpperCase(),
        description: "Polkadex test tokens",
        type: "bitcoin",
        session: "24x7",
        timezone: "Etc/UTC",
        ticker: symbol.id,
        minmov: 1,
        pricescale: Math.pow(10, symbol.price_precision),
        has_intraday: true,
        intraday_multipliers: ["1", "5", "30", "60", "240", "720", "d", "1w", "1M"],
        supported_resolutions: ["1", "5", "30", "60", "240", "720", "d", "1w", "1M"],
        volume_precision: 4,
        data_status: "streaming",
      };

      return setTimeout(() => onSymbolResolvedCallback(symbolStub), 0);
    },
    getTimescaleMarks: async (
      symbolInfo: LibrarySymbolInfo,
      from,
      to,
      onDataCallback,
      resolution
    ) => {
      const range = tradingChart.tvWidget!.activeChart().getVisibleRange();
      const period = tradingChart.tvWidget!.activeChart().resolution();
      // store.dispatch(klineUpdateTimeRange(range));
      // store.dispatch(klineUpdatePeriod(period));
    },
    getBars: async (
      symbolInfo: LibrarySymbolInfo,
      resolution,
      from,
      to,
      onHistoryCallback,
      onErrorCallback,
      firstDataRequest
    ) => {
      let url = makeHistoryUrl(
        symbolInfo.ticker || symbolInfo.name.toLowerCase(),
        resolutionToSeconds(resolution),
        from,
        to
      );
      url = defaultConfig.influxDBUrl + "/fetchohlcv";
      // TODO: Make paylaod dynamic with symbolInfo
      const payload = makeOHLCVPayload("0-1", resolutionForPayload(resolution), from, to);
      return axios
        .post(url, payload)
        .then(({ data }) => {
          if (data.Fine.length < 1) {
            return onHistoryCallback([], { noData: true });
          }
          const bars = data.Fine.map((el) => {
            return {
              time: new Date(el._time).getTime(),
              open: Number(el.open),
              close: Number(el.close),
              high: Number(el.high),
              low: Number(el.low),
              volume: Number(el.volume),
            };
          });

          return onHistoryCallback(bars, { noData: false });
        })
        .catch((e) => {
          return onHistoryCallback([], { noData: true });
        });
    },
    subscribeBars: (
      symbolInfo: LibrarySymbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID: string,
      onResetCacheNeededCallback
    ) => {
      updateCb = {
        symbolInfo,
        resolution,
        onRealtimeCallback,
      };
      const marketId: string = symbolInfo.ticker!;
      const periodString = periodMinutesToString(resolutionToSeconds(resolution));

      tradingChart.props.subscribeKline({ marketId, period: periodString });
      tradingChart.currentKlineSubscription = {
        marketId,
        periodString,
      };
    },
    unsubscribeBars: (subscribeUID: string) => {
      const { marketId, periodString } = tradingChart.currentKlineSubscription;
      if (marketId && periodString) {
        tradingChart.props.unSubscribeKline({ marketId, period: periodString });
      }
      tradingChart.currentKlineSubscription = {};
    },
    onRealtimeCallback: (kline: KlineState) => {
      console.log("onRealtimeCallback => ", kline);
      if (
        kline.last &&
        kline.marketId === tradingChart.currentKlineSubscription.marketId &&
        kline.period === tradingChart.currentKlineSubscription.periodString
      ) {
        updateCb.onRealtimeCallback(kline.last);
      }
    },
  };

  return dataFeed;
};
