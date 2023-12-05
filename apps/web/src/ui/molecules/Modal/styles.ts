import styled, { css } from "styled-components";
import { color, variant } from "styled-system";
import { bgStyleVariants, Direction } from "@orderbook/core/helpers";

import * as T from "./types";

import { normalizeValue } from "@/utils/normalize";

export const Header = styled("div")({
  position: "relative",
});
export const HeaderContent = styled("div")<{ isString?: boolean }>(
  {
    padding: normalizeValue(2),
  },
  variant({
    prop: "isString",
    variants: {
      true: {
        textAlign: "center",
      },
    },
  })
);

export const HeaderClose = styled("button")(({ theme }) =>
  css({
    position: "absolute",
    top: 0,
    right: 0,
    padding: normalizeValue(1),
    borderRadius: normalizeValue(5),
    transition: "background 0.3s ease-in",
    "& svg": {
      width: normalizeValue(2),
      height: normalizeValue(2),
    },
    "&:hover": {
      background: `${theme.colors.text}11`,
    },
  })
);

export const ClosePath = styled("path")(({ theme }) =>
  css({
    stroke: theme.colors.text,
    opacity: 0.5,
  })
);

export const Container: any = styled("div")<T.ModalStyleProps>(
  variant({
    prop: "border",
    variants: {
      semiRounded: {
        borderRadius: normalizeValue(1),
      },
      rounded: {
        borderRadius: normalizeValue(2),
      },
      squared: {
        borderRadius: "none",
      },
    },
  }),
  variant({
    prop: "isFull",
    variants: {
      true: {
        width: "100%",
        height: "100%",
      },
    },
  }),
  variant({
    prop: "isFullWidth",
    variants: {
      true: {
        width: "100%",
      },
    },
  }),
  variant({
    prop: "isFullHeight",
    variants: {
      true: {
        height: "100%",
      },
    },
  }),
  bgStyleVariants,
  color
);

export const Overlay = styled("div")<
  {
    isBlur?: boolean;
    placement: Direction;
    isFull?: boolean;
  } & T.ModalProps
>(
  () =>
    css({
      position: "fixed",
      zIndex: 100,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: "rgba(0, 0, 0, 0.2)",
      display: "flex",
      "&.enter": {
        opacity: 0,
        [Container]: {
          opacity: 0,
          transform: "scale(0.95)",
          transition: "opacity 120ms, transform 120ms",
        },
      },
      "&.enter-active": {
        opacity: 1,
        transition: "opacity 100ms linear",
        [Container]: {
          opacity: 1,
          transform: " scale(1.05)",
        },
      },
      "&.enter-done": {
        opacity: 1,
        [Container]: {
          opacity: 1,
          transform: "scale(1)",
          transition: "opacity 120ms, transform 120ms ease-out",
        },
      },
      "&.exit": {
        opacity: 1,
        [Container]: {
          opacity: 1,
          transform: "scale(1)",
        },
      },
      "&.exit-active": {
        opacity: 0.5,
        transition: "opacity 100ms linear",
        [Container]: {
          opacity: 0,
          transform: "scale(0.5)",
          transition: "opacity 60ms, transform 60ms",
        },
      },
    }),
  variant({
    prop: "isBlur",
    variants: {
      true: {
        backdropFilter: "blur(5px)",
      },
    },
  }),
  variant({
    prop: "placement",
    variants: {
      "bottom left": {
        alignItems: "flex-end",
        [Container]: {
          marginBottom: normalizeValue(2),
          marginLeft: normalizeValue(2),
        },
      },
      "bottom right": {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        [Container]: {
          marginBottom: normalizeValue(2),
          marginRight: normalizeValue(2),
        },
      },
      "bottom start": {
        alignItems: "flex-end",
        justifyContent: "center",
        [Container]: {
          marginBottom: normalizeValue(2),
        },
      },
      "top right": {
        justifyContent: "flex-end",
        alignItems: "flex-start",
        [Container]: {
          marginTop: normalizeValue(2),
          marginRight: normalizeValue(2),
        },
      },
      "top left": {
        alignItems: "flex-start",
        [Container]: {
          marginTop: normalizeValue(2),
          marginLeft: normalizeValue(2),
        },
      },
      "top start": {
        alignItems: "flex-start",
        justifyContent: "center",
        [Container]: {
          marginTop: normalizeValue(2),
        },
      },
      "start right": {
        justifyContent: "flex-end",
        alignItems: "center",
      },
      "start left": {
        alignItems: "center",
        [Container]: {
          padding: `${normalizeValue(2)} ${normalizeValue(2)} ${normalizeValue(
            2
          )} ${normalizeValue(2)}`,
        },
      },
      start: {
        alignItems: "center",
        justifyContent: "center",
      },
    },
  })
);

Overlay.defaultProps = {
  placement: "start",
};

Container.defaultProps = {
  border: "rounded",
};
