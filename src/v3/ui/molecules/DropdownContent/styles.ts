import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: ${theme.colors.primaryBackground};
    border-radius: 1rem;
    padding: 1rem;
    user-select: none;
  `}
`;
