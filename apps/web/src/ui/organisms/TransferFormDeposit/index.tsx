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
import { depositValidations } from "@orderbook/core/validations";
import { isAssetPDEX, trimFloat } from "@orderbook/core/helpers";
import { useDepositProvider } from "@orderbook/core/providers/user/depositProvider";
import { useTranslation } from "react-i18next";

import * as S from "./styles";
import * as T from "./types";

import { Loading, Popover, TokenCard, WalletCard } from "@/ui/molecules";
import { Icons, Tokens } from "@/ui/atoms";

const initialValues = { amount: 0.0 };

export const TransferFormDeposit = ({
  onTransferInteraction,
  onOpenAssets,
  selectedAsset,
}: T.Props) => {
  const { t } = useTranslation("transfer");

  const { allAccounts } = useExtensionWallet();
  const { loading, onFetchDeposit } = useDepositProvider();
  const { selectedAccount } = useProfile();

  const { mainAddress } = selectedAccount;

  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const amountRef = useRef<HTMLInputElement | null>(null);

  const isPolkadexToken = useMemo(
    () => isAssetPDEX(selectedAsset?.assetId),
    [selectedAsset?.assetId]
  );

  const existentialBalance = useMemo(
    () => (isPolkadexToken ? 1 : 0.1),
    [isPolkadexToken]
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

  const fundingWalletName = fundingWallet?.account?.meta.name ?? "";
  const fundingWalletAddress = useMemo(
    () => transformAddress(fundingWallet?.account?.address ?? ""),
    [fundingWallet?.account?.address]
  );

  const {
    touched,
    values,
    handleSubmit,
    resetForm,
    errors,
    getFieldProps,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: depositValidations(
      Number(selectedAsset?.onChainBalance) ?? 0,
      isPolkadexToken,
      existentialBalance
    ),
    validateOnBlur: true,
    onSubmit: async ({ amount }) => {
      if (!fundingWallet) return;
      // TODO: Handle Error...

      try {
        const address = fundingWallet.account.address;

        const asset: T.GenericAsset = isPolkadexToken
          ? { polkadex: null }
          : { asset: selectedAsset?.assetId || null };

        // TODO: Fix types or Handle Error
        if (!address || !fundingWallet) return;

        await onFetchDeposit({
          asset,
          amount,
          account: fundingWallet,
        });
      } finally {
        resetForm({ values: initialValues });
      }
    },
  });

  return (
    <Loading
      style={{ maxWidth: "100rem" }}
      isVisible={loading}
      hasBg={false}
      message=""
      spinner="Keyboard"
    >
      <S.Content onSubmit={handleSubmit}>
        <S.Wallets>
          <WalletCard
            label={t("from")}
            walletType={t("funding.type")}
            walletName={fundingWalletName}
            walletAddress={fundingWalletAddress}
          />
          <S.WalletsButton type="button" onClick={onTransferInteraction}>
            <div>
              <Icons.Trading />
            </div>
            <span>{t("switch")}</span>
          </S.WalletsButton>
          <WalletCard
            label={t("to")}
            walletType={t("trading.type")}
            walletName={t("trading.message")}
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
              <Popover
                placement="top left"
                isOpen={!!touched.amount && !!errors.amount && !!values.amount}
              >
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
                autoComplete="off"
                placeholder={t("amountPlaceholder")}
                {...getFieldProps("amount")}
              />
            </div>
            <button type="button" onClick={handleMax}>
              {t("maxButton")}
            </button>
          </S.Amount>
        </S.Form>
        <S.Footer>
          <button disabled={!(isValid && dirty) || loading} type="submit">
            {t("transferButton")}
          </button>
        </S.Footer>
      </S.Content>
    </Loading>
  );
};
