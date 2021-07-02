import * as React from "react";
import { useState } from "react";

import * as S from "./styles";
import { Props } from "./types";

export const CustomDropdown = ({
  title,
  children,
  direction = "left",
  isOpacity = false,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <S.Wrapper isOpen={isOpen} >
      <S.Header onClick={() => setIsOpen(!isOpen)}> {title} </S.Header>
      <S.Content aria-hidden={!isOpen} direction={direction} {...props}>
        {children}
      </S.Content>
      <S.Overlay
        isOpacity={isOpacity}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
    </S.Wrapper>
  );
};
