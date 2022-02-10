import * as S from "./styles";

import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";

export const News = ({ isFull = true }) => {
  return (
    <AvailableMessage message="Soon">
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
          <Icon name="SingleArrowRight" size="extraSmall" color="text" />
        </S.Actions>
      </S.Main>
    </AvailableMessage>
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
