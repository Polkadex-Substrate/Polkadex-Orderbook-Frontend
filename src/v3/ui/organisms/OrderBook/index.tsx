import { useState } from "react";

import DropdownItem from "../../molecules/DropdownItem";
import Heading from "../../molecules/Heading";
import OrderBookIcon from "../../molecules/OrderBookIcon";
import OrderBookTable from "../../molecules/OrderBookTable";
import { DropdownContent, DropdownHeader } from "../../molecules";

import * as S from "./styles";

import { useOrderbook } from "@polkadex/orderbook/v2/hooks";
import { Dropdown } from "@polkadex/orderbook-ui/molecules";

const OrderBook = () => {
  const {
    isPriceUp,
    hasMarket,
    asks,
    bids,
    lastPriceValue,
    sizeState,
    filterState,
    initialState,
    handleChange,
    handleAction,
  } = useOrderbook();

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
            header={<DropdownHeader>{sizeState.size}</DropdownHeader>}
            direction="bottom"
            isClickable>
            <DropdownContent>
              {initialState.map((item) => (
                <DropdownItem
                  key={item.size}
                  title={item.size}
                  handleAction={() => handleAction(item)}
                />
              ))}
            </DropdownContent>
          </Dropdown>
        </S.ContainerTitle>
      </S.WrapperTitle>
      <OrderBookTable
        lightMode
        filterBy={filterState}
        isPriceUp={isPriceUp}
        hasMarket={hasMarket}
        asks={asks}
        bids={bids}
        lastPriceValue={lastPriceValue}
        precision={sizeState.length}
      />
    </S.Wrapper>
  );
};

export default OrderBook;
