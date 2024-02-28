import { useQuery } from "@tanstack/react-query";
import { mnemonicGenerate } from "@polkadot/util-crypto";

import { getAddressFromMnemonic } from "../helpers";
import { useNativeApi } from "../providers/public/nativeApi";
import { useProfile } from "../providers/user/profile";
import { QUERY_KEYS } from "../constants";
import { appsyncOrderbookService } from "../utils/orderbookService";

export const useTradingAccountFee = () => {
  const { api, connected } = useNativeApi();
  const {
    getSigner,
    selectedAddresses: { mainAddress },
  } = useProfile();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: QUERY_KEYS.transactionFee(mainAddress),
    queryFn: async () => {
      if (!api) throw new Error("You are not connected to blockchain ");

      const signer = getSigner(mainAddress);
      if (!signer) throw new Error("signer is not defined");

      const registeredProxies =
        await appsyncOrderbookService.query.getTradingAddresses(mainAddress);

      const mnemonic = mnemonicGenerate();
      const proxyAddress = getAddressFromMnemonic(mnemonic);

      if (registeredProxies.length === 0) {
        const ext = api.tx.ocex.registerMainAccount(proxyAddress);
        return (await ext.paymentInfo(proxyAddress)).partialFee.toHuman();
      } else {
        const ext = api.tx.ocex.addProxyAccount(proxyAddress);
        return (await ext.paymentInfo(proxyAddress)).partialFee.toHuman();
      }
    },
    enabled: api?.isConnected && connected && mainAddress?.length > 0,
    refetchOnMount: false,
  });

  return { txFee: data, txFeeLoading: isLoading || isFetching };
};
