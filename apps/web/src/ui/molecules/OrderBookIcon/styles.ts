import styled, { css } from "styled-components";

import { OrderBookProps } from ".";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div<Partial<OrderBookProps>>`
  ${({ active, theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: ${active ? theme.colors.text : theme.colors.primaryBackground};
    height: ${normalizeValue(2)};
    width: ${normalizeValue(2)};
    padding: ${theme.spacings.xxxsmall};
    border-radius: ${normalizeValue(0.5)};
    img {
      width: 100%;
      height: 100%;
    }
  `}
`;

export const Image = styled.img`
  width: 100%;
`;
