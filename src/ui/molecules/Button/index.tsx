import { Icon } from "../";

import * as S from "./styles";
import * as T from "./types";

export const Button = ({
  isFull = false,
  icon,
  background = "text",
  color = "inverse",
  children,
  size = "medium",
  hoverColor = "primary",
  ...props
}: T.Props) => (
  <S.Wrapper
    size={size}
    background={background}
    color={color}
    isFull={isFull}
    hasIcon={!!icon}
    isDisabled={props.disabled}
    hoverColor={hoverColor}
    {...props}>
    {!!icon && <Icon {...icon} />}
    {children}
  </S.Wrapper>
);
