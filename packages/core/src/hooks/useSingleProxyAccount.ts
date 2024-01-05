import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../constants";
import { getProxiesLinkedToMain } from "../providers/user/profile";

export const useSingleProxyAccount = (mainAccount: string) => {
  const { data, isLoading, isSuccess, isFetching } = useQuery({
    queryKey: QUERY_KEYS.singleProxyAccounts(mainAccount),
    enabled: !!mainAccount,
    queryFn: async () => {
      const accounts = await getProxiesLinkedToMain(mainAccount);
      return accounts?.proxies;
    },
  });

  return {
    mainProxiesAccounts: data || [],
    mainProxiesLoading: isLoading && isFetching,
    mainProxiesSuccess: isSuccess,
  };
};
