import styled, { css } from "styled-components";

import { FlexCenter, Grid } from "@orderbook/v2/ui/atoms";
import { Wrapper as Logo } from "@polkadex/orderbook-ui/molecules/Logo/styles";

export const Main = styled.header`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    width: 100%;
    background: ${theme.colors.black};
    border-radius: 1.5rem 0 0 1.5rem;
    padding-left: 1.5rem;
    margin-left: 1rem;
    ${Logo} {
      svg {
        fill: ${theme.colors.white};
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
  grid-gap: 0.5rem;
`;

export const Notifications = styled.div``;

export const Account = styled(FlexCenter)`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    border-radius: 1.5rem 0 0 1.5rem;
  `}
`;
