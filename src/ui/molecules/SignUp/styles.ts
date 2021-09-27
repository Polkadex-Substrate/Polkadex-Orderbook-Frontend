import styled, { css } from "styled-components";

import { Wrapper as InputWrapper } from "src/ui/molecules/Input/styles";

export const Wrapper = styled.ul`
  ${InputWrapper} {
    margin: 1rem 0;
  }
`;
export const Container = styled.ul`
  p {
    ${({ theme }) => css`
      font-size: ${theme.font.sizes.xxsmall};
      padding: 0 2rem;
      margin: 2rem 0;
      text-align: center;
      font-weight: 500;
    `}
  }
`;
