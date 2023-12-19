import { MouseEvent, useMemo, useRef, useState } from "react";
import {
  transformAddress,
  useProfile,
} from "@orderbook/core/providers/user/profile";
import { useFormik } from "formik";
import { depositValidations } from "@orderbook/core/validations";
import {
  getFundingAccountDetail,
  isAssetPDEX,
  trimFloat,
} from "@orderbook/core/helpers";
import { useAssetTransfer, useFunds } from "@orderbook/core/hooks";
import { useTranslation } from "next-i18next";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { OTHER_ASSET_EXISTENTIAL } from "@orderbook/core/constants";
import {
  useExtensionAccounts,
  ExtensionAccount,
} from "@polkadex/react-providers";

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
import { normalizeValue } from "@/utils/normalize";

const initialValues = { amount: 0.0 };

export const TransferForm = ({
  onOpenAssets,
  selectedAsset,
  switchEnable,
  onDisableSwitch,
  onRefetch,
}: T.Props) => {
  const { t } = useTranslation("transfer");

  const { extensionAccounts: allAccounts } = useExtensionAccounts();
  const {
    selectedAddresses,
    onUserSelectTradingAddress,
    allAccounts: userAccounts,
  } = useProfile();
  const { loading, onChangeChainBalance } = useFunds();

  // TODO: Check why isLoading is not working in mutateAsync - using switchEnable as loading checker
  const { mutateAsync, isLoading } = useAssetTransfer(onRefetch);
  const { mainAddress } = selectedAddresses;

  const fundingWallet = useMemo(
    () => getFundingAccountDetail(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const allFilteresAccounts = useMemo(
    () =>
      allAccounts.filter(
        ({ address }) => userAccounts?.find((v) => v.mainAddress === address)
      ),
    [allAccounts, userAccounts]
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

  const fundingWalletName = fundingWallet?.name ?? "";

  const [selectedWallet, setSelectedWallet] = useState<
    ExtensionAccount | CustomAddress
  >();

  const [toQuery, setToQuery] = useState("");

  const filteredWallets: ExtensionAccount[] | CustomAddress[] = useMemo(() => {
    if (toQuery === "") return allAccounts;

    const filteredAccounts = allAccounts?.filter(({ address, name }) => {
      const queryRes = toQuery.toLowerCase();
      return (
        address.toLowerCase().includes(queryRes) ||
        name?.toLowerCase().includes(queryRes)
      );
    });

    if (filteredAccounts.length) return filteredAccounts;

    const customAddress = {
      address: toQuery,
    };

    setSelectedWallet(customAddress);
    return [...allAccounts, customAddress];
  }, [toQuery, allAccounts]);

  const toAccountAddress = useMemo(
    () => transformAddress(selectedWallet?.address ?? "", 20),
    [selectedWallet?.address]
  );

  const [fromQuery, setFromQuery] = useState("");
  const filteredFundingWallets: ExtensionAccount[] = useMemo(() => {
    const queryRes = allFilteresAccounts?.filter(({ address, meta }) => {
      return (
        address?.toLowerCase().includes(fromQuery) ||
        meta?.name?.toLowerCase().includes(fromQuery)
      );
    });

    if (fromQuery === "" || !queryRes?.length) return allFilteresAccounts;
    return queryRes;
  }, [fromQuery, allFilteresAccounts]);

  const fromAccountAddress = useMemo(
    () => transformAddress(fundingWallet?.address ?? "", 20),
    [fundingWallet?.address]
  );

  const isValidAddress = useMemo(() => {
    const address = selectedWallet?.address;
    try {
      encodeAddress(
        isHex(selectedWallet?.address)
          ? hexToU8a(address)
          : decodeAddress(address)
      );
      return true;
    } catch {
      return false;
    }
  }, [selectedWallet?.address]);

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
        const address = selectedWallet?.address;

        const asset: T.GenericAsset = isPolkadexToken
          ? { polkadex: null }
          : { asset: selectedAsset?.id || null };

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
        const asset = isPolkadexToken ? "PDEX" : selectedAsset?.id || "PDEX";
        onChangeChainBalance(asset);
      }
    },
  });

  return (
    <Loading
      style={{ maxWidth: normalizeValue(100) }}
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
                const account = userAccounts?.find(
                  (v) => v.mainAddress === e?.address
                );
                // TODO: Fix types
                if (account) onUserSelectTradingAddress(account);
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
            tokenIcon={(selectedAsset?.ticker as keyof typeof Tokens) ?? ""}
            tokenTicker={selectedAsset?.ticker ?? ""}
            availableAmount={selectedAsset?.onChainBalance ?? "0.00"}
            onAction={() => onOpenAssets(resetForm)}
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
