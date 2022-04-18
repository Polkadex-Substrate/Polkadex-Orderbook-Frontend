import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: white;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    width: fit-content;
    margin: 1rem auto;
    svg {
      width: inherit;
    }
  `}
`;
