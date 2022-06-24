import styled, { css } from "styled-components";

import { Main as RecentTrade } from "@orderbook/v2/ui/organisms/RecentTrades/styles";

export const Wrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100vh;
  max-width: 192rem;
  margin: 0 auto;
  box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.5);
`;

export const WrapperMain = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0 1rem;
  flex: 1;
`;
export const WrapperGraph = styled.div`
  display: grid;
  @media screen and (min-width: 1290px) {
    grid-template-columns: minmax(85rem, 1fr) auto;
  }
`;

export const BottomWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
    flex-direction: column;
    flex: 1;
    ${RecentTrade} {
      min-width: 29rem;
      border-radius: 0 3rem 3rem 3rem;
      padding: 2rem;
      background: ${theme.colors.tertiaryBackground};
    }
    @media screen and (min-width: 970px) {
      flex-direction: row;
      /* min-height: 3vh; */
    }
  `}
`;
