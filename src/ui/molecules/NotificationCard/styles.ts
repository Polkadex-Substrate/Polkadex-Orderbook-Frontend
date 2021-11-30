import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
export const Wrapper = styled.div`
  position: absolute;
  top: 2%;
  right: 1%;
  z-index: 1;
  animation: fadeIn 0.5s ease-in-out;
`;

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    background: ${theme.colors.secondaryBackgroundSolid};
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 0.5rem;
    padding: 1.5rem;
    max-width: 30rem;
    width: 100%;
    ${Icon} {
      transition: opacity 0.8s;
      opacity: 1;
      :hover {
        opacity: 0.5;
      }
    }
  `}
`;

export const Aside = styled.div`
  margin-right: 1rem;
  text-transform: capitalize;
  span {
    font-size: 1.4rem;
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.4;
  }
`;
