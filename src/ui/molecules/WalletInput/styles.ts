import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    background: ${theme.colors.primaryBackground};
  `}
`;
