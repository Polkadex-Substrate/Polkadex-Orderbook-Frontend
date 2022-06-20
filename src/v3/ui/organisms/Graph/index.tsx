import dynamic from "next/dynamic";

import OrderBook from "../OrderBook";
import ListItemButton from "../../molecules/ListItemButton";

import { IGraph } from "./IGraph";
import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
const Chart = dynamic(() => import("../../molecules/CustomChart"));

const Graph = ({ orderbook, graphData }: IGraph) => {
  return (
    <S.Wrapper>
      <S.WrapperGraph>
        <S.Header>
          <S.FlexWrapper>
            <S.List>
              <Icon
                name="Settings"
                stroke="text"
                size="extraMedium"
                background="primaryBackgroundOpacity"
              />
              <ul>
                <S.Li>1h</S.Li>
                <S.Li isActive>24h</S.Li>
                <S.Li>7d</S.Li>
                <S.Li>1m</S.Li>
                <S.Li>1y</S.Li>
                <S.Li>All</S.Li>
              </ul>
              <Icon name="Calendar" size="extraMedium" background="primaryBackgroundOpacity" />
            </S.List>
          </S.FlexWrapper>

          <S.FlexWrapper>
            <S.List>
              <ListItemButton title="Original" size="Small" isActive />
              <ListItemButton title="Trading View" size="Small" />
              <ListItemButton title="Deep Market" size="Small" />
              <Icon name="Expand" size="extraMedium" background="primaryBackgroundOpacity" />
            </S.List>
          </S.FlexWrapper>
        </S.Header>
        {graphData.length > 1 ? <Chart data={graphData} /> : <p>Loading..</p>}
      </S.WrapperGraph>
      <OrderBook />
    </S.Wrapper>
  );
};

export default Graph;
