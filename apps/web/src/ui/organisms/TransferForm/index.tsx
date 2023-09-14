import { Fragment, MouseEvent, useMemo, useRef } from "react";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import {
  getTradeAccount,
  useTradeWallet,
} from "@orderbook/core/providers/user/tradeWallet";
import {
  transformAddress,
  useProfile,
} from "@orderbook/core/providers/user/profile";
import { useFormik } from "formik";
import { depositValidationsTest } from "@orderbook/core/validations";
import { isAssetPDEX, trimFloat } from "@orderbook/core/helpers";
import { useDepositProvider } from "@orderbook/core/providers/user/depositProvider";

import * as S from "./styles";

import { Popover, Switch, TokenCard, WalletCard } from "@/ui/molecules";
import { Icons, Tokens } from "@/ui/atoms";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const TransferForm = ({
  isDeposit,
  onTransferInteraction,
  onOpenAssets,
  selectedAsset,
}: {
  isDeposit: boolean;
  onTransferInteraction: () => void;
  onOpenAssets: () => void;
  selectedAsset?: FilteredAssetProps;
}) => {
  const { allAccounts } = useExtensionWallet();
  const { allBrowserAccounts } = useTradeWallet();
  const { loading, onFetchDeposit } = useDepositProvider();

  const { selectedAccount, userData } = useProfile();

  const { tradeAddress, mainAddress } = selectedAccount;
  const { userAccounts } = userData;

  const tradingWallet = useMemo(
    () => getTradeAccount(tradeAddress, allBrowserAccounts),
    [allBrowserAccounts, tradeAddress],
  );

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
    // TODO?: Handle Error...
  };
  const {
    touched,
    handleSubmit,
    errors,
    getFieldProps,
    values,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues: {
      amount: "0.0",
      isDeposit: true,
    },
    validationSchema: depositValidationsTest,
    validateOnBlur: true,
    onSubmit: ({ amount, isDeposit }) => {
      if (!fundingWallet) return;
      // TODO?: Handle Error...

      const asset = isAssetPDEX(selectedAsset?.assetId)
        ? { polkadex: null }
        : { asset: selectedAsset?.assetId };

      if (isDeposit) {
        onFetchDeposit({
          // TODO: Fix asset types
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          asset,
          amount: amount,
          mainAccount: fundingWallet,
        });
      }
    },
  });
  return (
    <S.Main>
      <S.Header>
        <Switch
          isActive={values.isDeposit}
          onChange={() => setFieldValue("isDeposit", !values.isDeposit)}
        />
        <span>Transfer for other Polkadex accounts</span>
      </S.Header>
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
          <S.WalletsButton
            isDeposit={isDeposit}
            type="button"
            onClick={onTransferInteraction}
          >
            <div>
              <Icons.Trading />
            </div>
            <span>Switch</span>
          </S.WalletsButton>
          <WalletCard
            label="To"
            walletTypeLabel="Orderbook wallet"
            walletType="Trading account"
            walletName={tradingWallet?.meta.name ?? ""}
            walletAddress={transformAddress(tradingWallet?.address ?? "")}
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
                    {touched.amount && errors.amount && <p>{errors.amount}</p>}
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
            Transfer
          </button>
        </S.Footer>
      </S.Content>
    </S.Main>
  );
};
