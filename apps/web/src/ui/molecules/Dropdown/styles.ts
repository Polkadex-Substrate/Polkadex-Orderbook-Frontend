import styled, { css } from "styled-components";
import { color, variant } from "styled-system";
import { bgStyleVariants } from "@orderbook/core/helpers";

import * as T from "./types";

export const Item: any = styled("li")<{
  isCloseOnSelect?: boolean;
  isFlex?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
  withDivider?: boolean;
}>(
  {
    padding: "0.8rem 1rem",
    outline: "none",
    border: "1px solid transparent",
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
  padding: "0.8rem 1rem 0.4rem 1rem",
  fontSize: "1.2rem",
  opacity: 0.5,
});

export const ItemContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const Icon = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const Command: any = styled("div")(({ theme }) =>
  css({
    padding: "0.4rem",
    border: "1px solid",
    borderColor: `${theme.colors.text}44`,
    fontSize: "1rem",
    textTransform: "uppercase",
    opacity: 0.5,
  })
);

export const SectionContainer = styled("ul")(() => css({}));

export const Menu = styled("ul")<T.DropdownMenuProps>(
  ({ theme, fill, itemFill }) => css`
    background: ${fill && theme.colors[fill]};
    min-width: 20rem;
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
        borderRadius: "1rem",
        padding: "0.8rem 0.7rem",
        [Item]: {
          borderRadius: "0.7rem",
        },
        [Command]: {
          borderRadius: "0.2rem",
        },
      },
      rounded: {
        borderRadius: "1.3rem",
        padding: "0.8rem 0.7rem",
        [Item]: {
          borderRadius: "1rem",
        },
        [Command]: {
          borderRadius: "0.5rem",
        },
      },
      squared: {
        borderRadius: "none",
      },
    },
  }),
  color,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  bgStyleVariants
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
    margin: "0.8rem 0",
  })
);

Menu.defaultProps = {
  fill: "secondaryBackground",
  border: "rounded",
  itemFill: "text",
};
