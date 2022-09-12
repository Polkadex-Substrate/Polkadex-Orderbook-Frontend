import { Dropdown } from "../../molecules";

import * as S from "./styles";

import { useOrderbook } from "@polkadex/orderbook/hooks";
import {
  DropdownHeader,
  OrderBookTable,
  OrderBookIcon,
  Heading,
} from "@polkadex/orderbook-ui/molecules";

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
          <Dropdown>
            <Dropdown.Trigger>
              <div>
                <DropdownHeader>{sizeState.size}</DropdownHeader>
              </div>
            </Dropdown.Trigger>
            <Dropdown.Menu fill="tertiaryBackground">
              {initialState.map((item) => (
                <Dropdown.Item key={item.size} onAction={() => handleAction(item)}>
                  {item.size}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
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
