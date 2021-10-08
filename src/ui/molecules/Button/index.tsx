import * as S from "./styles";
import Props from "./types";

import { Icon, IconToken } from "src/ui";

export const Button = ({
  title = "Button",
  size = "medium",
  icon,
  token,
  isActive = false,
  background = "secondaryBackground",
  as = "button",
  isFull = false,
  ...props
}: Props) => (
  <S.Wrapper
    as={as}
    size={size}
    isFull={isFull}
    isActive={isActive}
    background={background}
    {...props}>
    {icon || (token && icon) ? <Icon {...icon} /> : token && <IconToken {...token} />}
    {title}
  </S.Wrapper>
);
