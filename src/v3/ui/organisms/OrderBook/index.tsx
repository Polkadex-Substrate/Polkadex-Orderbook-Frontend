import { useMemo, useState } from "react";

import DropdownItem from "../../molecules/DropdownItem";
import Heading from "../../molecules/Heading";
import { IOrderBookData } from "../Graph/IGraph";
import OrderBookIcon from "../../molecules/OrderBookIcon";
import OrderBookTable from "../../molecules/OrderBookTable";

import * as S from "./styles";

import { Dropdown } from "@polkadex/orderbook-ui/molecules";

type Props = {
  data: IOrderBookData[];
};

const OrderBook = ({ data }: Props) => {
  const [filterState, setFilterState] = useState("Order");
  const [sizeState, setSizeState] = useState(0.01);

  const handleChange = (select: string) => setFilterState(select);
  const handleAction = (select: number) => setSizeState(select);

  const lastOrderBook = (data) =>
    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const last = useMemo<IOrderBookData>(() => lastOrderBook(data), [data]);

  return (
    <S.Wrapper>
      <S.WrapperTitle>
        <Heading title="Order Book" />
        <S.ContainerTitle>
          <S.ContainerActions>
            <OrderBookIcon
              icon="OrderAsc"
              filterState={filterState}
              handleChange={handleChange}
            />
            <OrderBookIcon
              icon="Order"
              filterState={filterState}
              handleChange={handleChange}
            />
            <OrderBookIcon
              icon="OrderDesc"
              filterState={filterState}
              handleChange={handleChange}
            />
          </S.ContainerActions>
          <Dropdown header={sizeState}>
            <>
              <DropdownItem title={0.1} handleAction={handleAction} />
              <DropdownItem title={0.01} handleAction={handleAction} />
              <DropdownItem title={0.001} handleAction={handleAction} />
              <DropdownItem title={0.0001} handleAction={handleAction} />
              <DropdownItem title={0.00001} handleAction={handleAction} />
              <DropdownItem title={0.000001} handleAction={handleAction} />
            </>
          </Dropdown>
        </S.ContainerTitle>
      </S.WrapperTitle>
      <OrderBookTable data={data} active={last && last.price} />
    </S.Wrapper>
  );
};

export default OrderBook;
