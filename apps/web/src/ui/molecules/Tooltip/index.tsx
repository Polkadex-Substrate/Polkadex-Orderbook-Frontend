import {
  createElement,
  useRef,
  Children,
  useEffect,
  useState,
  cloneElement,
} from "react";

import * as S from "./styles";
import * as T from "./types";

export const Tooltip = ({ children }: Pick<T.Props, "children">) => {
  const tooltipRef = useRef(null);
  const [state, setState] = useState(false);
  let HeaderComponent;
  let ContentComponent;
  Children.forEach(children, (child) => {
    if ((child as any).type.displayName === "TooltipHeader") {
      HeaderComponent = cloneElement(child as any, {
        "data-id": "tooltip-button",
      });
    } else if ((child as any).type.displayName === "TooltipContent") {
      ContentComponent = cloneElement(child as any);
    }
  });
  return (
    <S.Wrapper
      data-id="tooltip"
      ref={tooltipRef}
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
    >
      {HeaderComponent}
      {state && ContentComponent}
    </S.Wrapper>
  );
};
export const TooltipHeader = ({
  as = "div",
  children,
  ...props
}: T.TooltipHeaderProps) => {
  // eslint-disable-next-line react/no-children-prop
  return createElement(as, { ...props, children });
};

TooltipHeader.displayName = "TooltipHeader";
export const TooltipContent = ({
  position = "top",
  minWidth = "100%",
  background = "secondaryBackgroundSolid",
  onDisplay,
  onDismiss,
  children,
  priority = "low",
  ...props
}: T.TooltipContentProps) => {
  useEffect(() => {
    // called when mounted
    onDisplay && onDisplay();
    // called when unmounted
    return () => {
      onDismiss && onDismiss();
    };
  }, [onDismiss, onDisplay]);
  return (
    <S.Content
      position={position}
      minWidth={minWidth}
      background={background}
      priority={priority}
      role="tooltip"
      data-id="tooltip-content"
      {...props}
    >
      {children}
    </S.Content>
  );
};

TooltipContent.displayName = "TooltipContent";
