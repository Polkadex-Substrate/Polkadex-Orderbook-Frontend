import {
  getCurrentMarket,
  useMarkets,
  useOrderbook,
} from "@orderbook/core/index";
import classNames from "classnames";
import { Skeleton } from "@polkadex/ux";

import { Header } from "./header";
import { LastPrice } from "./lastPrice";
import { Table } from "./table";

export const Orderbook = ({
  maxHeight,
  id,
}: {
  maxHeight: string;
  id: string;
}) => {
  const { list } = useMarkets();

  const currentMarket = getCurrentMarket(list, id);
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
    loading,
    qtyPrecision,
    quoteUnit,
    baseUnit,
  } = useOrderbook(currentMarket?.id ?? "");

  return (
    <div
      className="flex flex-col border-r border-r-primary overflow-hidden max-xl:flex-1 h-full"
      style={{ height: maxHeight }}
    >
      <Header
        selectedDecimal={sizeState.size}
        decimalSizes={initialState}
        onChangeDecimal={handleAction}
        filterBy={filterState}
        onChangeFilterBy={handleChange}
      />
      <div
        className={classNames(
          filterState !== "OrderDesc" ? "flex-col" : "flex-col-reverse",
          "flex flex-1 flex-col border-t border-t-primary bg-level-0 overflow-y-hidden hover:overflow-y-auto"
        )}
        style={{
          scrollbarGutter:
            loading || !bids.length || !asks.length ? "inherit" : "stable",
        }}
      >
        <Skeleton loading={!!loading}>
          <Table
            precision={sizeState.length}
            isSell
            active={filterState !== "OrderDesc"}
            baseTicker={baseUnit ?? ""}
            quoteTicker={quoteUnit ?? ""}
            asks={asks}
            bids={bids}
            orders={asks}
          />
        </Skeleton>
        <LastPrice
          loading={!!loading}
          lastPrice={lastPriceValue}
          isPriceUp={isPriceUp}
        />
        <Skeleton loading={!!loading}>
          <Table
            precision={sizeState.length}
            active={filterState !== "OrderAsc"}
            baseTicker={baseUnit ?? ""}
            quoteTicker={quoteUnit ?? ""}
            asks={asks}
            bids={bids}
            orders={bids}
          />
        </Skeleton>
      </div>
    </div>
  );
};
