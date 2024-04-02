import { useMemo, useState } from "react";

export type FeeAssetReserve = {
  poolReserve?: number;
  name: string;
  id: string;
};

export function useTransactionFeeModal() {
  const [openFeeModal, setOpenFeeModal] = useState(false);
  const [tokenFee, setTokenFee] = useState<FeeAssetReserve | null>({
    id: "PDEX",
    name: "PDEX",
  });

  const hasTokenFee = useMemo(
    () => !!Object.keys(tokenFee ?? {}).length,
    [tokenFee]
  );

  const onOpenFeeModal = () => setOpenFeeModal(true);

  return {
    hasTokenFee,
    openFeeModal,
    onOpenFeeModal,
    setOpenFeeModal,
    tokenFee,
    setTokenFee,
  };
}
