import React from "react";

import * as S from "./styles";
import { Props } from "./types";

import { Dropdown } from "src/ui/components";
import { Information, SelectPairHeader } from "src/ui/molecules";

export const Toolbar = ({
  lastPrice,
  currentPrice,
  volume,
  changeLow,
  changeHigh,
  color,
  // Select PairContent
  markets = [],
  currentMarket,
}: Props) => {
  return (
    <S.Wrapper>
      <S.Container>
        <Dropdown
          title={
            <SelectPairHeader
              title={currentMarket?.name}
              icon={currentMarket?.base_unit || "PDEX"}
            />
          }
          direction="bottom">
          <p>Testing..</p>
        </Dropdown>
      </S.Container>
      <S.Container>
        <Information label="Last price" text={lastPrice} />
        <Information label="Price 24h" color={color} text={currentPrice} />
        <Information label="Volume 24h" text={volume} />
        <div>
          <Information
            label="24h high"
            color="green"
            orientation="horizontal"
            text={changeHigh}
          />
          <Information label="24h low" color="red" orientation="horizontal" text={changeLow} />
        </div>
      </S.Container>
    </S.Wrapper>
  );
};
