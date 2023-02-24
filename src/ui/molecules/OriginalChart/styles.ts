import styled, { css } from "styled-components";

import { Container as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const LoadingWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    width: 100%;
    z-index: 20;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.tertiaryBackgroundOpacity};
  `}
`;

export const LoadingeMessage = styled.div`
  display: flex;
  align-items: center;
  background: gray;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  transition: width 0.5s ease-in-out;
  gap: 1rem;
`;

export const Container = styled.div`
  flex: 1;
  height: 100%;
  height: 36vh;
  min-height: 44rem;
  @media screen and (min-height:1200px) {
    height: 45vh;
  }
`;

export const Tools = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    ${Icon} {
      cursor: pointer;
      transition: background 0.5s ease-in-out;
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;
