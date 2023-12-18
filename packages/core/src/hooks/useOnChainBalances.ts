import { useQuery } from "@tanstack/react-query";
import { ApiPromise } from "@polkadot/api";

import { QUERY_KEYS } from "../constants";
import { fetchOnChainBalances } from "../helpers";
import { useSettingsProvider } from "../providers/public/settings";
import { useNativeApi } from "../providers/public/nativeApi";
import { useProfile } from "../providers/user/profile";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

export const useOnChainBalances = (assets: string[]) => {
  const { onHandleError } = useSettingsProvider();
  const { api, connected } = useNativeApi();
  const { isReady } = useOrderbookService();
  const {
    selectedAddresses: { mainAddress },
  } = useProfile();

  const shouldFetchChainBalance = Boolean(
    mainAddress &&
      mainAddress?.length > 0 &&
      api?.isConnected &&
      connected &&
      isReady
  );

  const {
    isLoading,
    isSuccess,
    data: onChainBalances,
    isError,
    isFetching,
    status,
  } = useQuery({
    queryKey: QUERY_KEYS.onChainBalances(mainAddress),
    queryFn: async () =>
      await fetchOnChainBalances(api as ApiPromise, assets, mainAddress),
    enabled: shouldFetchChainBalance,
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
  });

  return {
    isOnChainBalanceLoading: isLoading || isFetching,
    isOnChainBalanceSuccess: isSuccess,
    onChainBalances: onChainBalances,
    isOnChainBalanceError: isError,
    onChainBalanceStatus: status,
  };
};
