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

      const bars = processKlineData(data);
      bars.reverse();

      // Remove items from last which have zero volume
      let i = bars.length - 1;
      while (i >= 0 && bars[i].volume === 0) {
        bars.pop();
        i--;
      }

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
