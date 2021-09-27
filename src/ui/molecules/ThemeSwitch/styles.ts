import styled, { css } from "styled-components";

import { Wrapper as IconWrapper } from "src/ui/components/Icon/styles";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    transition: 0.3s ease-in;
    cursor: pointer;
    & span {
      font-size: ${theme.font.sizes.xsmall};
    }
    ${IconWrapper}:active {
      background: ${theme.colors.primary};
    }
  `}
`;
