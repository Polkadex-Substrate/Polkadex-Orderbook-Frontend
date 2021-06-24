import { Wrapper as IconWrapper } from "src/components/CustomIcon/styles";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    transition: 0.3s ease-in;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 1rem;

    span {
      font-size: ${theme.font.sizes.xsmall};
    }
    ${IconWrapper}:active {
      background: ${theme.colors.primary};
    }
    button {
      cursor: pointer;
      :nth-child(2) {
        margin: 0 1rem;
      }
    }
  `}
`;
