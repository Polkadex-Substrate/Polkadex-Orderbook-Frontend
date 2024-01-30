import { useMutation } from "@tanstack/react-query";

import { appsyncOrderbookService } from "../utils/orderbookService";
import { useSettingsProvider } from "../providers/public/settings";
import { getAbsoluteResolution, processKlineData } from "../helpers";
import { Bar } from "../utils/charting_library";

type GetCandleProps = {
  market: string;
  from: Date;
  to: Date;
  resolution: string;
};

export const useCandles = () => {
  const { onHandleError } = useSettingsProvider();

  const { mutateAsync } = useMutation({
    mutationFn: async ({
      market,
      from,
      to,
      resolution,
    }: GetCandleProps): Promise<Bar[]> => {
      const data = await appsyncOrderbookService.query.getCandles({
        market,
        interval: getAbsoluteResolution(resolution),
        from,
        to,
      });

      const klines = processKlineData(data);
      const klinesLength = klines.length;

      const bars: Bar[] = klines.map((bar, index) => {
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
      bars.reverse();
      return bars || [];
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
  });

  return {
    fetchCandles: mutateAsync,
  };
};
