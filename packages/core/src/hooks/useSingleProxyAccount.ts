import { useQuery } from "@tanstack/react-query";

import { getProxiesLinkedToMain } from "../providers/user/profile";

export const useSingleProxyAccount = (mainAccount: string) => {
  const { data, isLoading, isSuccess, isFetching } = useQuery({
    queryKey: [mainAccount],
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
