import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const News = ({ isFull = true }) => {
  return (
    <S.Main isFull={isFull}>
      <S.Container>
        <Card
          tag="Listings"
          title="Cardano (ADA) is now listed in Polkadex"
          description="Subscription for the Cardano (ADA) token sale on Polkadex Orderbook Launchpad..."
          buttonText="Trade Now"
          buttonLink="#"
        />
      </S.Container>
      <S.Actions>
        <Icon name="SingleArrowRight" size="extraSmall" color="black" />
      </S.Actions>
    </S.Main>
  );
};
const Card = ({ tag, title, description, buttonText, buttonLink }) => (
  <S.Card>
    <span>{tag}</span>
    <h3>{title}</h3>
    <p>{description}</p>
    <a href={buttonLink}>{buttonText}</a>
  </S.Card>
);
