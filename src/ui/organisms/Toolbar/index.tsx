import React from "react";

import * as S from "./styles";
import { Props } from "./types";

import { Markets, Information, SelectPairHeader, Dropdown } from "src/ui";

export const Toolbar = ({
  lastPrice,
  currentPrice,
  volume,
  changeLow,
  changeHigh,
  color,
  currentMarket,
}: Props) => {
  return (
    <S.Wrapper>
      <S.Container>
        <Dropdown
          isOpacity
          title={
            <SelectPairHeader
              title={currentMarket?.name}
              icon={currentMarket?.base_unit || "PDEX"}
            />
          }
          direction="bottomRight">
          <Markets />
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
