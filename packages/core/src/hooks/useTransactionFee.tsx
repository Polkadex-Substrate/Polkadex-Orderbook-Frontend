import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ApiPromise } from "@polkadot/api";
import { formatBalance } from "@polkadot/util";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";

import { useNativeApi } from "../providers/public/nativeApi";
import { QUERY_KEYS } from "../constants";
import { useConnectWalletProvider } from "../providers/user/connectWalletProvider";

export type Keys = ApiPromise["tx"]["ocex"];

export interface TransactionExtrensic<T extends keyof Keys> {
  extrinsic: keyof Keys;
  customProps: Parameters<Keys[T]>;
}
export function useTransactionFee<Name extends keyof Keys>({
  extrinsic,
  customProps,
}: TransactionExtrensic<Name>) {
  const { connected, api } = useNativeApi();

  const { selectedWallet } = useConnectWalletProvider();
  const enabled = useMemo(
    () =>
      !!connected &&
      !!extrinsic &&
      !!customProps.length &&
      !!selectedWallet?.address,
    [extrinsic, connected, customProps, selectedWallet?.address]
  );

  const { data, isLoading, isFetching, isSuccess } = useQuery({
    enabled,
    refetchOnMount: false,
    queryKey: [QUERY_KEYS.transactionFee(selectedWallet?.address ?? "")],
    queryFn: async () => {
      if (!api) throw new Error("You are not connected to blockchain ");
      const extrinsicFn: SubmittableExtrinsic<"promise", ISubmittableResult> =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        api.tx.ocex[extrinsic as any](...customProps);
      const res = await extrinsicFn.paymentInfo(selectedWallet?.address ?? "");
      const fee = formatBalance(res.partialFee.toNumber(), {
        decimals: 12,
        withSi: false,
        forceUnit: "-",
      });
      const data = extrinsicFn.meta.toHuman();

      const hash = extrinsicFn.hash.toString();
      const extrinsicName = data.name?.toString();
      const palletName = data.docs?.[0].toString();

      return {
        fee: Number(fee),
        hash: hash,
        extrinsicName: extrinsicName,
        palletName: palletName,
      };
    },
  });

  return {
    txFee: data,
    txSuccess: isSuccess,
    txFeeLoading: isLoading || isFetching,
  };
}
