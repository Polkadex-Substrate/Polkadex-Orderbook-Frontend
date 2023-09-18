import { useProfile } from "@orderbook/core/providers/user/profile";
import { useInfiniteQuery } from "react-query";
import { QUERY_KEYS } from "@orderbook/core/constants/queryKeys";
import { SUBSCAN_GETTERS } from "@orderbook/core/helpers/subscan";
import { SUBSCAN_PER_PAGE_LIMIT } from "@orderbook/core/constants";

export const useTransferHistory = (apiKey: string) => {
  const { selectedAccount } = useProfile();
  const mainAddress = selectedAccount?.mainAddress;

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.blockchainTransfers(mainAddress),
    queryFn: async ({ pageParam = 0 }) => {
      const data = await SUBSCAN_GETTERS.fetchTransfers(
        apiKey,
        mainAddress,
        pageParam
      );
      return data.data;
    },
    enabled: mainAddress?.length > 0,
    getNextPageParam: (lastPage, pages) => {
      // If the last page contains less than required results, don't fetch the next page
      if (lastPage.transfers.length < SUBSCAN_PER_PAGE_LIMIT) {
        return false;
      }
      // Otherwise, determine the next page number based on the length of allPages
      return pages.length;
    },
  });
};
