import * as S from "./styles";
import { ITokenProps, Props } from "./types";

import * as Icons from "src/ui/atoms/Icons";
import * as Tokens from "src/ui/atoms/Tokens";
import { Skeleton } from "src/ui";

export const Icon = ({
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
      {...props}>
      <Icon />
    </S.WrapperIcon>
  );
};

export const IconToken = ({
  icon,
  size = "medium",
  background = "secondaryBackground",
  ...props
}: ITokenProps) => {
  const Icon = icon ? Tokens[icon.toUpperCase()] : Tokens.PDEX;
  if (!icon) return <Skeleton width="2.5rem" height="2.5rem" />;
  return (
    <S.WrapperToken size={size} background={background} {...props}>
      <Icon />
    </S.WrapperToken>
  );
};
