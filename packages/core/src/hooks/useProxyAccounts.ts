import { useQuery } from "@tanstack/react-query";
import { ExtensionAccount } from "@polkadex/react-providers";

import {
  UserAddressTuple,
  getAllProxyAccounts,
} from "../providers/user/profile";
import { QUERY_KEYS } from "../constants";

export const useProxyAccounts = (extensionAccounts: ExtensionAccount[]) => {
  const {
    data: proxiesAccounts,
    isError: proxiesHasError,
    isLoading: proxiesLoading,
    isSuccess: proxiesSuccess,
    isFetching,
    status: proxiesStatus,
  } = useQuery<UserAddressTuple[]>({
    queryKey: QUERY_KEYS.proxyAccounts(),
    queryFn: async () =>
      await getAllProxyAccounts(
        extensionAccounts.map(({ address }) => address)
      ),
  });

  return {
    allProxiesAccounts: proxiesAccounts || [],
    proxiesHasError,
    proxiesLoading: proxiesLoading && isFetching,
    proxiesSuccess,
    proxiesStatus,
  };
};
