import { Sparklines, SparklinesLine } from "react-sparklines";
import { useEffect, useRef } from "react";

import * as S from "./styles";
import * as F from "./fakeData";

import { Icon } from "@polkadex/orderbook-ui/molecules";
export const ExploreMarket = ({ isFull = false }) => {
  const carouselRef = useRef(null);

  const handleNext = () => {
    const isChildTotalSize =
      carouselRef.current.clientWidth + carouselRef.current.scrollLeft <
      carouselRef.current.childNodes[1].clientWidth * F.fakeData.length;

    carouselRef?.current?.scrollTo({
      behavior: "smooth",
      top: 0,
      left: isChildTotalSize
        ? carouselRef.current.scrollLeft + carouselRef.current.clientWidth * 0.3
        : 0,
    });
  };

  return (
    <S.Main isFull={isFull}>
      <S.Container ref={carouselRef}>
        {F.fakeData.map((market) => (
          <Card
            key={market.id}
            pair={market.pair}
            token={market.token}
            price={market.price}
            change={market.change}
            isActive={market.id === 1}
            chartData={market.chartData}
          />
        ))}
      </S.Container>
      {F.fakeData.length > 3 && (
        <S.Actions onClick={handleNext}>
          <Icon name="SingleArrowRight" color="inverse" size="extraSmall" />
        </S.Actions>
      )}
    </S.Main>
  );
};

const Card = ({ pair, token, price, change, isActive = false, chartData = [] }) => (
  <S.Card isActive={isActive}>
    <S.CardAsideLeft>
      <S.CardTitle>
        {pair}/{token}
      </S.CardTitle>
      <div>
        <p>{price}</p>
        <span>{change}%</span>
      </div>
    </S.CardAsideLeft>
    <S.CardAsideRight>
      <Sparklines data={chartData}>
        <SparklinesLine color="green" />
      </Sparklines>
    </S.CardAsideRight>
  </S.Card>
);
