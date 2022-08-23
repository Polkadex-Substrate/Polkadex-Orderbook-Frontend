import { mergeProps } from "@react-aria/utils";
import { useRef } from "react";
import { useMenuItem } from "react-aria";

import { useDropdownContext } from "./context";
import { Selected } from "./selected";
import * as S from "./styles";
import * as T from "./types";

export const Item = ({ state, item }: T.DropdownItemAttr<object>) => {
  const componentRef = useRef<HTMLLIElement>(null);

  const { command, icon, onAction = () => {} } = item?.props;
  const context = useDropdownContext();

  const isSelectable = state.selectionManager.selectionMode !== "none";

  const {
    menuItemProps,
    isSelected,
    labelProps,
    descriptionProps,
    keyboardShortcutProps,
    isDisabled,
    isFocused,
  } = useMenuItem(
    {
      key: item.key,
      onClose: context.state.close,
      onAction,
      closeOnSelect: context.closeOnSelect,
      "aria-label": item["aria-label"],
    },
    state,
    componentRef
  );

  return (
    <S.Item
      {...mergeProps(menuItemProps, labelProps, descriptionProps)}
      isCloseOnSelect={context.closeOnSelect}
      ref={componentRef}
      isFlex={!!command || isSelectable}
      isFocused={isFocused}
      isDisabled={isDisabled}>
      <S.ItemContainer>
        {icon && <S.Icon>{icon}</S.Icon>}
        {item.rendered}
      </S.ItemContainer>
      {isSelected && <Selected />}
      {command && <S.Command {...keyboardShortcutProps}>{command}</S.Command>}
    </S.Item>
  );
};
