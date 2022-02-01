import * as S from "./styles";
import * as T from "./types";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";

export const Menu = () => {
  return (
    <S.Main>
      <Dropdown header={<Header />} direction="bottomRight" priority="medium" isOpacity>
        <Content />
      </Dropdown>
    </S.Main>
  );
};

const Header = ({ isActive = false }) => (
  <S.Header isActive={isActive}>
    <Icon name="Menu" color="inverse" size="extraSmall" />
    Menu
  </S.Header>
);

const Content = () => {
  return (
    <S.Content>
      <S.Title>
        <h3>Menu</h3>
        <S.Search>
          <Icon name="Search" color="inverse" size="extraSmall" />
          <input type="text" placeholder="Search Menu.." />
        </S.Search>
      </S.Title>
      <S.Container>
        <CardGroup title="Buy Crypto">
          <Card
            icon="Bank"
            title="Bank Deposit"
            description="Buy crypto with the typical bank transfer."
            href="#"
          />
          <Card
            icon="Airplane"
            title="Credit Card"
            description="Get crypto instantly with your credit card."
            href="#"
          />
        </CardGroup>
        <CardGroup title="Trade">
          <Card
            icon="Polkapool"
            title="Swap"
            description="The easiest way to swap your tokens with Polkapool."
            isBeta
            href="#"
          />
          <Card
            icon="Polkaido"
            title="IDO -Initial Dex Offering"
            description="An easy way to invest or start promising projects."
            isBeta
            href="#"
          />
        </CardGroup>
        <CardGroup title="Earn">
          <Card
            icon="Lock"
            title="Orderbook Staking"
            description="Easy stake, higher returns."
            href="#"
          />
          <Card
            icon="Airplane"
            title="Launchpad"
            description="Token launch platform."
            href="#"
          />
          <Card
            icon="Gift"
            title="Airdrop"
            description="Get rewards in exchange for tasks on social networks."
            href="#"
          />
        </CardGroup>
        <CardGroup title="Finance">
          <Card
            icon="Loan"
            title="Crypto Loans"
            description="Get an instant loan secured by assets."
            href="#"
          />
          <Card
            icon="CreditCard"
            title="Orderbook Pay"
            description="Send and spend crypto at zero fees."
            href="#"
          />
          <Card
            icon="Guide"
            title="Guides"
            description="Tutorials on how to use Orderbook."
            href="#"
          />
        </CardGroup>
        <CardGroup title="Others">
          <Card
            icon="Guide"
            title="Guides"
            description="Tutorials on how to use Orderbook."
            href="#"
          />
          <Card
            icon="Document"
            title="News"
            description="Latest news about listing and updates."
            href="#"
          />
        </CardGroup>
        <CardGroup title="NFT">
          <Card
            icon="Play"
            title="Gaming/IGO"
            description="Play games  and earn tokens."
            href="#"
          />
          <Card
            icon="Marketplace"
            title="Marketplace"
            description="Buy and sell your nft’s."
            href="#"
          />
        </CardGroup>
      </S.Container>
    </S.Content>
  );
};
const CardGroup = ({ title, children }) => (
  <S.CardGroup>
    <h4>{title}</h4>
    <div>{children}</div>
  </S.CardGroup>
);

const Card = ({ title, description, icon, isBeta = false, ...props }: T.Props) => (
  <S.Card {...props}>
    <Icon size="medium" name={icon} color="inverse" />
    <S.CardContainer>
      <div>
        <small>{title} </small>
        {isBeta && <span>Beta</span>}
      </div>
      <p>{description}</p>
    </S.CardContainer>
  </S.Card>
);
