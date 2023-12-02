import styled, { css } from "styled-components";
import { variant } from "styled-system";

import * as T from "./types";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled("svg")<T.Props>(
  ({ theme, color }) =>
    css({
      fill: color && theme.colors[color],
      stroke: color && theme.colors[color],
    }),
  variant({
    prop: "size",
    variants: {
      mini: {
        width: normalizeValue(0.6),
        height: normalizeValue(0.6),
      },
      small: {
        width: normalizeValue(1.5),
        height: normalizeValue(1.5),
      },
      extraSmall: {
        width: normalizeValue(2.5),
        height: normalizeValue(2.5),
      },
      medium: {
        width: normalizeValue(2.5),
        height: normalizeValue(2.5),
      },
      large: {
        width: normalizeValue(4),
        height: normalizeValue(4),
      },
    },
  })
);
export const Points = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  ${Wrapper} {
    height: fit-content;
    margin-left: ${normalizeValue(0.4)};
  }
`;

Wrapper.defaultProps = {
  size: "medium",
  color: "secondary",
};
