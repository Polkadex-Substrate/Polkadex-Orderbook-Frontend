import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    position: relative;
    h3 {
      display: block;
      margin: 1rem 0 0.5rem 0;
      font-size: 2rem;
    }
  `}
`;
