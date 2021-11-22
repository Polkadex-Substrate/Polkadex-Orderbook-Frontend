import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: 3rem 0;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  `}
`;

export const Container = styled.div`
  position: relative;
  padding: 2rem;
  max-width: 85rem;
  margin: 0 auto;
`;

export const Action = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  ${Icon} {
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    :hover {
      opacity: 0.6;
    }
  }
`;
