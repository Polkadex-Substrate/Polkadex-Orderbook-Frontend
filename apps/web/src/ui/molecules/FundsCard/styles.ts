import styled, { css } from "styled-components";
import media from "styled-media-query";
import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

import { normalizeValue } from "@/utils/normalize";

export const Tr = styled.tr`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: ${normalizeValue(1.2)};
    margin-bottom: ${normalizeValue(1.2)};
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
export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
  margin-left: ${normalizeValue(0.5)};
  p {
    font-weight: 500;
    white-space: nowrap;
  }
  span {
    opacity: 0.6;
  }
`;

export const CardIconWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${normalizeValue(3)};
    height: ${normalizeValue(3)};
    margin-right: ${normalizeValue(0.4)};
    border-radius: 50%;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    background: ${theme.colors.primaryBackgroundOpacity};
  `}
`;
export const Image = styled.div<{ isSell?: boolean }>`
  ${({ theme }) => css`
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
    }
  `}
`;
export const ContainerActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    ${Icon} {
      cursor: pointer;
      padding: ${normalizeValue(0.5)};
      border-radius: ${normalizeValue(10)};
      transition: background 0.5s ease;
      &:hover {
        background: ${theme.colors.secondaryBackground};
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
