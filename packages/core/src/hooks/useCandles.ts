import { useMutation } from "@tanstack/react-query";

import { appsyncOrderbookService } from "../utils/orderbookService";
import { useSettingsProvider } from "../providers/public/settings";
import {
  getAbsoluteResolution,
  getResolutionInMilliSeconds,
  processKlineData,
} from "../helpers";
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
      resolution: r,
    }: GetCandleProps): Promise<Bar[]> => {
      const resolution = getAbsoluteResolution(r);
      const resolutioninMs = getResolutionInMilliSeconds(resolution);
      const data = await appsyncOrderbookService.query.getCandles({
        market,
        interval: resolution,
        from,
        to,
      });

      let bars = processKlineData(data);

      const currentBucket =
        Math.floor(new Date().getTime() / resolutioninMs) * resolutioninMs;

      // Remove items which have greater time than current time
      let i = 0;
      while (i < bars.length && bars[i].time > currentBucket) {
        i++;
      }

      bars = bars.splice(i);
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
