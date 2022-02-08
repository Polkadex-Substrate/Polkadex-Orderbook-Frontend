import * as S from "./styles";
import * as F from "./fakeData";

import {
  Dropdown,
  Icon,
  Tabs,
  TabContent,
  TabHeader,
  AvailableMessage,
} from "@polkadex/orderbook-ui/molecules";
import { OrderHistory } from "@polkadex/orderbook-ui/organisms";

export const MyOrders = ({ isFull = true }) => {
  return (
    <S.Main isFull={isFull}>
      <Tabs>
        <Header />
        <Content />
      </Tabs>
    </S.Main>
  );
};

const Header = () => (
  <S.Header>
    <S.HeaderAsideLeft>
      <ul>
        <TabHeader>
          <S.HeaderLeftLi isActive>
            <Icon name="Document" stroke="inverse" size="extraSmall" />
            Order History
          </S.HeaderLeftLi>
        </TabHeader>
        <TabHeader>
          <S.HeaderLeftLi>
            <Icon name="Time" color="inverse" size="extraSmall" />
            Trade History
          </S.HeaderLeftLi>
        </TabHeader>
      </ul>
    </S.HeaderAsideLeft>
    <AvailableMessage message="Soon">
      <S.HeaderAsideRight>
        <ul>
          <S.HeaderRightLi>
            <S.Search>
              <Icon name="Search" stroke="black" size="extraSmall" />
            </S.Search>
          </S.HeaderRightLi>
          <S.HeaderRightLi>
            <Dropdown header="All">Test</Dropdown>
          </S.HeaderRightLi>
          <S.HeaderRightLi>
            <Icon name="Calendar" color="white" />
          </S.HeaderRightLi>
          <S.HeaderRightLi>Reset</S.HeaderRightLi>
          <S.HeaderRightLi>
            Less
            <Icon name="Expand" color="white" />
          </S.HeaderRightLi>
        </ul>
      </S.HeaderAsideRight>
    </AvailableMessage>
  </S.Header>
);

const Content = () => (
  <S.Content>
    <TabContent>
      <OrderHistory />
    </TabContent>
    <TabContent>
      <OrderHistory />
    </TabContent>
  </S.Content>
);
