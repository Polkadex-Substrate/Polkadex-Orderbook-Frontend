import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    padding: 1.5rem;
    max-width: 35rem;
    border-radius: 0 2.5rem 2.5rem 2.5rem;
  `}
`;
export const Container = styled.div``;
