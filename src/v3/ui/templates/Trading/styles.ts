import styled from "styled-components";
import media from "styled-media-query";

import { Main as RecentTrade } from "@orderbook/v2/ui/organisms/RecentTrades/styles";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow-y: hidden;
  max-width: 192rem;
  margin: 0 auto;
  box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.5);
`;

export const WrapperMain = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0 1rem;
`;
export const WrapperGraph = styled.div`
  display: grid;
  min-height: 50vh;
  @media screen and (min-width: 1290px) {
    grid-template-columns: 3fr auto;
  }
`;

export const BottomWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  flex-direction: column;
  ${RecentTrade} {
    min-width: 29rem;
    background: #2e303c;
    border-radius: 0 3rem 3rem 3rem;
    padding: 2rem;
    box-shadow: 0px 30px 45px rgba(0, 0, 0, 0.17);
  }
  @media screen and (min-width: 970px) {
    flex-direction: row;
    min-height: 39vh;
  }
`;
