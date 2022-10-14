import { useRouter } from "next/router";

import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectBrowserTradeAccounts, selectTradeAccount } from "@polkadex/orderbook-modules";
import { useState } from "react";
import { KeyringPair } from "@polkadot/keyring/types";
import { transformAddress } from "@polkadex/orderbook/modules/user/profile/helpers";

export const AccountOverview = ({ onNavigate, logout }: T.Props) => {
  const router = useRouter();
  const tradingAccounts = useReduxSelector(selectBrowserTradeAccounts);
  const [selectedAccount, setSelectedAccount] = useState<KeyringPair | null>(null);

  const handleClick = (addr: string) => {
    const acc = tradingAccounts.find(
      (tradeAcc) => tradeAcc.address?.toLowerCase() === addr?.toLowerCase()
    );
    setSelectedAccount(acc);
  };

  return (
    <S.Wrapper>
      <S.Profile>
        <div>
          <Icons.Profile />
        </div>
        <span>Profile</span>
      </S.Profile>
      <S.Switch>
        <Dropdown>
          <Dropdown.Trigger>
            <S.SwitchCard>
              <S.SwitchCardContent>
                <span>Trading account</span>
                <S.SwitchCardInfo>
                  <button type="button">
                    <Icons.Copy />
                  </button>
                  <p>
                    {selectedAccount ? selectedAccount.meta.name : "Choose trade account"} •{" "}
                    <small>
                      {selectedAccount ? transformAddress(selectedAccount.address) : ""}
                    </small>
                  </p>
                </S.SwitchCardInfo>
              </S.SwitchCardContent>
              <S.SwitchCardArrow>
                <Icons.ArrowBottom />
              </S.SwitchCardArrow>
            </S.SwitchCard>
          </Dropdown.Trigger>
          <Dropdown.Menu fill="secondaryBackgroundSolid">
            {tradingAccounts.slice(0, 4).map((acc, i) => (
              <Dropdown.Item onAction={handleClick} key={acc.address}>
                {acc.address}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <S.SwitchCard>
          <S.SwitchCardContent>
            <span>
              Controller account
              <div>
                <Icons.Verified />
              </div>
            </span>
            <S.SwitchCardInfo>
              <button type="button">
                <Icons.Copy />
              </button>
              <p>
                Orderbook testing • <small>5E1h...G5P8</small>
              </p>
            </S.SwitchCardInfo>
          </S.SwitchCardContent>
        </S.SwitchCard>
      </S.Switch>
      <S.Links>
        <Card title="Balances" icon="Wallet" onClick={() => router.push("/balances")} />
        <Card title="History" icon="History" onClick={() => router.push("/history")} />
        <Card title="Settings" icon="Settings" onClick={() => router.push("/settings")} />
        <Card title="Appearance" icon="Appearance" onClick={() => onNavigate("Appearance")} />
        <Card title="Log Out" icon="Logout" onClick={logout} />
      </S.Links>
    </S.Wrapper>
  );
};

const Card = ({ title, description, icon, ...props }: T.Card) => (
  <S.Card isHoverable={!!props?.onClick} {...props}>
    <S.CardContent>
      <Icon name={icon} stroke="tertiaryText" color="tertiaryText" size="medium" />
      <S.CardTitle>
        <span>{title}</span>
        {description && <p>{description}</p>}
      </S.CardTitle>
    </S.CardContent>
  </S.Card>
);
