import { useMenu } from "@react-aria/menu";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import { forwardRef } from "react";
import { useTreeState } from "react-stately";

import { useDropdownContext } from "./context";
import { Item as ItemComponent } from "./item";
import { Section } from "./section";
import * as S from "./styles";
import * as T from "./types";

export const Menu: T.DropdownComponent<T.DropdownMenuProps, HTMLUListElement> =
  forwardRef(({ fill, border, bgStyle, itemFill, ...props }, ref) => {
    const context = useDropdownContext();

    const mergedProps = {
      ...mergeProps(context, props),
    };

    const state = useTreeState(mergedProps);
    const { menuProps } = useMenu(mergedProps, state, context.menuContentRef);

    return (
      <S.Menu
        fill={fill}
        border={border}
        bgStyle={bgStyle}
        itemFill={itemFill}
        ref={mergeRefs(context.menuContentRef, ref)}
        {...menuProps}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {[...state.collection].map((value) =>
          value.type === "section" ? (
            <Section key={value.key} item={value} state={state} />
          ) : (
            <ItemComponent key={value.key} item={value} state={state} />
          )
        )}
      </S.Menu>
    );
  });

Menu.displayName = "Menu";
