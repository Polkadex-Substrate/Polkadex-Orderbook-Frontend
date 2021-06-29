import * as React from "react";
import * as Icons from "src/components/Icons";
import * as Tokens from "src/assets/tokens";

import * as S from "./styles";
import { ITokenProps, Props } from "./types";

export const CustomIcon = ({
  icon = "Wallet",
  size = "normal",
  isActive = false,
  background = "secondaryBackground",
  hoverable = false,
  ...props
}: Props) => {
  const Icon = Icons[icon];
  return (
    <S.WrapperIcon
      size={size}
      isActive={isActive}
      background={background}
      hoverable={hoverable}
      {...props}
    >
      <Icon />
    </S.WrapperIcon>
  );
};

export const CustomIconToken = ({
  icon,
  size = "medium",
  background = "secondaryBackground",
  ...props
}: ITokenProps) => {
  const iconToken = icon ? Tokens[icon.toUpperCase()] : Tokens.PDEX;

  return (
    <S.WrapperToken size={size} background={background} {...props}>
      <img src={iconToken} alt={`Token ${icon} icon`} />
    </S.WrapperToken>
  );
};
