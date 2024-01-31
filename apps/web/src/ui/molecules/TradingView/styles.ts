import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const LoadingWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: 100%;
    z-index: 20;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    svg {
      width: ${normalizeValue(3)};
      height: ${normalizeValue(3)};
    }
  `}
`;

export const LoadingeMessage = styled.div`
  display: flex;
  align-items: center;
  background: gray;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  transition: width 0.5s ease-in-out;
  gap: ${normalizeValue(1)};
`;

export const Container = styled.div<{ isVisible: boolean }>`
  ${({ isVisible }) => css`
    visibility: ${isVisible ? "visible" : "hidden"};
    flex: 1;
    height: 100%;
    height: 38vh;
    min-height: ${normalizeValue(48.5)};
    @media screen and (min-height: 1200px) {
      height: 42vh;
    }
  `}
`;

export const ToolTip = styled.div`
  position: absolute;
  z-index: 9999;
  span {
    margin: 8px;
  }
`;
