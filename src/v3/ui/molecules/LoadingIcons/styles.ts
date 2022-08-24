import styled, { css } from "styled-components";
import { variant } from "styled-system";

import * as T from "./types";

export const Wrapper = styled("svg")<T.Props>(
  ({ theme, color }) =>
    css({
      fill: theme.colors[color],
      stroke: theme.colors[color],
    }),
  variant({
    prop: "size",
    variants: {
      mini: {
        width: "0.8rem",
        height: "0.8rem",
      },
      small: {
        width: "1.5rem",
        height: "1.5rem",
      },
      extraSmall: {
        width: "2.5rem",
        height: "2.5rem",
      },
      medium: {
        width: "3rem",
        height: "3rem",
      },
      large: {
        width: "4rem",
        height: "4rem",
      },
    },
  })
);
export const Points = styled("div")`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    ${Wrapper} {
      height: fit-content;
      margin-left: 0.4rem;
    }
  `}
`;

Wrapper.defaultProps = {
  size: "medium",
  color: "secondary",
};
