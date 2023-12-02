import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: max-content;
`;

export const Switch = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: ${normalizeValue(6.3)};
    height: ${normalizeValue(3.4)};
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: ${normalizeValue(0.4)};
    padding: 4px;
    transition: 300ms all;

    &:before {
      transition: 300ms all;
      content: "";
      position: absolute;
      width: ${normalizeValue(2.4)};
      height: ${normalizeValue(3.4)};
      border-radius: ${normalizeValue(0.4)};
      top: 50%;
      right: 0;
      background: ${theme.colors.secondaryBackgroundOpacity};
      transform: translate(0, -50%);
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    opacity: 0;
    position: absolute;

    &:checked + ${Switch} {
      &:before {
        transform: translate(${normalizeValue(-4)}, -50%);
        background: ${theme.colors.primary};
      }
    }
  `}
`;

export const Text = styled.div<{ checked: boolean }>`
  ${({ checked }) => css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${checked ? normalizeValue(2.5) : normalizeValue(0.6)};
    transition: 0.2s;
    color: ${checked ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)"};
  `}
`;
