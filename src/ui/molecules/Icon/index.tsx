import * as cryptoIcons from "@styled-icons/crypto";

import * as Icons from "../../atoms/Icons";

import * as S from "./styles";
import * as T from "./types";

export const Icon = ({
  name = "Wallet",
  size = "small",
  isActive = false,
  isToken = false,
  background,
  stroke,
  color = "text",
  ...props
}: T.Props) => {
  const IconSvg = name && !isToken ? Icons[name] : Icons.Wallet;
  const TokenSvg = isToken && name ? cryptoIcons[name] : cryptoIcons.Dot;
  const IconComponent = (isToken && TokenSvg) || IconSvg;

  return (
    <S.Wrapper>
      <S.Container
        isToken={isToken}
        size={size}
        isActive={isActive}
        background={background}
        color={color}
        stroke={stroke}
        {...props}>
        <IconComponent />
      </S.Container>
    </S.Wrapper>
  );
};
