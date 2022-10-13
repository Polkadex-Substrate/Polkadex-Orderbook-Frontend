import { useRouter } from "next/router";

import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";

export const AccountOverview = ({ onNavigate, logout }: T.Props) => {
  const router = useRouter();
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
                    Occasional-chamois • <small>5Hmu...aaF8</small>
                  </p>
                </S.SwitchCardInfo>
              </S.SwitchCardContent>
              <S.SwitchCardArrow>
                <Icons.ArrowBottom />
              </S.SwitchCardArrow>
            </S.SwitchCard>
          </Dropdown.Trigger>
          <Dropdown.Menu fill="secondaryBackgroundSolid">
            <Dropdown.Item>Testing</Dropdown.Item>
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
