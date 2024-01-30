import { useQuery } from "@tanstack/react-query";
import { supported_resolutions } from "@orderbook/frontend/src/ui/molecules";

import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";
import { appsyncOrderbookService } from "../utils/orderbookService";
import { QUERY_KEYS } from "../constants";
import { useSettingsProvider } from "../providers/public/settings";
import { processKlineData } from "../helpers";

const getAbsoluteResolution = (currentResolution: string) => {
  const getCorrectResolutions = {
    "1": "1m",
    "5": "5m",
    "15": "15m",
    "30": "30m",
    "60": "1h",
    "120": "2h",
    "360": "6h",
  };
  return getCorrectResolutions[currentResolution] || currentResolution;
};

export const useCandles = (
  market: string,
  from: Date,
  to: Date,
  resolution: string
) => {
  const { onHandleError } = useSettingsProvider();
  const { isReady } = useOrderbookService();
  const enabled = Boolean(
    isReady &&
      market?.length > 0 &&
      from &&
      to &&
      supported_resolutions.includes(resolution)
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: QUERY_KEYS.candles(market, from, to, resolution),
    enabled,
    queryFn: async () => {
      const data = await appsyncOrderbookService.query.getCandles({
        market,
        interval: getAbsoluteResolution(resolution),
        from,
        to,
      });

      const klines = processKlineData(data);
      const klinesLength = klines.length;

      const bars = klines.map((bar, index) => {
        return {
          time: bar.timestamp,
          low: bar.low,
          high: bar.high,
          open: bar.open,
          close: bar.close,
          volume: bar.volume,
          isBarClosed: index !== klinesLength - 1,
          isLastBar: index === klinesLength - 1,
        };
      });

      if (bars.length < 1) {
        return [];
      } else {
        return bars;
      }
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
    refetchOnMount: false,
  });

  return {
    candles: data,
    isLoading: isLoading || isFetching,
  };
};
