import styled, { css } from "styled-components";
import media from "styled-media-query";

import { normalizeValue } from "@/utils/normalize";

export const Tr = styled.tr`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: ${normalizeValue(1.2)};
    border-radius: 0 ${normalizeValue(1)} ${normalizeValue(1)}
      ${normalizeValue(1)};
    &:nth-child(even) {
      background: ${theme.colors.tertiaryBackgroundOpacity};
    }
  `}
`;
export const Td = styled.td``;
export const ContainerFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    width: ${normalizeValue(2.5)};
    height: ${normalizeValue(2.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(38)};
    margin-right: ${normalizeValue(0.5)};
    svg {
      width: ${normalizeValue(1.5)};
      height: ${normalizeValue(1.5)};
      fill: ${isSell ? theme.colors.primary : theme.colors.green};
    }
  `}
`;
export const ContainerActions = styled.div`
  ${({ theme }) => css`
    button {
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      font-size: ${normalizeValue(1.2)};
      border-radius: ${normalizeValue(0.3)};
      white-space: nowrap;
      padding: ${normalizeValue(0.3)};
      transition: background 0.5s ease-in-out;
      &:hover {
        background: ${theme.colors.primary}99;
      }
    }

    ${media.lessThan("large")`
      justify-content:flex-start;
    `}
  `}
`;
export const Tag = styled.span`
  display: block;
  margin-bottom: ${normalizeValue(1)};
  display: none;
  opacity: 0.5;
  ${media.lessThan("large")`
    display: block;
  `}
`;
