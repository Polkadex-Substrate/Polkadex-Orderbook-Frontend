import * as S from "./styles";
import * as F from "./fakeData";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";

export const Orderbook = () => {
  return (
    <S.Main>
      <S.Header>
        <h2>Orderbook</h2>
        <Dropdown header="0.1000000">Testing</Dropdown>
      </S.Header>
      <S.Content>
        <Table pair="DOT" token="PDEX" orders={F.orders} isSell />
        <Pricing price="0.21858000" priceInFiat="24.00" />
        <Table pair="DOT" token="PDEX" orders={F.orders} />
      </S.Content>
    </S.Main>
  );
};

const Table = ({ pair, token, isSell = false, orders = [] }) => (
  <S.Table isSell={isSell}>
    <S.Head>
      <S.CellHead>Price({pair})</S.CellHead>
      <S.CellHead>Amount({token})</S.CellHead>
      <S.CellHead>Total</S.CellHead>
    </S.Head>
    <S.Body>
      {orders.map((order) => {
        return (
          <Card
            key={order.id}
            price={order.price}
            amount={order.amount}
            total={order.total}
            isSell={isSell}
            volume={order.volume}
          />
        );
      })}
    </S.Body>
  </S.Table>
);

const Card = ({ price, amount, total, isSell = false, volume = 0 }) => (
  <S.Card>
    <S.CardCell>{price}</S.CardCell>
    <S.CardCell>{amount}</S.CardCell>
    <S.CardCell>{total}</S.CardCell>
    <S.CardVolume isSell={isSell} volume={volume} />
  </S.Card>
);

const Pricing = ({ price, priceInFiat, isSell = false }) => (
  <S.Pricing>
    <S.PricingAsideLeft isSell={isSell}>
      <span>
        <Icon name={"SingleArrowBottom"} size="extraSmall" />
        {price}
      </span>
      <p>${priceInFiat}</p>
    </S.PricingAsideLeft>
    <S.PricingAsideRight>
      <Icon name="OrderDesc" size="medium" />
    </S.PricingAsideRight>
  </S.Pricing>
);
