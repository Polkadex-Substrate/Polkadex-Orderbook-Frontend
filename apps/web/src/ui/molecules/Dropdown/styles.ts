import styled, { css } from "styled-components";
import { color, variant } from "styled-system";
import { bgStyleVariants } from "@orderbook/core/helpers";

import * as T from "./types";

import { normalizeValue } from "@/utils/normalize";

export const Item: any = styled("li")<{
  isCloseOnSelect?: boolean;
  isFlex?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
  withDivider?: boolean;
}>(
  {
    padding: `${normalizeValue(0.8)} ${normalizeValue(1)}`,
    outline: "none",
    border: "1px solid transparent",
    fontSize: normalizeValue(1.3),
  },
  variant({
    prop: "isCloseOnSelect",
    variants: {
      true: {
        cursor: "pointer",
      },
    },
  }),
  variant({
    prop: "isFlex",
    variants: {
      true: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
  }),
  variant({
    prop: "isDisabled",
    variants: {
      true: {
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },
  }),
  () =>
    variant({
      prop: "isFocused",
      variants: {
        true: {
          // borderColor: theme.colors.primary,
        },
      },
    }),
  ({ theme }) =>
    variant({
      prop: "withDivider",
      variants: {
        true: {
          "&:not(:last-child)": {
            borderBottom: `1px solid ${theme.colors.text}33`,
          },
        },
      },
    })
);

export const Section = styled("li")({});

export const SectionTitle = styled("div")({
  padding: `${normalizeValue(0.8)} ${normalizeValue(1)} ${normalizeValue(
    0.4
  )} ${normalizeValue(1)}`,
  fontSize: normalizeValue(1.2),
  opacity: 0.5,
});

export const ItemContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: normalizeValue(0.6),
});

export const Icon = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const Command: any = styled("div")(({ theme }) =>
  css({
    padding: normalizeValue(0.4),
    border: "1px solid",
    borderColor: `${theme.colors.text}44`,
    fontSize: normalizeValue(1),
    textTransform: "uppercase",
    opacity: 0.5,
  })
);

export const SectionContainer = styled("ul")(() => css({}));

export const Menu = styled("ul")<T.DropdownMenuProps>(
  ({ theme, fill, itemFill }) => css`
    background: ${fill && theme.colors[fill]};
    min-width: ${normalizeValue(20)};
    border: 1px solid ${theme.colors.text}11;
    ${Item} {
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: ${itemFill && theme.colors[itemFill]}11;
      }
    }
  `,
  variant({
    prop: "border",
    variants: {
      semiRounded: {
        borderRadius: normalizeValue(1),
        padding: `${normalizeValue(0.8)} ${normalizeValue(0.7)}`,
        [Item]: {
          borderRadius: normalizeValue(0.7),
        },
        [Command]: {
          borderRadius: normalizeValue(0.2),
        },
      },
      rounded: {
        borderRadius: normalizeValue(1.3),
        padding: `${normalizeValue(0.8)} ${normalizeValue(0.7)}`,
        [Item]: {
          borderRadius: normalizeValue(1),
        },
        [Command]: {
          borderRadius: normalizeValue(0.5),
        },
      },
      squared: {
        borderRadius: "none",
      },
    },
  }),
  color
);

export const Selected = styled("path")(({ theme }) =>
  css({
    stroke: theme.colors.text,
  })
);

export const Divider = styled("div")(({ theme }) =>
  css({
    borderTop: "1px solid",
    borderTopColor: `${theme.colors.text}11`,
    margin: `${normalizeValue(0.8)} 0`,
  })
);

Menu.defaultProps = {
  fill: "secondaryBackground",
  border: "rounded",
  itemFill: "text",
};
