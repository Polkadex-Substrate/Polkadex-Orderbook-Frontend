import styled, { css } from "styled-components";

import { InputProps } from ".";

import { normalizeValue } from "@/utils/normalize";

const inputModifier = {
  Flex: () => css`
    display: flex;
    flex-direction: row;
  `,
};

export const Wrapper = styled.div`
  margin-bottom: ${normalizeValue(2)};
`;
export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${normalizeValue(1.2)};
    color: ${theme.colors.text};
    font-weight: 500;
    svg {
      display: inline-block;
      width: ${normalizeValue(1.1)};
      height: ${normalizeValue(1.1)};
      margin-right: ${normalizeValue(0.5)};
    }
  `}
`;
export const Box = styled.div<Partial<InputProps>>`
  ${({ theme, inputInfo, fullWidth, hasError }) => css`
    padding: ${normalizeValue(1)};
    border-bottom: ${normalizeValue(0.1)} solid
      ${theme.colors.secondaryBackground};
    width: ${fullWidth ? "100%" : normalizeValue(20)};
    transition: border 0.3s ease-in-out;
    ${inputInfo && inputModifier.Flex()}
    &:hover {
      border-bottom-color: ${theme.colors.text};
    }
    ${hasError &&
    css`
      border-bottom-color: ${theme.colors.primary} !important;
    `}
  `}
`;
export const Span = styled.span`
  color: #8ba1be;
  font-size: ${normalizeValue(1.3)};
`;

export const Input = styled.input`
  ${({ theme }) => css`
    width: 100%;
    color: ${theme.colors.text};
  `}
`;
