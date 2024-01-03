import { MouseEvent, useMemo, useRef } from "react";
import {
  transformAddress,
  useProfile,
} from "@orderbook/core/providers/user/profile";
import { useExtensionAccounts } from "@polkadex/react-providers";
import { useFormik } from "formik";
import { depositValidations } from "@orderbook/core/validations";
import {
  getFundingAccountDetail,
  isAssetPDEX,
  trimFloat,
} from "@orderbook/core/helpers";
import { useDepositProvider } from "@orderbook/core/providers/user/depositProvider";
import { useTranslation } from "next-i18next";
import { useFunds } from "@orderbook/core/index";
import { OTHER_ASSET_EXISTENTIAL } from "@orderbook/core/constants";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import * as S from "./styles";
import * as T from "./types";

import { Loading, Popover, TokenCard, WalletCard } from "@/ui/molecules";
import { Icons, Tokens } from "@/ui/atoms";
import { normalizeValue } from "@/utils/normalize";

const initialValues = { amount: 0.0 };

export const TransferFormDeposit = ({
  onTransferInteraction,
  onOpenAssets,
  selectedAsset,
  fundWalletPresent,
}: T.Props) => {
  const { t } = useTranslation("transfer");

  const { extensionAccounts: allAccounts } = useExtensionAccounts();
  const { loading, onFetchDeposit } = useDepositProvider();
  const { selectedAddresses } = useProfile();
  const { loading: balancesLoading } = useFunds();
  const { onToogleConnectWallet } = useSettingsProvider();
  const { mainAddress } = selectedAddresses;

  const fundingWallet = useMemo(
    () => getFundingAccountDetail(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const amountRef = useRef<HTMLInputElement | null>(null);

  const isPolkadexToken = useMemo(
    () => isAssetPDEX(selectedAsset?.id),
    [selectedAsset?.id]
  );

  const existentialBalance = useMemo(
    () => (isPolkadexToken ? 1 : OTHER_ASSET_EXISTENTIAL),
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

  const fundingWalletAddress = useMemo(
    () => transformAddress((mainAddress || fundingWallet?.address) ?? ""),
    [mainAddress, fundingWallet?.address]
  );

  const {
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
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async ({ amount }) => {
      if (!fundingWallet) return;
      // TODO: Handle Error...

      try {
        const address = fundingWallet.address;

        const asset: T.GenericAsset = isPolkadexToken
          ? { polkadex: null }
          : { asset: selectedAsset?.id || null };

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

  const buttonMessage = fundWalletPresent ? "transferButton" : "userButton";

  return (
    <Loading
      style={{ maxWidth: normalizeValue(100) }}
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
            walletName={fundingWallet?.name ?? "Wallet not present"}
            walletAddress={fundingWalletAddress}
            hasUser={fundWalletPresent}
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
            hasUser
          />
        </S.Wallets>
        <S.Form>
          <TokenCard
            tokenIcon={(selectedAsset?.ticker as keyof typeof Tokens) ?? ""}
            tokenTicker={selectedAsset?.ticker ?? ""}
            availableAmount={selectedAsset?.onChainBalance ?? "0.00"}
            onAction={() => onOpenAssets(resetForm)}
            loading={balancesLoading}
          />
          <S.Amount onClick={() => amountRef.current?.focus()}>
            <div>
              <Popover
                placement="top left"
                isOpen={!!errors.amount && !!values.amount}
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
                disabled={!fundWalletPresent}
                {...getFieldProps("amount")}
              />
            </div>
            <button
              disabled={!fundWalletPresent}
              type="button"
              onClick={handleMax}
            >
              {t("maxButton")}
            </button>
          </S.Amount>
        </S.Form>
        <S.Footer hasUser={fundWalletPresent}>
          <button
            type={fundWalletPresent ? "submit" : "button"}
            disabled={
              fundWalletPresent ? !(isValid && dirty) || loading : false
            }
            onClick={
              fundWalletPresent ? undefined : () => onToogleConnectWallet()
            }
          >
            {t(buttonMessage)}
          </button>
        </S.Footer>
      </S.Content>
    </Loading>
  );
};
