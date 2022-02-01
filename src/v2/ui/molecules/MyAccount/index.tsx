import * as S from "./styles";
import * as T from "./types";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";

export const MyAccount = () => {
  return (
    <S.Main>
      <Dropdown header={<Header />} direction="bottomRight" priority="medium" isOpacity>
        <Content />
      </Dropdown>
    </S.Main>
  );
};

const Header = ({
  balance = "0.000000",
  address = "0x000000000",
  accountName = "Account",
  isFull = false,
  ...props
}: T.Props) => (
  <S.Header isFull={isFull} {...props}>
    <Icon name="Avatar" background="secondaryBackground" size="giant" />
    <S.HeaderContainer>
      <S.HeaderInfo>
        <p>
          {accountName} ({address})
        </p>
        <span>Estimated: {balance}</span>
      </S.HeaderInfo>
    </S.HeaderContainer>
  </S.Header>
);

const Content = () => (
  <S.Content>
    <S.ContentHeader>
      <small>Connected with Polkadot.js</small>
      <S.Input>
        <input type="text" value="9e0816415vogTpNm6ajK4N9SDRRE5sjq08" />
        <Icon name="Copy" background="secondaryBackground" stroke="black" size="large" />
      </S.Input>
    </S.ContentHeader>
    <S.ContentContainer>
      <S.ContentFeedback>
        <Card
          title="Give Feedback"
          description="Help us improve Polkadex"
          icon="SupportCenter"
        />
      </S.ContentFeedback>
      <S.ContentBox>
        <Card title="My Wallet" icon="Wallet" />
        <Card title="Settings" icon="Settings" />
        <Card title="Help & Support" icon="Support" />
        <Card title="Apperance" icon="Appearance" />
        <Card title="Log Out" icon="Logout" />
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
  </S.Content>
);

export const Card = ({ title, description, icon, ...props }: T.Card) => (
  <S.Card>
    <S.CardContent>
      <Icon name={icon} stroke="black" size="medium" />
      <S.CardTitle>
        <span>{title}</span>
        {description && <p>{description}</p>}
      </S.CardTitle>
    </S.CardContent>
    <Icon name="ArrowRight" stroke="inverse" />
  </S.Card>
);
