import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
import { FlexCenter, Grid } from "@orderbook-ui/v2/atoms";
import { Wrapper as Logo } from "@polkadex/orderbook-ui/molecules/Logo/styles";

export const Main = styled.header`
  ${({ theme }) => css`
    background: ${theme.colors.text};
    border-radius: 1.5rem 0 0 1.5rem;
    padding-left: 1.5rem;
    ${Logo} {
      svg {
        fill: ${theme.colors.inverse};
      }
    }
  `}
`;

export const AsideLeft = styled(Grid)`
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

export const AsideRight = styled(Grid)`
  grid-template-columns: auto auto 1fr;
  align-items: center;
  grid-gap: 2rem;
`;

export const Notifications = styled.div``;

export const Menu = styled(FlexCenter)`
  ${({ theme }) => css`
    color: ${theme.colors.inverse};
    ${Icon} {
      margin-right: 0.5rem;
    }
  `}
`;
export const Account = styled(FlexCenter)`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: 0.9rem;
    border-radius: 1.5rem 0 0 1.5rem;
  `}
`;
