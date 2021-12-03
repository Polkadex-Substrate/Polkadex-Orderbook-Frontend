/// TODO: Check side Effets
import * as S from "./styles";

import { selectHasUser } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  Checkbox,
  AvailableMessage,
  Button,
  Tabs,
  TabContent,
  TabHeader,
  Empty,
  Dropdown,
  Icon,
} from "@polkadex/orderbook-ui/molecules";
import {
  Funds,
  OpenOrders,
  OrderHistory,
  TradeHistory,
  TransactionHistory,
} from "@polkadex/orderbook-ui/organisms";
export const Transactions = () => {
  const userLoggedIn = useReduxSelector(selectHasUser);

  return (
    <S.Wrapper>
      {userLoggedIn ? (
        <Tabs>
          <S.Header>
            <ul>
              <TabHeader>
                <S.Tab>Open Orders</S.Tab>
              </TabHeader>
              <TabHeader>
                <S.Tab>Orders History</S.Tab>
              </TabHeader>
              <TabHeader>
                <S.Tab>Trade History</S.Tab>
              </TabHeader>
              <TabHeader>
                <S.Tab>Transactions</S.Tab>
              </TabHeader>
              <TabHeader>
                <S.Tab>Funds</S.Tab>
              </TabHeader>
            </ul>
            {/* <AvailableMessage>
              <S.Filters>
                <Dropdown
                  header={
                    <Icon name="Settings" size="medium" background="secondaryBackground" />
                  }>
                  Soon
                </Dropdown>
                <Button size="small">Cancel All</Button>
              </S.Filters>
            </AvailableMessage> */}
          </S.Header>
          <S.Content>
            <TabContent>
              <OpenOrders />
            </TabContent>
            <TabContent>
              <OrderHistory />
            </TabContent>
            <TabContent>
              <TradeHistory />
            </TabContent>
            <TabContent>
              <TransactionHistory />
            </TabContent>
            <TabContent>
              <Funds />
            </TabContent>
          </S.Content>
        </Tabs>
      ) : (
        <Empty centered description="Connect to a wallet" />
      )}
    </S.Wrapper>
  );
};
