import * as S from "./styles";
import * as T from "./types";
import * as F from "./fakeData";

import { Dropdown, Icon, Tabs, TabContent, TabHeader } from "@polkadex/orderbook-ui/molecules";

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
  </S.Header>
);

const Content = () => (
  <S.Content>
    <TabContent>
      {F.orders.map((order) => (
        <CardHistory
          key={order.id}
          pair={order.pair}
          token={order.token}
          date={order.date}
          type={order.type}
          price={order.price}
          amount={order.amount}
          filled={order.filled}
          total={order.total}
          isSell={order.isSell}
        />
      ))}
    </TabContent>
    <TabContent>
      {F.orders.map((order) => (
        <CardHistory
          key={order.id}
          pair={order.pair}
          token={order.token}
          date={order.date}
          type={order.type}
          price={order.price}
          amount={order.amount}
          filled={order.filled}
          total={order.total}
          isSell={order.isSell}
        />
      ))}
    </TabContent>
  </S.Content>
);

const CardHistory = ({
  pair,
  token,
  type,
  price,
  amount,
  date,
  filled,
  total,
  isSell,
}: T.Props) => (
  <S.Card>
    <S.CardWrapper>
      <S.CardBox>
        <S.CardInfoToken>
          <Icon name={isSell ? "OrderSell" : "OrderBuy"} size="large" />
          <S.Tag isSell={isSell}>{isSell ? "Sell" : "Buy"} </S.Tag>
        </S.CardInfoToken>
        <div>
          <span>
            {pair}/{token}
          </span>
          <p>{date}</p>
        </div>
      </S.CardBox>
      <S.CardInfo>
        <span>{type}</span>
        <p>Type</p>
      </S.CardInfo>
      <S.CardInfo>
        <span>{price}</span>
        <p>Price</p>
      </S.CardInfo>
      <S.CardInfo>
        <span>{amount}</span>
        <p>Amount</p>
      </S.CardInfo>
      <S.CardInfo>
        <span>{filled}%</span>
        <p>Filled</p>
      </S.CardInfo>
      <S.CardInfo>
        <span>{total}</span>
        <p>Total</p>
      </S.CardInfo>
    </S.CardWrapper>

    <S.CardActions>
      <div>
        <ul>
          {Number(filled) < 100 ? (
            <S.Cancel>Cancel</S.Cancel>
          ) : (
            <>
              <S.Deposit>Deposit</S.Deposit>
              <li>Withdraw</li>
            </>
          )}
        </ul>
      </div>
    </S.CardActions>
  </S.Card>
);
