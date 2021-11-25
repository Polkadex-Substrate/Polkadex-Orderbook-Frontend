import * as React from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  selectOrdersHistory,
  selectUserInfo,
  userOrdersHistoryFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  Checkbox,
  AvailableMessage,
  Button,
  Tabs,
  TabContent,
  TabHeader,
  Empty,
} from "@polkadex/orderbook-ui/molecules";
export const Transactions = () => {
  const userAccount = useReduxSelector(selectUserInfo);
  const orders = useReduxSelector(selectOrdersHistory);
  const dispatch = useDispatch();
  const userLoggedIn = userAccount.address !== "";
  React.useEffect(() => {
    if (userLoggedIn) {
      dispatch(userOrdersHistoryFetch({ userAccount }));
    }
  }, [dispatch, userAccount, userLoggedIn]);
  console.log({ orders });
  return (
    <S.Wrapper>
      {userLoggedIn ? (
        <Tabs>
          <S.Header>
            {/* <ul>
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
                <S.Tab>Funds</S.Tab>
              </TabHeader>
            </ul> */}
            {/* <AvailableMessage>
              <S.Filters>
                <Checkbox label="Hide Other Pairs" />
                <Button size="small">Cancel All</Button>
              </S.Filters>
            </AvailableMessage> */}
          </S.Header>
          <S.Content>
            {/* <TabContent>
              <OpenOrders />
            </TabContent>
            <TabContent>
              <OrderHistory />
            </TabContent> */}
          </S.Content>
        </Tabs>
      ) : (
        <Empty centered description="Connect to a wallet" />
      )}
    </S.Wrapper>
  );
};
