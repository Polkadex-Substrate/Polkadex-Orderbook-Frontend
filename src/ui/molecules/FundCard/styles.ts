import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Token = styled.div`
  display: flex;
  align-items: center;
  span {
    opacity: 0.7;
  }
  & ${Icon} {
    margin-right: 0.5rem;
  }
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 0.5rem;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid ${theme.colors.secondaryBackground};
    }

    & p {
      font-size: ${theme.font.sizes.xxsmall};
      font-weight: 600;
    }
    &  span,
      display: block;
      font-size: 1.1rem;
      font-weight: 600;

  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    span {
      opacity: 0.7;
    }
  `}
`;
export const Actions = styled.div`
  ${({ theme }) => css`
    button {
      :first-child {
        background: ${theme.colors.secondaryBackground};
        border-radius: 0.5rem;
        padding: 0.5rem;
        margin-right: 1rem;
        font-size: ${theme.font.sizes.xxsmall};
      }
    }
  `}
`;
