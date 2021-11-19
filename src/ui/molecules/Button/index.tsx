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
  ...props
}: T.Props) => (
  <S.Wrapper
    size={size}
    background={background}
    color={color}
    isFull={isFull}
    hasIcon={!!icon}
    {...props}>
    {!!icon && <Icon {...icon} />}
    {children}
  </S.Wrapper>
);
