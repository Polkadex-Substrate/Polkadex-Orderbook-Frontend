import { DefaultTheme } from "styled-components";
import { variant } from "styled-system";

import * as T from "./types";

export const isFullVariant = variant({
  prop: "isFull",
  variants: {
    true: {
      width: "100%",
    },
  },
});
export type Props = {
  theme?: DefaultTheme;
  fill?: T.Colors;
};
export const bgStyleVariants = ({ theme, fill }: Props) =>
  variant({
    prop: "bgStyle",
    variants: {
      flat: {
        backgroundColor: fill,
      },
      ghost: {
        backgroundColor: `${theme.colors[fill]}33`,
      },
      outline: {
        backgroundColor: `${theme.colors[fill]}33`,
        borderColor: fill,
        borderWidth: "2px",
        borderStyle: "solid",
      },
      transparent: {
        backgroundColor: "transparent",
        borderColor: "transparent",
      },
    },
  });

export const borderVariants = variant({
  prop: "border",
  variants: {
    semiRounded: {
      borderRadius: "1rem",
    },
    rounded: {
      borderRadius: "5rem",
    },
    squared: {
      borderRadius: "none",
    },
  },
});
