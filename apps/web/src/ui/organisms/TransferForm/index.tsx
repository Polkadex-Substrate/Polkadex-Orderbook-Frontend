import { useMemo, useRef, useState } from "react";
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

import * as S from "./styles";

import { Switch, TokenCard, WalletCard } from "@/ui/molecules";
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
  selectedAsset: FilteredAssetProps;
}) => {
  const [state, setState] = useState(false);

  const { allAccounts } = useExtensionWallet();
  const { allBrowserAccounts } = useTradeWallet();

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
  return (
    <S.Main>
      <S.Header>
        <Switch isActive={state} onChange={() => setState(!state)} />
        <span>Transfer for other Polkadex accounts</span>
      </S.Header>
      <S.Content>
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
              <input ref={amountRef} placeholder="Enter an amount" />
              <span>$0.00</span>
            </div>
            <button type="button" onClick={() => window.alert("MAX")}>
              MAX
            </button>
          </S.Amount>
        </S.Form>
        <S.Footer>
          <button type="submit">Transfer</button>
        </S.Footer>
      </S.Content>
    </S.Main>
  );
};
