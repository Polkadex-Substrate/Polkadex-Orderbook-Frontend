import styled, { css } from "styled-components";

import { Wrapper as Button } from "@polkadex/orderbook-ui/molecules/Button/styles";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: 1.5rem;
    padding: 3rem;
    form {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 1rem;
    }
  `}
`;
export const Icon = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 4.5rem;
    height: 4.5rem;
    padding: 1.3rem;
    border-radius: 10rem;
    background: ${theme.colors.primaryBackground};
    margin: 0 auto;
    margin-bottom: 2rem;
    svg {
      position: relative;
      z-index: 1;
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
    }
    :after {
      content: "";
      top: 0;
      left: 0;
      position: absolute;
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 10rem;
      transform: scale(1.5);
      border-radius: 10rem;
      background: ${theme.colors.primaryBackground}55;
    }
  `}
`;

export const Title = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  h2 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-self: center;
  max-width: 24rem;
  margin: 2rem auto 0 auto;
  width: 100%;
`;
export const Span = styled.span<{ color?: string }>`
  ${({ theme, color }) => css`
    display: block;
    padding: 1.2rem;
    border-radius: 0.8rem;
    background: ${theme.colors[color]};
    flex: 1;
  `}
`;
