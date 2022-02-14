// TODO!: Verify and Clean code

import axios from "axios";

import { LibrarySymbolInfo } from "../../../../../public/charting_library/datafeed-api";

import { TradingApiResponse } from "./types";

import { defaultConfig } from "@polkadex/orderbook-config";
import { Market } from "@polkadex/orderbook-modules";
import { buildQueryString, getTimestampPeriod } from "@polkadex/web-helpers";
import { resolutionForPayload, resolutionToSeconds } from "@polkadex/orderbook/v2/helpers";

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

const config = {
  supports_timescale_marks: true,
  supports_time: false,
  supported_resolutions: ["1", "5", "30", "60", "240", "720", "1d", "1w", "1M"],
};

export const dataFeedObject = (tradeViewApi: any, markets: Market[]) => {
  const { getTimescaleMarks, subscribeBars, unsubscribeBars, onRealtimeCallback } =
    tradeViewApi;
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
        description: symbol.name,
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
        .post<TradingApiResponse>(url, payload as any)
        .then(({ data }) => {
          if (data.Fine.length < 1) {
            return onHistoryCallback([], { noData: true });
          }
          const bars = data.Fine.map(({ open, close, high, low, volume, time }) => {
            return {
              time: new Date(time).getTime(),
              open,
              close,
              high,
              low,
              volume,
            };
          });

          return onHistoryCallback(bars, { noData: false });
        })
        .catch((e) => {
          return onHistoryCallback([], { noData: true });
        });
    },
    getTimescaleMarks,

    subscribeBars,
    unsubscribeBars,
    onRealtimeCallback,
  };

  return dataFeed;
};
