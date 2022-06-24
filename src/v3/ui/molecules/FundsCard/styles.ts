import styled, { css } from "styled-components";
import media from "styled-media-query";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Tr = styled.tr`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 1.2rem;
    margin-bottom: 1.2rem;
    border-radius: 0 1rem 1rem 1rem;
    :nth-child(even) {
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
  gap: 1rem;
  margin-left: 0.5rem;
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
    width: 3rem;
    height: 3rem;
    margin-right: 0.4rem;
    border-radius: 50%;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    background: ${theme.colors.white};
  `}
`;
export const Image = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 30rem;
    margin-right: 0.5rem;
    svg {
      width: 1.5rem;
      height: 1.5rem;
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
      padding: 0.5rem;
      border-radius: 10rem;
      transition: background 0.5s ease;
      :hover {
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
  margin-bottom: 1rem;
  display: none;
  opacity: 0.5;
  ${media.lessThan("large")`
    display: block;
  `}
`;
