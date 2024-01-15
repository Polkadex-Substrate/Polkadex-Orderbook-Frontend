import { Colors } from "@orderbook/core/helpers";

import { Keyboard } from "../LoadingIcons";

import * as S from "./styles";
export const LoadingSection = ({
  isActive = true,
  color = "tertiaryBackground",
  children,
}: {
  isActive: boolean;
  color: Colors;
  children: React.ReactNode;
}) => (
  <S.Wrapper>
    {children}
    <S.Container color={color} isActive={isActive}>
      <Keyboard color="primary" size="medium" />
    </S.Container>
  </S.Wrapper>
);
