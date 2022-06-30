import styled, { css } from "styled-components";

import { Main as RecentTrade } from "@orderbook/v2/ui/organisms/RecentTrades/styles";

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: row;
  max-width: 160rem;
  margin: 0 auto;
  box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.5);
  @media screen and (min-height: 910px) or (max-width: 1295px) {
    max-height: 100vh;
  }
`;

export const WrapperMain = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
  padding: 0 1rem;
  flex: 1;
  overflow-y: hidden;
`;
export const WrapperGraph = styled.div`
  display: grid;
  gap: 1rem;
  min-height: 340px;
  @media screen and (min-width: 1290px) {
    grid-template-columns: minmax(85rem, 1fr) auto;
  }
`;

export const BottomWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-direction: column;
    flex: 1;

    @media screen and (min-width: 970px) {
      flex-direction: row;
      /* min-height: 3vh; */
    }
  `}
`;
