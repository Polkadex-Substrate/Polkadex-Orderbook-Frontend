import { MouseEvent, useMemo, useRef } from "react";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import {
  transformAddress,
  useProfile,
} from "@orderbook/core/providers/user/profile";
import { useFormik } from "formik";
import { depositValidationsTest } from "@orderbook/core/validations";
import { isAssetPDEX, trimFloat } from "@orderbook/core/helpers";
import { useDepositProvider } from "@orderbook/core/providers/user/depositProvider";

import * as S from "./styles";

import { LoadingSpinner, Popover, TokenCard, WalletCard } from "@/ui/molecules";
import { Icons, Tokens } from "@/ui/atoms";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

const initialValues = { amount: 0.0 };

export const TransferFormDeposit = ({
  onTransferInteraction,
  onOpenAssets,
  selectedAsset,
}: {
  isDeposit?: boolean;
  onTransferInteraction: () => void;
  onOpenAssets: () => void;
  selectedAsset?: FilteredAssetProps;
}) => {
  const { allAccounts } = useExtensionWallet();
  const { loading, onFetchDeposit } = useDepositProvider();

  const { selectedAccount } = useProfile();

  const { mainAddress } = selectedAccount;

  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress],
  );

  const amountRef = useRef<HTMLInputElement | null>(null);

  const existentialBalance = useMemo(
    () => (isAssetPDEX(selectedAsset?.assetId) ? 1 : 0.1),
    [selectedAsset?.assetId],
  );

  const handleMax = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const onChainBalance = Number(selectedAsset?.onChainBalance);
    if (onChainBalance > existentialBalance) {
      const balance = onChainBalance - existentialBalance;
      const trimmedBalance = trimFloat({ value: balance });
      setFieldValue("amount", trimmedBalance);
    }
    // TODO: Handle Error...
  };
  const {
    handleSubmit,
    resetForm,
    errors,
    getFieldProps,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: depositValidationsTest,
    validateOnBlur: true,
    onSubmit: async ({ amount }) => {
      if (!fundingWallet) return;
      // TODO: Handle Error...

      try {
        const asset = isAssetPDEX(selectedAsset?.assetId)
          ? { polkadex: null }
          : { asset: selectedAsset?.assetId };
        // TODO: Fix asset types

        await onFetchDeposit({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          asset,
          amount: amount,
          mainAccount: fundingWallet,
        });
      } finally {
        resetForm({ values: initialValues });
      }
    },
  });
  return (
    <S.Content onSubmit={handleSubmit}>
      <S.Wallets>
        <WalletCard
          label="From"
          walletTypeLabel="Extension wallet"
          walletType="Funding account"
          walletName={fundingWallet?.account?.meta.name ?? ""}
          walletAddress={transformAddress(
            fundingWallet?.account?.address ?? "",
          )}
        />
        <S.WalletsButton type="button" onClick={onTransferInteraction}>
          <div>
            <Icons.Trading />
          </div>
          <span>Switch</span>
        </S.WalletsButton>
        <WalletCard
          label="To"
          walletTypeLabel="Orderbook wallet"
          walletType="Trading account"
          walletName="Balance available across all trading accounts."
        />
      </S.Wallets>
      <S.Form>
        <TokenCard
          tokenIcon={(selectedAsset?.symbol as keyof typeof Tokens) ?? ""}
          tokenTicker={selectedAsset?.symbol ?? ""}
          availableAmount={selectedAsset?.onChainBalance ?? "0.00"}
          onAction={onOpenAssets}
        />
        <S.Amount onClick={() => amountRef.current?.focus()}>
          <div>
            <Popover placement="top left" isOpen={!!errors.amount}>
              <Popover.Trigger>
                <div />
              </Popover.Trigger>
              <Popover.Content>
                <S.Errors>
                  <div>
                    <Icons.Alert />
                  </div>
                  {errors.amount && <p>{errors.amount}</p>}
                </S.Errors>
              </Popover.Content>
            </Popover>
            <input
              ref={amountRef}
              placeholder="Enter an amount"
              {...getFieldProps("amount")}
            />
            <span>$0.00</span>
          </div>
          <button type="button" onClick={handleMax}>
            MAX
          </button>
        </S.Amount>
      </S.Form>
      <S.Footer>
        <button disabled={!(isValid && dirty) || loading} type="submit">
          <LoadingSpinner
            loading={loading}
            color="white"
            style={{ marginRight: "0.5rem" }}
          >
            Transfer
          </LoadingSpinner>
        </button>
      </S.Footer>
    </S.Content>
  );
};
