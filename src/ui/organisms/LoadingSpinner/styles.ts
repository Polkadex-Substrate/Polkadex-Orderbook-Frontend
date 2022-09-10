import styled, { css } from "styled-components";

export const Wrapper = styled.header`
  ${({ theme }) => css`
    height: 100vh;
    width: 100vh;
    background: ${theme.colors.primaryBackground};
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;
