import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    user-select: none;
    div {
      display: flex;
      place-items: center;
      gap: 1rem;
      background: ${theme.colors.secondaryBackground};
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 0.3rem;
      padding: 0.25rem;
      svg {
        stroke: ${theme.colors.text};
      }
    }
  `}
`;
