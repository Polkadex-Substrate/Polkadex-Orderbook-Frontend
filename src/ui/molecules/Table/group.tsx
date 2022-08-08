import { useTableRowGroup } from "@react-aria/table";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import { forwardRef, PropsWithChildren, Ref, useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

const Group = forwardRef(
  ({ children, ...props }: PropsWithChildren<T.GroupProps>, ref: Ref<HTMLTableRowElement>) => {
    const componentRef = useRef();

    const { rowGroupProps } = useTableRowGroup();

    return (
      <S.Group {...mergeProps(rowGroupProps, props)} ref={mergeRefs(componentRef, ref)}>
        {children}
      </S.Group>
    );
  }
);

Group.displayName = "Group";
export { Group };
