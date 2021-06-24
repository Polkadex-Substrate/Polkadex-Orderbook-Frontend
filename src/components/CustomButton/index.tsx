import * as React from "react";
import { CustomIcon, CustomIconToken } from "src/components";

import * as S from "./styles";
import Props from "./types";

export const CustomButton = ({
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
      <CustomIcon {...icon} />
    ) : (
      token && <CustomIconToken {...token} />
    )}

    {title}
  </S.Wrapper>
);
