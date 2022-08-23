import { useRouter } from "next/router";
import { useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";
import { useAccount } from "@polkadex/orderbook-hooks";

export const AccountOverview = ({ address, onNavigate, logout }: T.Props) => {
  const router = useRouter();
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy");
  const { userEmail } = useAccount();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    buttonRef.current.innerHTML = "Copied";
  };
  const email = userEmail;

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
        <S.ContentEmail>
          <Card title={email} icon="Email" />
        </S.ContentEmail>
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
          <Card
            title="My Wallet"
            icon="Wallet"
            onClick={() => router.push("/accountManager")}
          />
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
        <a
          href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
          target="_blank"
          rel="noreferrer">
          Privacy Policy
        </a>
        <p>Polkadex© 2022</p>
      </S.ContentFooter>
    </S.ContentWrapper>
  );
};

const Card = ({ title, description, icon, ...props }: T.Card) => (
  <S.Card isHoverable={!!props?.onClick} {...props}>
    <S.CardContent>
      <Icon name={icon} stroke="text" color="text" size="medium" />
      <S.CardTitle>
        <span>{title}</span>
        {description && <p>{description}</p>}
      </S.CardTitle>
    </S.CardContent>
    {props.onClick && <Icon name="ArrowRight" stroke="text" />}
  </S.Card>
);
