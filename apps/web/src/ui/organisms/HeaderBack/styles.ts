import styled, { css } from "styled-components";
import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
import { Wrapper as SwitchWrapper } from "@polkadex/orderbook-ui/molecules/ThemeSwitch/styles";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.header`
  ${({ theme }) => css`
    position: fixed;
    width: 100%;
    background: ${theme.colors.gradientBackground};
    box-shadow: ${theme.shadows.primary};
    padding: ${normalizeValue(0.5)} ${normalizeValue(1)};
    z-index: ${theme.layers.alwaysOnTop};
    max-height: ${normalizeValue(4.9)};
  `}
`;

export const Container = styled.div`
  max-width: 1 ${normalizeValue(40)};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:last-child {
    flex-direction: row;
    align-items: center;
    ${SwitchWrapper} {
      margin-right: ${normalizeValue(0.5)};
    }
  }
`;

export const HeaderBack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    ${Icon} {
      animation: arrowLeft 1.2s infinite cubic-bezier(0.5, 0, 0.5, 1);
      @keyframes arrowLeft {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX${normalizeValue(0.5)};);
        }
        100% {
          transform: translateX(0);
        }
      }
    }
  }
`;

export const HeaderBackContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${normalizeValue(2)} 0;
  gap: ${normalizeValue(1)};
  cursor: pointer;
  transition: opacity 0.5s ease-in-out;
`;
