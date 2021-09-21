import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: ${theme.font.sizes.xsmall};
    span {
      margin: 0 0.5rem;
    }
  `}
`;
