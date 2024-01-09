import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../constants";
import { appsyncOrderbookService } from "../utils/orderbookService";

export const useExtensionAccountFromBrowserAccount = (address: string) => {
  const { isLoading, isSuccess, data, isError, isFetching } = useQuery({
    queryKey: QUERY_KEYS.extensionAccountFromBrowserAccount(address),
    queryFn: async () =>
      await appsyncOrderbookService.query.getFundingAddress(address),
    enabled: !!address,
  });

  return {
    isLoading: isLoading && isFetching,
    isSuccess,
    isError,
    data,
  };
};
