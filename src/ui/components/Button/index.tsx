import * as S from "./styles";
import Props from "./types";

import { Icon, IconToken } from "src/ui/components";

export const Button = ({
  title = "Button",
  size = "Medium",
  icon,
  token,
  isActive = false,
  background = "secondaryBackground",
  as = "button",
  ...props
}: Props) => (
  <S.Wrapper
    as={as}
    size={size}
    isActive={isActive}
    background={background}
    {...props}
  >
    {icon || (token && icon) ? (
      <Icon {...icon} />
    ) : (
      token && <IconToken {...token} />
    )}

    {title}
  </S.Wrapper>
);
