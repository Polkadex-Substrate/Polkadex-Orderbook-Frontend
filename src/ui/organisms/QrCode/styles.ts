import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
  `}
`;
