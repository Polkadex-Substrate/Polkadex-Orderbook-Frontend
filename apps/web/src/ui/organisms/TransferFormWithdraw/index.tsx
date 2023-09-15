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
import { depositValidationsTest } from "@orderbook/core/validations";
import { isAssetPDEX, trimFloat } from "@orderbook/core/helpers";
import { useWithdrawsProvider } from "@orderbook/core/providers/user/withdrawsProvider";
import { ExtensionAccount } from "@orderbook/core/providers/types";

import { UnlockModal } from "../UnlockModal";

import * as S from "./styles";
import { CustomAddress } from "./types";

import { AccountSelect, Popover, TokenCard, WalletCard } from "@/ui/molecules";
import { Icons, Tokens } from "@/ui/atoms";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

const initialValues = { amount: 0.0 };

export const TransferFormWithdraw = ({
  onTransferInteraction,
  onOpenAssets,
  selectedAsset,
  otherPolkadexAccount,
}: {
  isDeposit?: boolean;
  onTransferInteraction: () => void;
  onOpenAssets: () => void;
  otherPolkadexAccount: boolean;
  selectedAsset?: FilteredAssetProps;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const { allAccounts } = useExtensionWallet();
  const { allBrowserAccounts } = useTradeWallet();
  const { onFetchWithdraws, loading } = useWithdrawsProvider();
  const { selectedAccount } = useProfile();

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
    resetForm,
    handleSubmit,
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
      if (otherPolkadexAccount) return;

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
  const [selectedPerson, setSelectedPerson] = useState<
    ExtensionAccount | CustomAddress
  >();
  const [query, setQuery] = useState("");

  const filteredExtensionAccounts: ExtensionAccount[] | CustomAddress[] =
    useMemo(() => {
      if (query === "") return allAccounts;

      const filteredAccounts = allAccounts?.filter((e) => {
        const { address, meta } = e.account;
        const queryRes = query.toLowerCase();
        return (
          address.toLowerCase().includes(queryRes) ||
          meta?.name?.toLowerCase().includes(queryRes)
        );
      });

      if (filteredAccounts.length) return filteredAccounts;
      else {
        const customAddress = {
          account: {
            address: query,
          },
        };

        setSelectedPerson(customAddress);
        return [...allAccounts, customAddress];
      }
    }, [query, allAccounts]);
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
      <S.Content onSubmit={handleSubmit}>
        <S.Wallets>
          <WalletCard
            searchable={otherPolkadexAccount}
            label="From"
            walletTypeLabel="Orderbook wallet"
            walletType="Trading account"
            walletName={tradingWallet?.meta.name ?? ""}
            walletAddress={transformAddress(tradingWallet?.address ?? "")}
          />
          <S.WalletsButton type="button" onClick={onTransferInteraction}>
            <div>
              <Icons.Trading />
            </div>
            <span>Switch</span>
          </S.WalletsButton>
          <WalletCard
            searchable={otherPolkadexAccount}
            label="To"
            walletTypeLabel="Extension wallet"
            walletType="Funding account"
            walletName={fundingWallet?.account?.meta.name ?? ""}
            walletAddress={transformAddress(
              fundingWallet?.account?.address ?? ""
            )}
          >
            {otherPolkadexAccount && (
              <AccountSelect
                selectedAccount={selectedPerson}
                onQuery={(e) => setQuery(e)}
                onSelectAccount={setSelectedPerson}
                data={filteredExtensionAccounts}
                loading={false}
              />
            )}
          </WalletCard>
        </S.Wallets>
        <S.Form>
          <TokenCard
            tokenIcon={(selectedAsset?.symbol as keyof typeof Tokens) ?? ""}
            tokenTicker={selectedAsset?.symbol ?? ""}
            availableAmount={selectedAsset?.free_balance ?? "0.00"}
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
            Transfer
          </button>
        </S.Footer>
      </S.Content>
    </>
  );
};
