import { MouseEvent, useMemo, useRef, useState } from "react";
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
import { ExtensionAccount } from "@orderbook/core/providers/types";
import { useAssetTransfer } from "@orderbook/core/hooks";
import { useTranslation } from "react-i18next";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { useBalancesProvider } from "@orderbook/core/providers/user/balancesProvider";

import { CustomAddress } from "../TransferFormWithdraw/types";

import * as S from "./styles";
import * as T from "./types";

import {
  AccountSelect,
  Loading,
  Popover,
  TokenCard,
  WalletCard,
} from "@/ui/molecules";
import { Icons, Tokens } from "@/ui/atoms";

const initialValues = { amount: 0.0 };

export const TransferForm = ({
  onOpenAssets,
  selectedAsset,
  switchEnable,
  onDisableSwitch,
}: T.Props) => {
  const { t } = useTranslation("transfer");

  const { allAccounts } = useExtensionWallet();
  const { selectedAccount, onUserSelectAccount, userData } = useProfile();
  const { loading } = useBalancesProvider();

  // TODO: Check why isLoading is not working in mutateAsync - using switchEnable as loading checker
  const { mutateAsync, isLoading } = useAssetTransfer();
  const { mainAddress } = selectedAccount;

  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const allFilteresAccounts = useMemo(
    () =>
      allAccounts.filter(
        ({ account }) =>
          userData?.userAccounts?.find((v) => v.mainAddress === account.address)
      ),
    [allAccounts, userData?.userAccounts]
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

  const [selectedWallet, setSelectedWallet] = useState<
    ExtensionAccount | CustomAddress
  >();

  const [toQuery, setToQuery] = useState("");

  const filteredWallets: ExtensionAccount[] | CustomAddress[] = useMemo(() => {
    if (toQuery === "") return allAccounts;

    const filteredAccounts = allAccounts?.filter((e) => {
      const { address, meta } = e.account;
      const queryRes = toQuery.toLowerCase();
      return (
        address.toLowerCase().includes(queryRes) ||
        meta?.name?.toLowerCase().includes(queryRes)
      );
    });

    if (filteredAccounts.length) return filteredAccounts;

    const customAddress = {
      account: {
        address: toQuery,
      },
    };

    setSelectedWallet(customAddress);
    return [...allAccounts, customAddress];
  }, [toQuery, allAccounts]);

  const toAccountAddress = useMemo(
    () => transformAddress(selectedWallet?.account?.address ?? "", 20),
    [selectedWallet?.account?.address]
  );

  const [fromQuery, setFromQuery] = useState("");
  const filteredFundingWallets: ExtensionAccount[] = useMemo(() => {
    const queryRes = allFilteresAccounts?.filter((e) => {
      const { address, meta } = e.account;
      return (
        address?.toLowerCase().includes(fromQuery) ||
        meta?.name?.toLowerCase().includes(fromQuery)
      );
    });

    if (fromQuery === "" || !queryRes?.length) return allFilteresAccounts;
    return queryRes;
  }, [fromQuery, allFilteresAccounts]);

  const fromAccountAddress = useMemo(
    () => transformAddress(fundingWallet?.account?.address ?? "", 20),
    [fundingWallet?.account?.address]
  );

  const isValidAddress = useMemo(() => {
    const address = selectedWallet?.account?.address;
    try {
      encodeAddress(
        isHex(selectedWallet?.account?.address)
          ? hexToU8a(address)
          : decodeAddress(address)
      );
      return true;
    } catch {
      return false;
    }
  }, [selectedWallet?.account?.address]);

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
    validateOnBlur: true,
    onSubmit: async ({ amount }) => {
      if (!fundingWallet) return;
      // TODO: Handle Error...

      try {
        const address = selectedWallet?.account?.address;

        const asset: T.GenericAsset = isPolkadexToken
          ? { polkadex: null }
          : { asset: selectedAsset?.assetId || null };

        // TODO: Fix types or Handle Error
        if (!address || !fundingWallet) return;
        onDisableSwitch(true);
        await mutateAsync({
          asset,
          dest: address,
          amount: amount.toString(),
          account: fundingWallet,
        });
      } finally {
        resetForm({ values: initialValues });
        onDisableSwitch();
      }
    },
  });

  return (
    <Loading
      style={{ maxWidth: "100rem" }}
      isVisible={isLoading || switchEnable}
      hasBg={false}
      message=""
      spinner="Keyboard"
    >
      <S.Content onSubmit={handleSubmit}>
        <S.Wallets>
          <WalletCard
            searchable
            label={t("from")}
            walletType={t("funding.type")}
            walletName={fundingWalletName}
            walletAddress={fromAccountAddress}
          >
            <AccountSelect
              pasteable={false}
              selectedAccount={fundingWallet}
              onQuery={(e) => setFromQuery(e)}
              onSelectAccount={(e) => {
                const tradeAddress = userData?.userAccounts?.find(
                  (v) => v.mainAddress === e.account.address
                );
                // TODO: Fix types
                if (tradeAddress) onUserSelectAccount(tradeAddress);
              }}
              data={filteredFundingWallets}
              placeholder={t("funding.betweenPlaceholder")}
            />
          </WalletCard>
          <S.WalletsButton disabled type="button">
            <div>
              <Icons.Trading />
            </div>
            <span>{t("switch")}</span>
          </S.WalletsButton>
          <WalletCard
            searchable
            label={t("to")}
            walletType={t("trading.type")}
            walletName={t("trading.message")}
            walletAddress={toAccountAddress}
          >
            <AccountSelect
              selectedAccount={selectedWallet}
              onQuery={(e) => setToQuery(e)}
              onSelectAccount={setSelectedWallet}
              data={filteredWallets}
              isValidAddress={isValidAddress}
            />
          </WalletCard>
        </S.Wallets>
        <S.Form>
          <TokenCard
            tokenIcon={(selectedAsset?.symbol as keyof typeof Tokens) ?? ""}
            tokenTicker={selectedAsset?.symbol ?? ""}
            availableAmount={selectedAsset?.onChainBalance ?? "0.00"}
            onAction={onOpenAssets}
            loading={loading}
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
                {...getFieldProps("amount")}
              />
            </div>
            <button type="button" onClick={handleMax}>
              {t("maxButton")}
            </button>
          </S.Amount>
        </S.Form>
        <S.Footer>
          <button
            disabled={
              !(isValid && dirty) ||
              isLoading ||
              switchEnable ||
              !isValidAddress
            }
            type="submit"
          >
            {t("transferButton")}
          </button>
        </S.Footer>
      </S.Content>
    </Loading>
  );
};
