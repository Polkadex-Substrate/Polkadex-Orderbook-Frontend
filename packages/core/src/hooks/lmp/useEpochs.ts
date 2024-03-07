import { useQuery } from "@tanstack/react-query";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";

import { QUERY_KEYS } from "../..";

export const useEpochs = () => {
  const { api, lmp } = useNativeApi();
  const enabled = !!api && api?.isConnected && !!lmp;

  const { data, status } = useQuery({
    queryKey: QUERY_KEYS.epochs(),
    queryFn: async () => {
      if (!api?.isConnected || !lmp) return;

      const currentEpoch = await lmp.queryCurrentEpoch();
      const nextEpoch = currentEpoch + 1;

      const prevEpochs: number[] = [];
      for (let i = currentEpoch - 1; i >= 0; i--) {
        prevEpochs.push(i);
        if (prevEpochs.length === 8) break;
      }
      prevEpochs.reverse();

      const allEpochs = prevEpochs.concat([currentEpoch, nextEpoch]);

      const res = allEpochs.map((epoch) => {
        let status: string;

        if (epoch < currentEpoch) status = "Ended";
        else if (epoch === currentEpoch) status = "Ongoing";
        else status = "Upcoming";

        return {
          epoch,
          from: "1 Mar",
          to: "28 Mar",
          status,
          duration: "28 days",
        };
      });

      return res;
    },
    enabled,
  });
  return {
    epochs: data,
    isLoading: status === "loading",
  };
};
