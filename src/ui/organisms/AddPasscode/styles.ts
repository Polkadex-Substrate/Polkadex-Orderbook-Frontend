import styled, { css } from "styled-components";

import { Wrapper as Button } from "@polkadex/orderbook-ui/molecules/Button/styles";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    border-radius: 1.5rem;
    padding: 3rem;
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 0 auto;
    }
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    h2 {
      font-size: 2rem;
      font-weight: 500;
      margin-bottom: 0.8rem;
    }
  `}
`;

export const Strong = styled.strong`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-weight: 500;
  `}
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-self: flex-end;
  margin-top: 3rem;
  ${Button} {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;
