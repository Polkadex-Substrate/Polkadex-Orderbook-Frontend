import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

// Order Box

export const WrapperOrder = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackground};
    border-radius: 0 ${normalizeValue(2)} ${normalizeValue(2)}
      ${normalizeValue(2)};
    padding: ${normalizeValue(1)};
  `}
`;

export const ContainerWallet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${normalizeValue(2)};
`;

export const WrapperBalance = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${normalizeValue(1)};
  small {
    font-size: ${normalizeValue(1.2)};
    color: #8ba1be;
  }
`;
export const Span = styled.span`
  font-size: ${normalizeValue(1.5)};
  font-weight: bold;
  word-break: break-word;
  margin-top: ${normalizeValue(0.3)};
`;
export const ContainerForm = styled.div``;
export const WrapperActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: ${normalizeValue(1.2)};
`;
export const RangeWrapper = styled.div`
  margin-bottom: ${normalizeValue(1)};
`;

export const SliderWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackground};
    display: grid;
    grid-template-columns: auto auto auto auto;
    padding: ${normalizeValue(0.2)};
    column-gap: ${normalizeValue(0.5)};
    border-radius: ${normalizeValue(0.5)};
    margin-bottom: ${normalizeValue(1)};
  `}
`;

export const Connect = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    display: block;
    font-size: ${normalizeValue(1.3)};
    background: ${theme.colors.primaryBackground};
    color: ${theme.colors.text};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(1)};
    font-weight: 500;
    width: 100%;
    text-align: center;
    transition: background 0.2s ease;

    &:hover {
      background: ${theme.colors.primaryBackgroundOpacity};
    }
  `}
`;

export const ProtectPassword = styled.div`
  padding: ${normalizeValue(0.5)} 0 ${normalizeValue(1)} 0;
`;
export const ProtectPasswordTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${normalizeValue(1.5)};
  span {
    display: block;
    font-weight: 500;
  }
`;
export const ProtectPasswordContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Show = styled.button`
  ${({ theme }) => css`
    width: ${normalizeValue(2.2)};
    height: ${normalizeValue(2.2)};
    padding: ${normalizeValue(0.3)};
    transition: background 0.5s ease-in;
    border-radius: ${normalizeValue(10)};
    &:hover {
      background: ${theme.colors.secondaryBackground};
    }
    svg {
      stroke: ${theme.colors.text};
    }
  `}
`;

export const Error = styled.div<{ hasError: boolean }>`
  ${({ hasError }) => css`
    position: relative;
    display: ${hasError ? "inline-block" : "none"};
    border-bottom: 1px dotted black;
    top: ${normalizeValue(-2.2)};
    left: 15%;
    font-weight: 500;
  `}
`;

export const ErrorText = styled.span`
  ${({ theme }) => css`
    visibility: visible;
    width: max-content;
    background-color: ${theme.colors.primaryBackground};
    color: ${theme.colors.text};
    text-align: center;
    border-radius: 8px;
    padding: 8px;
    position: absolute;
    z-index: 1;
    top: 0%;
    left: 50%;
    &::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -6px;
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent ${theme.colors.primaryBackground}
        transparent;
    }
  `}
`;

export const ButtonSkeletonWrapper = styled.div`
  border-radius: ${normalizeValue(1)};
  margin-inline: ${normalizeValue(0.3)};
  overflow: hidden;
`;
