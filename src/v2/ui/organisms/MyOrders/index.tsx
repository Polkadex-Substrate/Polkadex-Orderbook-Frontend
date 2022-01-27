import * as S from "./styles";
import * as T from "./types";
import * as F from "./fakeData";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";

export const MyOrders = ({ isFull = true }) => {
  return (
    <S.Main isFull={isFull}>
      <Header />
      <Content />
    </S.Main>
  );
};

const Header = () => (
  <S.Header>
    <S.HeaderAsideLeft>
      <ul>
        <S.HeaderLeftLi isActive>
          <Icon name="Document" stroke="inverse" size="extraSmall" />
          Order History
        </S.HeaderLeftLi>
        <S.HeaderLeftLi>
          <Icon name="Time" color="inverse" size="extraSmall" />
          Trade History
        </S.HeaderLeftLi>
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
          <Icon name="Calendar" />
        </S.HeaderRightLi>
        <S.HeaderRightLi>Reset</S.HeaderRightLi>
        <S.HeaderRightLi>
          Less
          <Icon name="Expand" />
        </S.HeaderRightLi>
      </ul>
    </S.HeaderAsideRight>
  </S.Header>
);
const Content = () => (
  <S.Content>
    {F.orders.map((order) => (
      <Card
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
  </S.Content>
);

const Card = ({ pair, token, type, price, amount, date, filled, total, isSell }: T.Props) => (
  <S.Card>
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
