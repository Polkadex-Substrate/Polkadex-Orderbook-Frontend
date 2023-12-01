import styled, { css } from "styled-components";
import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${normalizeValue(1.5)};
  align-items: center;
  &:not(:last-child) {
    margin-bottom: ${normalizeValue(2)};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 550;
  }
  p {
    margin-top: ${normalizeValue(0.5)};
    line-height: 1.3;
    opacity: 0.6;
  }
  ${Icon} {
    margin-right: ${normalizeValue(1)};
  }
`;

export const Switch = styled.div<{ isActive?: boolean; disable: boolean }>`
  ${({ theme, isActive, disable }) => css`
    background: ${isActive
      ? theme.colors.primary
      : theme.colors.secondaryBackground};
    padding: ${normalizeValue(0.2)};
    border-radius: ${normalizeValue(10)};
    min-width: 3.5rem;
    height: ${normalizeValue(2)};
    position: relative;
    cursor: ${disable ? "not-allowed" : "pointer"};
    transition: background-color 0.2s ease-in-out;
    span {
      user-select: none;
    }
    user-select: ${disable ? "none" : "auto"};
    div {
      position: absolute;
      bottom: 50%;
      transform: translate(0, 50%);
      ${isActive
        ? css`
            right: 0;
          `
        : css`
            left: 0;
          `}

      margin: 0 ${normalizeValue(0.3)};
      background: ${theme.colors.white};
      width: ${normalizeValue(1.4)};
      height: ${normalizeValue(1.4)};
      border-radius: ${normalizeValue(10)};
    }
  `}
`;
