import styled, { css } from "styled-components";
import { color, variant } from "styled-system";

import * as T from "./types";

import { bgStyleVariants } from "@polkadex/orderbook/helpers/variants";
import { Direction } from "@polkadex/web-helpers";

export const Header = styled("div")({
  position: "relative",
});
export const HeaderContent = styled("div")<{ isString?: boolean }>(
  {
    padding: "2rem",
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
    padding: "1rem",
    borderRadius: "5rem",
    transition: "background 0.3s ease-in",
    "& svg": {
      width: "2rem",
      height: "2rem",
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

export const Container = styled("div")<T.ModalStyleProps>(
  {
    minWidth: "40rem",
  },
  variant({
    prop: "border",
    variants: {
      semiRounded: {
        borderRadius: "1rem",
      },
      rounded: {
        borderRadius: "2rem",
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

export const Overlay = styled("div")<{
  isBlur?: boolean;
  placement: Direction;
  isFull?: boolean;
}>(
  ({ isFull }) =>
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
        opacity: 0.5,
        transition: "opacity 100ms linear",
        [Container]: {
          opacity: 0.75,
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
        backdropFilter: "saturate(180%) blur(5px)",
      },
    },
  }),
  variant({
    prop: "placement",
    variants: {
      "bottom left": {
        alignItems: "flex-end",
        [Container]: {
          marginBottom: "2rem",
          marginLeft: "2rem",
        },
      },
      "bottom right": {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        [Container]: {
          marginBottom: "2rem",
          marginRight: "2rem",
        },
      },
      "bottom start": {
        alignItems: "flex-end",
        justifyContent: "center",
        [Container]: {
          marginBottom: "2rem",
        },
      },
      "top right": {
        justifyContent: "flex-end",
        alignItems: "flex-start",
        [Container]: {
          marginTop: "2rem",
          marginRight: "2rem",
        },
      },
      "top left": {
        alignItems: "flex-start",
        [Container]: {
          marginTop: "2rem",
          marginLeft: "2rem",
        },
      },
      "top start": {
        alignItems: "flex-start",
        justifyContent: "center",
        [Container]: {
          marginTop: "2rem",
        },
      },
      "start right": {
        justifyContent: "flex-end",
        alignItems: "center",
        [Container]: {
          marginRight: "2rem",
        },
      },
      "start left": {
        alignItems: "center",
        [Container]: {
          padding: "2rem 2rem 2rem 2rem",
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
