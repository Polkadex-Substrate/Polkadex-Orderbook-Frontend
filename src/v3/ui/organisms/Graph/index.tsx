import dynamic from "next/dynamic";
import { useState } from "react";

import OrderBook from "../OrderBook";
import ListItemButton from "../../molecules/ListItemButton";

import { IGraph } from "./IGraph";
import * as S from "./styles";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";
const Chart = dynamic(() => import("../../molecules/CustomChart"));

const Graph = ({ orderbook, graphData }: IGraph) => {
  const [filters, setFilters] = useState({
    type: "CandlestickSeries",
  });
  return (
    <S.Wrapper>
      <S.WrapperGraph>
        <S.Header>
          <S.FlexWrapper>
            <S.List>
              <Icon name="Edit" />
              <Icon name="History" />
            </S.List>
          </S.FlexWrapper>
          <Dropdown title="Candles" />
          <S.FlexWrapper>
            <S.List>
              <ListItemButton title="Original" size="Small" />
              <ListItemButton title="Trading View" size="Small" />
              <ListItemButton title="Deep Market" size="Small" />
              <Icon name="Expand" />
            </S.List>
          </S.FlexWrapper>
        </S.Header>
        {graphData.length > 1 ? (
          <Chart data={graphData} type={filters.type} />
        ) : (
          <p>Loading..</p>
        )}
      </S.WrapperGraph>
      <OrderBook data={orderbook} />
    </S.Wrapper>
  );
};

export default Graph;
