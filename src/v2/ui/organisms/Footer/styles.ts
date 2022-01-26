import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Main = styled.footer`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border-top: 1px solid ${theme.colors.secondaryBackground};
    padding: 0.4rem 1rem;
  `}
`;
export const Connection = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    span {
      vertical-align: middle;
      font-size: 1.2rem;
      color: ${isActive ? theme.colors.primary : theme.colors.green};
      font-weight: 500;
      ${Icon} {
        display: inline-block;
        margin-right: 0.5rem;
        svg {
          stroke: ${isActive ? theme.colors.primary : theme.colors.green};
        }
      }
    }
  `}
`;
