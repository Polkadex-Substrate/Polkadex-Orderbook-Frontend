import { MouseEvent, useMemo, useRef, useState } from "react";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import {
  getTradeAccount,
  selectTradeAccount,
  useTradeWallet,
} from "@orderbook/core/providers/user/tradeWallet";
import {
  transformAddress,
  useProfile,
} from "@orderbook/core/providers/user/profile";
import { useFormik } from "formik";
import { withdrawValidations } from "@orderbook/core/validations";
import { isAssetPDEX, trimFloat } from "@orderbook/core/helpers";
import { useWithdrawsProvider } from "@orderbook/core/providers/user/withdrawsProvider";
import { useTryUnlockTradeAccount } from "@orderbook/core/index";
import { useTranslation } from "react-i18next";
import { useBalancesProvider } from "@orderbook/core/providers/user/balancesProvider";

import { UnlockModal } from "../UnlockModal";

import * as S from "./styles";

import { Loading, Popover, TokenCard, WalletCard } from "@/ui/molecules";
import { Icons, Tokens } from "@/ui/atoms";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

const initialValues = { amount: 0.0 };

export const TransferFormWithdraw = ({
  onTransferInteraction,
  onOpenAssets,
  selectedAsset,
}: {
  isDeposit?: boolean;
  onTransferInteraction: () => void;
  onOpenAssets: (callback?: () => void) => void;
  selectedAsset?: FilteredAssetProps;
}) => {
  const { t } = useTranslation("transfer");

  const [showPassword, setShowPassword] = useState(false);

  const { allAccounts } = useExtensionWallet();
  const { allBrowserAccounts } = useTradeWallet();
  const { onFetchWithdraws, loading } = useWithdrawsProvider();
  const { selectedAccount } = useProfile();
  const { loading: balancesLoading } = useBalancesProvider();

  const { tradeAddress, mainAddress } = selectedAccount;

  const tradingWallet = useMemo(
    () => getTradeAccount(tradeAddress, allBrowserAccounts),
    [allBrowserAccounts, tradeAddress]
  );

  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const amountRef = useRef<HTMLInputElement | null>(null);

  const handleMax = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const availableAmount = Number(selectedAsset?.free_balance);
    const trimmedBalance = trimFloat({ value: availableAmount });
    setFieldValue("amount", trimmedBalance);
  };

  const tradingAccountInBrowser = useMemo(
    () => selectTradeAccount(selectedAccount?.tradeAddress, allBrowserAccounts),
    [allBrowserAccounts, selectedAccount?.tradeAddress]
  );

  const {
    values,
    resetForm,
    handleSubmit,
    errors,
    getFieldProps,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: withdrawValidations(selectedAsset?.free_balance ?? "0"),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async ({ amount }) => {
      if (tradingAccountInBrowser?.isLocked) setShowPassword(true);
      else {
        const asset = isAssetPDEX(selectedAsset?.assetId)
          ? "PDEX"
          : selectedAsset?.assetId;
        if (!asset) return;
        // TODO: Handle Error...
        try {
          await onFetchWithdraws({ asset, amount });
        } finally {
          resetForm({ values: initialValues });
        }
      }
    },
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  useTryUnlockTradeAccount(tradingAccountInBrowser);

  return (
    <>
      <UnlockModal
        open={showPassword}
        onClose={() => setShowPassword(false)}
        tradingAccountInBrowser={tradingAccountInBrowser}
        dispatchAction={() =>
          formRef?.current?.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          )
        }
      />
      <Loading
        style={{ maxWidth: "100rem" }}
        isVisible={loading}
        hasBg={false}
        message=""
        spinner="Keyboard"
      >
        <S.Content ref={formRef} onSubmit={handleSubmit}>
          <S.Wallets>
            <WalletCard
              label={t("from")}
              walletType={t("trading.type")}
              walletName={tradingWallet?.meta.name ?? ""}
              walletAddress={transformAddress(tradingWallet?.address ?? "")}
            />
            <S.WalletsButton type="button" onClick={onTransferInteraction}>
              <div>
                <Icons.Trading />
              </div>
              <span>{t("switch")}</span>
            </S.WalletsButton>
            <WalletCard
              label={t("to")}
              walletType={t("funding.type")}
              walletName={fundingWallet?.account?.meta.name ?? ""}
              walletAddress={transformAddress(
                fundingWallet?.account?.address ?? ""
              )}
            />
          </S.Wallets>
          <S.Form>
            <TokenCard
              tokenIcon={(selectedAsset?.symbol as keyof typeof Tokens) ?? ""}
              tokenTicker={selectedAsset?.symbol ?? ""}
              availableAmount={selectedAsset?.free_balance ?? "0.00"}
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
                  placeholder={t("amountPlaceholder")}
                  autoComplete="off"
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
    </>
  );
};
