import styled, { css } from "styled-components";

import * as T from "./types";

export const Wrapper = styled.div<T.Props>`
  ${({ theme, isActive, isLoading }) => css`
    display: flex;
    align-items: center;
    div {
      margin-right: 0.5rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: ${isActive ? theme.colors.green : theme.colors.primary};
      ${isLoading &&
      css`
        background: ${theme.colors.orange};
      `}
    }
    p {
      font-weight: 500;
    }
  `}
`;

export const Message = styled.p`
  text-align: center;
`;
