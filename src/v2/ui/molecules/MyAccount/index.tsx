import { CSSTransition } from "react-transition-group";
import { useState } from "react";

import * as S from "./styles";
import * as T from "./types";

import { Navigation, Switcher } from "@orderbook/v2/ui/molecules";
import { Icon, Dropdown, AvailableMessage } from "@polkadex/orderbook-ui/molecules";
import { useAccount } from "@polkadex/orderbook-hooks";

export const MyAccount = () => {
  const { userAddress, userName, logout } = useAccount();

  return (
    <S.Main>
      <Dropdown
        header={<Header address={userAddress} accountName={userName} />}
        direction="bottomRight"
        priority="medium"
        isOpacity
        style={{ overflow: "hidden" }}>
        <Content address={userAddress} logout={logout} />
      </Dropdown>
    </S.Main>
  );
};

const Header = ({
  balance = "0.000000",
  address,
  accountName,
  isFull = false,
  ...props
}: T.Props) => {
  const shortAddress = address
    ? address.slice(0, 3) + ".." + address.slice(address.length - 3)
    : "";

  return (
    <S.Header isFull={isFull} {...props}>
      <Icon name="Avatar" background="secondaryBackground" color="black" size="extraLarge" />
      <S.HeaderContainer>
        <S.HeaderInfo>
          <p>{`${accountName} (${shortAddress})`}</p>
          <span>Estimated: {balance}</span>
        </S.HeaderInfo>
      </S.HeaderContainer>
    </S.Header>
  );
};

const Content = ({ address = "0x00000000000", logout = undefined }) => {
  const [activeMenu, setActiveMenu] = useState("Main");
  const [menuHeight, setMenuHeight] = useState(null);

  // TODO: Add types
  const calculateHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const onNavigate = (value = "Main") => setActiveMenu(value);

  return (
    <S.Content style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "Main"}
        unmountOnExit={true}
        timeout={400}
        classNames="menu-primary"
        onEnter={calculateHeight}>
        <S.ContentWrapper>
          <S.ContentHeader>
            <small>Connected with Polkadot.js</small>
            <S.Input>
              <input type="text" disabled value={address} />
              <Icon name="Copy" background="secondaryBackground" stroke="black" size="large" />
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
              <AvailableMessage message="Soon">
                <Card title="My Wallet" icon="Wallet" onClick={() => onNavigate("MyWallet")} />
              </AvailableMessage>
              <AvailableMessage message="Soon">
                <Card
                  title="Settings"
                  icon="Settings"
                  onClick={() => onNavigate("Settings")}
                />
              </AvailableMessage>
              <AvailableMessage message="Soon">
                <Card
                  title="Help and Support"
                  icon="Support"
                  onClick={() => onNavigate("Support")}
                />
              </AvailableMessage>
              <Card
                title="Apperance"
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
              Termas and Conditions
            </a>
            <p>Polkadex© 2021</p>
          </S.ContentFooter>
        </S.ContentWrapper>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "Appearance"}
        unmountOnExit={true}
        timeout={400}
        classNames="menu-secondary"
        onEnter={calculateHeight}>
        <Navigation title="Appearance" onBack={() => onNavigate("Main")}>
          <Switcher
            title="Dark Mode"
            description="Adjust the appearance of Polkadex to reduce  glare and give you eyes a break."
          />
          <AvailableMessage message="Soon">
            <Switcher
              title="Classic Mode"
              icon="Computer"
              description="The layout of the classic version is quite similar to other exchanges."
            />
          </AvailableMessage>
        </Navigation>
      </CSSTransition>
    </S.Content>
  );
};

export const Card = ({ title, description, icon, ...props }: T.Card) => (
  <S.Card {...props}>
    <S.CardContent>
      <Icon name={icon} stroke="black" color="black" size="medium" />
      <S.CardTitle>
        <span>{title}</span>
        {description && <p>{description}</p>}
      </S.CardTitle>
    </S.CardContent>
    <Icon name="ArrowRight" stroke="black" />
  </S.Card>
);
