import { useRouter } from "next/router";
import { useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";

export const AccountOverview = ({ address, onNavigate, logout }: T.Props) => {
  const router = useRouter();
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.ContentWrapper>
      <S.ContentHeader>
        <small>Connected with Polkadot.js</small>
        <S.Input>
          <input type="text" disabled value={address} />
          <button
            ref={buttonRef}
            type="button"
            onMouseOut={handleOnMouseOut}
            onClick={handleCopy}>
            Copy
          </button>
        </S.Input>
      </S.ContentHeader>
      <S.ContentContainer>
        <S.ContentFeedback>
          <AvailableMessage message="Soon">
            <Card
              title="Give Feedback"
              description="Help us improve Polkadex"
              icon="SupportCenter"
            />
          </AvailableMessage>
        </S.ContentFeedback>
        <S.ContentBox>
          <Card title="My Wallet" icon="Wallet" onClick={() => router.push("/wallet")} />
          <AvailableMessage message="Soon">
            <Card title="Settings" icon="Settings" onClick={() => onNavigate("Settings")} />
          </AvailableMessage>
          <AvailableMessage message="Soon">
            <Card
              title="Help and Support"
              icon="Support"
              onClick={() => onNavigate("Support")}
            />
          </AvailableMessage>
          <Card
            title="Appearance"
            icon="Appearance"
            onClick={() => onNavigate("Appearance")}
          />
          <Card title="Log Out" icon="Logout" onClick={logout} />
        </S.ContentBox>
      </S.ContentContainer>
      <S.ContentFooter>
        <a href="#" target="_blank">
          Privacy
        </a>
        <a href="#" target="_blank">
          Terms and Conditions
        </a>
        <p>Polkadex© 2021</p>
      </S.ContentFooter>
    </S.ContentWrapper>
  );
};

const Card = ({ title, description, icon, ...props }: T.Card) => (
  <S.Card {...props}>
    <S.CardContent>
      <Icon name={icon} stroke="text" color="text" size="medium" />
      <S.CardTitle>
        <span>{title}</span>
        {description && <p>{description}</p>}
      </S.CardTitle>
    </S.CardContent>
    <Icon name="ArrowRight" stroke="text" />
  </S.Card>
);
