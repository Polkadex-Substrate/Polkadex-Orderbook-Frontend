import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ percent?: number }>`
  ${({ theme, percent }) => css`
    width: 100%;
    height: 0.5rem;
    background: ${theme.colors.secondaryBackground};
    border-radius: 1rem;
    div {
      width: ${percent}%;
      height: 100%;
      background: ${theme.colors.primary};
      border-radius: 1rem;
    }
  `}
`;
