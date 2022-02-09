import React from "react";

import * as S from "./styles";

import {
  AvailableMessage,
  Dropdown,
  Information,
  SelectPairHeader,
} from "@polkadex/orderbook-ui/molecules";
import { selectCurrentMarket, selectMarketTickers } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { Markets } from "@polkadex/orderbook-ui/organisms";

const defaultTicker = {
  amount: 0,
  low: 0,
  last: 0,
  high: 0,
  volume: 0,
  price_change_percent: "+0.00%",
};

export const Toolbar = () => {
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const marketTickers = useReduxSelector(selectMarketTickers);
  const currTicker = marketTickers["0-1"];

  const getTickerValue = (value: string) => {
    if (currTicker && Object.keys(currTicker).includes(value)) {
      return currTicker[value];
    }
    return "0";
  };

  const bidUnit = currentMarket?.quote_unit?.toUpperCase();
  const isPositive = true;
  return (
    <S.Wrapper>
      <S.Container>
        <Dropdown
          isOpacity
          direction="bottom"
          header={
            <SelectPairHeader
              title={currentMarket?.name}
              icon={currentMarket?.tokenTickerName}
            />
          }>
          <Markets />
        </Dropdown>
      </S.Container>
      <AvailableMessage message="Soon">
        <S.InformationWrapper>
          <Information
            label="Last price"
            text={
              currentMarket &&
              `${Decimal.format(
                Number(getTickerValue("last")),
                currentMarket?.price_precision,
                ","
              )} ${bidUnit || ""}`
            }
          />
          <Information
            label="Price 24h"
            color={isPositive ? "green" : "red"}
            text={currentMarket && `${Number(getTickerValue("price_change_percent"))}`}
          />
          <Information
            label="Volume 24h"
            text={
              currentMarket &&
              `${Decimal.format(
                Number(getTickerValue("volume")),
                currentMarket?.price_precision,
                ","
              )} ${bidUnit || ""}`
            }
          />
          <div>
            <Information
              label="24h high"
              color="green"
              orientation="horizontal"
              text={
                currentMarket &&
                `${Decimal.format(
                  Number(getTickerValue("high")),
                  currentMarket?.price_precision,
                  ","
                )} ${bidUnit || ""}`
              }
            />
            <Information
              label="24h low"
              color="red"
              orientation="horizontal"
              text={
                currentMarket &&
                `${Decimal.format(
                  Number(getTickerValue("low")),
                  currentMarket?.price_precision,
                  ","
                )} ${bidUnit || ""}`
              }
            />
          </div>
        </S.InformationWrapper>
      </AvailableMessage>
    </S.Wrapper>
  );
};
