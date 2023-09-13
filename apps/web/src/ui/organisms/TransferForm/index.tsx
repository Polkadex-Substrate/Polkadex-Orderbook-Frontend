import { useRef, useState } from "react";

import * as S from "./styles";

import { Switch, TokenCard, WalletCard } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";

export const TransferForm = ({ openAssets }) => {
  const [state, setState] = useState(false);
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
            walletTypeLabel="Your wallet"
            walletType="Funding account"
            walletName="Orderbook Testing"
            walletAddress="esqd7ZhqxP8...T1pUf1vRw"
          />
          <S.WalletsButton type="button" onClick={() => window.alert("Invert")}>
            <div>
              <Icons.Trading />
            </div>
            <span>Switch</span>
          </S.WalletsButton>
          <WalletCard
            label="To"
            walletTypeLabel="Orderbook"
            walletType="Trading account"
            walletName="Orderbook Testing"
            walletAddress="esqd7ZhqxP8...T1pUf1vRw"
          />
        </S.Wallets>
        <S.Form>
          <TokenCard
            tokenIcon="USDT"
            tokenTicker="USDT"
            availableAmount="0.00"
            onAction={openAssets}
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
