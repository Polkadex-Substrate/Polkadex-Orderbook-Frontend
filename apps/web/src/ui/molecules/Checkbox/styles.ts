import styled, { css } from "styled-components";

import * as T from "./types";

export const Wrapper = styled("div")<T.Props>(({ theme, fill, disabled }) =>
  css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& label": {
      width: " fit-content",
      marginLeft: "0.5rem",
      userSelect: "none",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
    },
    "& input": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      appearance: "none",
      width: "1.7rem",
      height: "1.7rem",
      background: theme.colors[fill],
      borderRadius: "0.5rem",
      outline: "none",
      cursor: disabled ? "not-allowed" : "pointer",
    },
    "& input:disabled, & input:checked:disabled ": {
      background: "gray",
    },

    "& input:after": {
      position: "absolute",
      content: "' '",
      transform: "scale3d(1, 1, 1)",
      transitionProperty: "all",
      transitionDuration: "350ms",
      transitionTimingFunction: "cubic-bezier(0.53, -0.67, 0.73, 0.74)",
      width: "1.5rem",
      height: "1.5rem",
      borderRadius: "0.5rem",
      border: "1px solid",
      borderColor: theme.colors.secondaryBackground,
      zIndex: -1,
    },
    "& input:before": {
      content: "' '",
      width: "0.35rem",
      height: "0.9rem",
      border: `2px solid ${theme.colors.white}`,
      borderTop: "0",
      borderLeft: "0",
      transform: "rotate(45deg)",
      position: "absolute",
      top: "0.1rem",
      opacity: "0",
    },
    "& input:hover:after": {
      transform: "scale3d(1.3, 1.3, 1.2)",
      transitionTimingFunction: "cubic-bezier(0.37, 0.74, 0.15, 1.65)",
    },
    "& input:checked": {
      borderColor: theme.colors.primary,
      background: theme.colors.primary,
      animation: "shrink-bounce 200ms cubic-bezier(.4,.0,.23,1)",
    },
    "& input:checked:before": {
      opacity: 1,
    },
  }),
);
Wrapper.defaultProps = {
  fill: "secondaryBackground",
};
