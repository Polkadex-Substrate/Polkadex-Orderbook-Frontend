import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { sortOrdersDescendingTime } from "../helpers";
import { useSettingsProvider } from "../providers/public/settings";
import { useProfile } from "../providers/user/profile";
import { appsyncOrderbookService } from "../utils/orderbookService";
import { QUERY_KEYS } from "../constants";
import { Ifilters } from "../providers/types";

export const useOpenOrders = (
  filters?: Ifilters,
  basedOnFundingAccount?: boolean
) => {
  const { onHandleError } = useSettingsProvider();
  const {
    selectedAddresses: { tradeAddress, mainAddress },
  } = useProfile();

  const address = useMemo(
    () => (basedOnFundingAccount ? mainAddress : tradeAddress),
    [basedOnFundingAccount, mainAddress, tradeAddress]
  );

  const shouldFetchOpenOrders = Boolean(address?.length > 0);

  const {
    data: openOrders,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: QUERY_KEYS.openOrders(address, basedOnFundingAccount),
    enabled: shouldFetchOpenOrders,
    queryFn: async () => {
      return await appsyncOrderbookService.query.getOpenOrders({
        address,
        basedOnFundingAccount,
      });
    },
    initialData: [],
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "";
      onHandleError(errorMessage);
    },
  });

  const filteredOpenOrders = useMemo(() => {
    let openOrdersList = sortOrdersDescendingTime(openOrders);

    if (filters?.onlyBuy && filters.onlySell) {
      // Nothing to do
    } else if (filters?.onlyBuy) {
      openOrdersList = openOrdersList.filter(
        (data) => data.side?.toUpperCase() === "BID"
      );
    } else if (filters?.onlySell) {
      openOrdersList = openOrdersList.filter(
        (data) => data.side?.toUpperCase() === "ASK"
      );
    }

    return openOrdersList;
  }, [filters?.onlyBuy, filters?.onlySell, openOrders]);

  return {
    openOrders: filteredOpenOrders,
    isLoading: !shouldFetchOpenOrders || isLoading || isFetching,
  };
};
