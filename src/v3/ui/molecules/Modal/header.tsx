import { PropsWithChildren } from "react";

import { Close } from "./Close";
import { useModalContext } from "./context";
import * as S from "./styles";

export const Header = ({
  children,
  closeButton,
}: PropsWithChildren<{ closeButton?: boolean }>) => {
  const { onClose } = useModalContext();
  const isString = typeof children === "string";
  return (
    <S.Header>
      <S.HeaderContent isString={isString}>{children}</S.HeaderContent>
      {closeButton && (
        <S.HeaderClose type="button" onClick={onClose}>
          <Close />
        </S.HeaderClose>
      )}
    </S.Header>
  );
};
