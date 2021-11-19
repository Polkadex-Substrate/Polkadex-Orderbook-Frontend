import styled, { css } from "styled-components";

import { Props } from "./types";

export const Wrapper = styled.div<Props>`
  ${({ theme, width, height, isLight }) => css`
    width: ${width};
    height: ${height};
    border-radius: 0.4rem;
    background: ${isLight ? theme.skeleton.inverse : theme.skeleton.default};
    background-size: 400% 400%;
    animation: pulse 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
    @keyframes pulse {
      0% {
        background-position: 0% 0%;
      }
      100% {
        background-position: -135% 0%;
      }
    }
  `}
`;
