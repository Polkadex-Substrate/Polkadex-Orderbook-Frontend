import styled, { css, DefaultTheme } from "styled-components";
import { variant } from "styled-system";

import * as T from "./types";

import { normalizeValue } from "@/utils/normalize";

export const Table = styled.table<{ cellSpacing?: string | number }>`
  ${({ cellSpacing = 0.5 }) => css`
    border-collapse: collapse;
    border-spacing: 0 ${cellSpacing}rem;
    th,
    td {
      padding: ${normalizeValue(0.5)} ${normalizeValue(0.5)}
        ${normalizeValue(0.5)} 0;
    }
  `}
`;

export const Group = styled.thead``;
export const Cell = styled.td<{ outline?: boolean }>`
  ${({ outline }) => css`
    outline: ${outline ? "2px solid orange" : "none"};
  `}
`;

export const Header = styled.tr<Partial<T.HeaderCustomProps>>`
  ${({ theme, fill }) => css`
    ${bgStyleVariants({ theme, fill })};
    ${borderVariants({ theme, is: "th" })};
    & th {
      padding: ${normalizeValue(1)} ${normalizeValue(2)};
    }
  `}
`;

Header.defaultProps = {
  bgStyle: "flat",
  border: "semiRounded",
  fill: "secondaryBackground",
};

type ColumnProps = {
  textAlign: boolean;
  outline: boolean;
  iconVisibility: boolean;
};

export const Column = styled.th<ColumnProps>`
  ${({ textAlign, outline, iconVisibility }) => css`
    user-select: none;
    text-align: ${textAlign ? "center" : "left"};
    outline: ${outline ? "2px solid orange" : "none"};
    span {
      visibility: ${iconVisibility ? "visible" : "hidden"};
      padding: 0 2px;
    }
  `}
`;

type BodyProps = {
  isSelected: boolean;
  outline?: boolean;
  isPressed?: boolean;
  alternate?: boolean;
} & T.HeaderCustomProps;

export const Body = styled.tr<BodyProps>`
  ${({ theme, isSelected, outline }) => css`
    outline: ${outline ? "2px solid orange" : "none"};
    color: ${isSelected ? "white" : "inherit"};

    ${borderVariants({ theme, is: "td" })};
    ${variant({
      prop: "isSelected",
      variants: {
        true: {
          "& td": {
            background: `${theme.colors.primary}30`,
            color: theme.colors.primary,
          },
        },
      },
    })};

    ${variant({
      prop: "isPressed",
      variants: {
        true: {
          // background: "green",
        },
      },
    })}
    ${variant({
      prop: "alternate",
      variants: {
        true: {
          "& td": {
            padding: `${normalizeValue(1)} ${normalizeValue(2)}`,
          },
          "&:nth-child(odd)": {
            background: `${theme.colors.tertiaryBackgroundOpacity}`,
          },
        },
      },
    })}
  `}
`;

Body.defaultProps = {
  border: "semiRounded",
  fill: "secondaryBackgroundSolid",
};

type bgVariants<T> = {
  theme: DefaultTheme;
  is?: "td" | "th";
} & T;

const bgStyleVariants = ({ theme, fill }: bgVariants<T.HeaderCustomProps>) =>
  variant({
    prop: "bgStyle",
    variants: {
      flat: {
        "& th": {
          backgroundColor: fill,
        },
      },
      ghost: {
        "& th": {
          backgroundColor: `${theme.colors[fill ?? "primary"]}33`,
        },
      },
      outline: {
        "& th": {
          backgroundColor: "transparent",
          borderColor: fill,
          borderWidth: "1px",
          borderStyle: "solid",
        },
      },
      transparent: {
        "& th:": {
          backgroundColor: "transparent",
        },
      },
    },
  });

const borderVariants = ({ is = "th" }: bgVariants<T.BodyCustomProps>) =>
  variant({
    prop: "border",
    variants: {
      rounded: {
        [`& ${is}:first-child`]: {
          borderRadius: `${normalizeValue(5)} 0 0 ${normalizeValue(5)}`,
        },
        [`& ${is}:last-child`]: {
          borderRadius: `0 ${normalizeValue(5)} ${normalizeValue(5)} 0`,
        },
      },
      semiRounded: {
        [`& ${is}:first-child`]: {
          borderRadius: `${normalizeValue(1)} 0 0  ${normalizeValue(1)}`,
        },
        [`& ${is}:last-child`]: {
          borderRadius: `0 ${normalizeValue(1)} ${normalizeValue(1)} 0`,
        },
      },
    },
  });
