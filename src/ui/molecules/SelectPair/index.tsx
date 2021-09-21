import React from "react";

import * as S from "./styles";

import { Icon, IconToken } from "src/ui/components";

export const SelectPairHeader = ({ title = "", icon = "Default" }) => {
  return (
    <S.Wrapper>
      <IconToken icon={icon} size="small" />
      <span>{title}</span>
      <Icon icon="ArrowBottom" size="xsmall" />
    </S.Wrapper>
  );
};
