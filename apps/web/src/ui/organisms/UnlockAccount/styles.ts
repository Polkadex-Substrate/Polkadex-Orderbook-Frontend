import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: ${normalizeValue(1.5)};
    padding: ${normalizeValue(3)};
    form {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: ${normalizeValue(1)};
    }
  `}
`;
export const Icon = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: ${normalizeValue(4.5)};
    height: ${normalizeValue(4.5)};
    padding: ${normalizeValue(1.3)};
    border-radius: ${normalizeValue(10)};
    background: ${theme.colors.primaryBackground};
    margin: 0 auto;
    margin-bottom: ${normalizeValue(2)};
    svg {
      position: relative;
      z-index: 1;
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
    }
    :after {
      content: "";
      top: 0;
      left: 0;
      position: absolute;
      width: ${normalizeValue(4.5)};
      height: ${normalizeValue(4.5)};
      border-radius: ${normalizeValue(10)};
      transform: scale(1.5);
      border-radius: ${normalizeValue(10)};
      background: ${theme.colors.primaryBackground}55;
    }
  `}
`;

export const Title = styled.div`
  text-align: center;
  margin-bottom: ${normalizeValue(2)};
  padding-bottom: ${normalizeValue(2)};
  h2 {
    font-size: ${normalizeValue(2)};
    font-weight: 500;
    margin-bottom: ${normalizeValue(0.8)};
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
  align-self: center;
  max-width: ${normalizeValue(24)};
  margin: ${normalizeValue(2)} auto 0 auto;
  width: 100%;
`;
export const Button = styled.button<{ color?: string }>`
  ${({ theme, color }) => css`
    display: block;
    padding: ${normalizeValue(1.5)} ${normalizeValue(1.2)};
    border-radius: ${normalizeValue(0.8)};
    font-size: ${normalizeValue(1.6)};
    background: ${color ? theme.colors[color] : "transparent"};
    flex: 1;
  `}
`;
