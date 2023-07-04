import { useState } from "react";

import * as S from "./styles";
import * as T from "./types";
export const Rating = ({ value, setValue }: T.Props) => {
  const stars = [0, 1, 2, 3, 4];
  return (
    <S.Container>
      {stars.map((item, index) => {
        return (
          <S.Image key={item} onClick={() => setValue(index)}>
            <img src={value >= index + 1 ? "/img/pinkStar.svg" : "/img/greyStar.svg"} alt="" />
          </S.Image>
        );
      })}
    </S.Container>
  );
};
