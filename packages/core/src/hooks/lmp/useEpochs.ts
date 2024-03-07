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

      console.log(allEpochs);

      return allEpochs;
    },
    enabled,
  });
  return { epochs: data, isLoading: status === "loading" };
};
