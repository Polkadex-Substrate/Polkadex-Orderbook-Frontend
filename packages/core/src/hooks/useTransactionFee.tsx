import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { formatBalance } from "@polkadot/util";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";

import { useNativeApi } from "../providers/public/nativeApi";
import { QUERY_KEYS } from "../constants";
import { useConnectWalletProvider } from "../providers/user/connectWalletProvider";

export interface TransactionFeeProps {
  extrinsicFn: () => SubmittableExtrinsic<"promise", ISubmittableResult>;
  sender: string;
}

const intiialData = {
  fee: 0,
  hash: "",
  extrinsicName: "",
  palletName: "",
};
export function useTransactionFee({
  extrinsicFn,
  sender,
}: TransactionFeeProps) {
  const { connected, api } = useNativeApi();

  const { selectedWallet } = useConnectWalletProvider();

  const enabled = useMemo(
    () =>
      !!connected &&
      !!extrinsicFn &&
      typeof extrinsicFn === "function" &&
      !!selectedWallet?.address,
    [connected, selectedWallet?.address, extrinsicFn]
  );

  const { data, isLoading, isFetching, isSuccess } = useQuery({
    enabled,
    queryKey: [
      QUERY_KEYS.transactionFees(
        selectedWallet?.address ?? "",
        extrinsicFn.toString()
      ),
    ],
    queryFn: async () => {
      if (!extrinsicFn) throw new Error("No Extrinsic");
      if (!api) throw new Error("You are not connected to blockchain");
      const extrinsic = extrinsicFn();
      const res = await extrinsic.paymentInfo(sender);
      const fee = formatBalance(res.partialFee.toNumber(), {
        decimals: 12,
        withSi: false,
        forceUnit: "-",
      });

      const data = extrinsic.meta.toHuman();
      const hash = extrinsic.hash.toString();
      const extrinsicName = data?.name?.toString();
      const docs = data.docs as string[];
      const palletName = docs?.[0] ?? "";

      return {
        fee: Number(fee),
        hash: hash,
        extrinsicName: extrinsicName,
        palletName: palletName,
      };
    },
  });

  return {
    ...(data ?? intiialData),
    success: isSuccess,
    loading: isLoading || isFetching,
  };
}
