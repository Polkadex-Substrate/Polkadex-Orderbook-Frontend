import { useState } from "react";

import DropdownItem from "../../molecules/DropdownItem";
import Heading from "../../molecules/Heading";
import OrderBookIcon from "../../molecules/OrderBookIcon";
import OrderBookTable from "../../molecules/OrderBookTable";
import { DropdownContent, DropdownHeader } from "../../molecules";

import * as S from "./styles";

import { Dropdown } from "@polkadex/orderbook-ui/molecules";

const initialState = [0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001];

const OrderBook = () => {
  const [filterState, setFilterState] = useState("Order");
  const [sizeState, setSizeState] = useState(initialState[0]);

  const handleChange = (select: string) => setFilterState(select);
  const handleAction = (select: number) => setSizeState(select);

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
          <Dropdown
            header={<DropdownHeader>{sizeState}</DropdownHeader>}
            direction="bottom"
            isClickable>
            <DropdownContent>
              {initialState.map((item) => (
                <DropdownItem
                  key={item}
                  title={item}
                  handleAction={() => handleAction(item)}
                />
              ))}
            </DropdownContent>
          </Dropdown>
        </S.ContainerTitle>
      </S.WrapperTitle>
      <OrderBookTable lightMode filterBy={filterState} />
    </S.Wrapper>
  );
};

export default OrderBook;
