import * as S from "./styles";
import * as F from "./fakeData";

import { SpaceBetweenCenter } from "@orderbook/v2/ui/atoms";
import { Icon, Dropdown, AvailableMessage } from "@polkadex/orderbook-ui/molecules";

export const Notifications = () => {
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
    <Icon name="Notifications" color="inverse" size="extraSmall" />
  </S.Header>
);

const Content = () => {
  return (
    <S.Content>
      <S.Title>
        <SpaceBetweenCenter>
          <h3>Notifications Center</h3>
          <a href="#">
            See all
            <Icon color="inverse" name="SingleArrowRight" />
          </a>
        </SpaceBetweenCenter>
      </S.Title>
      <S.Recent>
        <S.RecentTitle>
          <h5>Recent</h5>
          <AvailableMessage message="Soon">
            <ul>
              <S.RecentLi isActive>All</S.RecentLi>
              <S.RecentLi>Unread</S.RecentLi>
            </ul>
          </AvailableMessage>
        </S.RecentTitle>
        <S.RecentContent isScrollable={F.cards.length > 3}>
          {F.cards?.map((notification) => (
            <Card
              key={notification.id}
              description={notification.description}
              time={notification.time}
              isRead={notification.isRead}
            />
          ))}
        </S.RecentContent>
      </S.Recent>
    </S.Content>
  );
};

const Card = ({ description, time, isRead = false }) => (
  <S.Card isRead={isRead}>
    <S.CardIcon>
      <Icon name="Clock" size="extraSmall" stroke="black" />
      {isRead && <S.Read />}
    </S.CardIcon>
    <S.CardContent>
      <p>{description}</p>
      <small>{time} ago</small>
    </S.CardContent>
    {isRead && (
      <S.CardAction onClick={() => console.log("Clicked")}>
        <Icon name="Verified" color="black" />
      </S.CardAction>
    )}
  </S.Card>
);
