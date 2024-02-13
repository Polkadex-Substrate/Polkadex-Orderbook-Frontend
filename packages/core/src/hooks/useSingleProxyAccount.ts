import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../constants";
import { appsyncOrderbookService } from "../utils/orderbookService";

export const useSingleProxyAccount = (mainAccount: string) => {
  const { data, isLoading, isSuccess, isFetching } = useQuery({
    queryKey: QUERY_KEYS.singleProxyAccounts(mainAccount),
    enabled: !!mainAccount,
    queryFn: async () => {
      return await appsyncOrderbookService.query.getTradingAddresses(
        mainAccount
      );
    },
  });

  return {
    mainProxiesAccounts: data || [],
    mainProxiesLoading: isLoading && isFetching,
    mainProxiesSuccess: isSuccess,
  };
};
