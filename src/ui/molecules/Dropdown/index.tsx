import { useState, useEffect, useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

export const useDropdown = ({ el, initialState, isClickable }) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (el.current !== null || (el.current !== undefined && !el.current.contains(e.target)))
        setIsOpen(!isOpen);
    };

    if (isClickable && isOpen) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isOpen, el, isClickable]);

  return {
    isOpen,
    setIsOpen,
  };
};

export const Dropdown = ({
  header = "Header",
  children = "Content",
  direction = "centerRight",
  isOpacity = false,
  isClickable = false,
  priority = "low",
  isFull = true,
  ...props
}: T.Props) => {
  const dropdownRef = useRef(null);
  const { isOpen, setIsOpen } = useDropdown({
    el: dropdownRef,
    initialState: false,
    isClickable: false,
  });

  const toogleDropdown = () => setIsOpen(!isOpen);

  return (
    <S.Wrapper isOpen={isOpen} priority={priority}>
      <S.Header onClick={toogleDropdown}> {header} </S.Header>
      <S.Content
        ref={dropdownRef}
        aria-hidden={!isOpen}
        direction={direction}
        isFull={isFull}
        {...props}>
        {children}
      </S.Content>
      <S.Overlay isOpacity={isOpacity} aria-hidden={!isOpen} onClick={toogleDropdown} />
    </S.Wrapper>
  );
};
