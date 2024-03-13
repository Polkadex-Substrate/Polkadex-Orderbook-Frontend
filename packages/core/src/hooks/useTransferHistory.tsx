import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS, SUBSCAN_PER_PAGE_LIMIT } from "@orderbook/core/constants";
import { SUBSCAN_GETTERS } from "@orderbook/core/helpers/subscan";

export const useTransferHistory = (
  apiKey: string,
  address: string,
  shouldFetch: boolean,
  PER_PAGE_LIMIT?: number
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.blockchainTransfers(
      address,
      PER_PAGE_LIMIT ?? SUBSCAN_PER_PAGE_LIMIT
    ),
    queryFn: async ({ pageParam = 0 }) => {
      const data = await SUBSCAN_GETTERS.fetchTransfers(
        apiKey,
        address,
        pageParam,
        PER_PAGE_LIMIT ?? SUBSCAN_PER_PAGE_LIMIT
      );
      return data.data;
    },
    enabled: shouldFetch,
    getNextPageParam: (lastPage, pages) => {
      // If the last page contains less than required results, don't fetch the next page
      if (
        lastPage?.transfers?.length < (PER_PAGE_LIMIT ?? SUBSCAN_PER_PAGE_LIMIT)
      ) {
        return false;
      }
      // Otherwise, determine the next page number based on the length of allPages
      return pages?.length;
    },
  });
};
