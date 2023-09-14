import { useTableHeaderRow } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { forwardRef, PropsWithChildren, useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

const Header = forwardRef(
  ({
    children,
    item,
    state,
    ...props
  }: PropsWithChildren<T.HeaderForwardProps>) => {
    const componentRef = useRef<HTMLTableRowElement | null>(null);
    const { rowProps } = useTableHeaderRow({ node: item }, state, componentRef);
    return (
      <S.Header
        striped={props.striped}
        {...mergeProps(rowProps, props)}
        ref={componentRef}
      >
        {children}
      </S.Header>
    );
  }
);

Header.displayName = "Header";
export { Header };
