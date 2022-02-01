import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    min-height: 100vh;
    height: 100%;
    background: ${theme.colors.white};
    display: flex;
    flex-direction: column;
  `}
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    flex: 1;
    grid-gap: 0.5rem;
    padding-bottom: 2rem;
    padding-top: 5.5rem;
    grid-template-areas:
      "GridContainer"
      "MyOrders"
      "PlaceOrder"
      "News"
      "RecentTrades";
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;

    @media screen and (min-width: 1180px) {
      grid-template-areas:
        "GridContainer GridContainer  PlaceOrder"
        "GridContainer GridContainer  PlaceOrder"
        "GridContainer GridContainer  RecentTrades"
        "MyOrders News  RecentTrades";
      grid-template-rows: 1fr minmax(25rem, 25rem) 1fr minmax(22rem, 22rem);
      grid-template-columns: 4fr minmax(32rem, 32rem) minmax(31rem, auto);
    }

    @media screen and (min-width: 700px) and (max-width: 1180px) {
      grid-template-areas:
        "GridContainer GridContainer"
        "MyOrders PlaceOrder"
        "News RecentTrades";
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: 1fr 1fr;
    }
  `}
`;
export const Container = styled.div`
  ${({ theme }) => css`
    grid-area: GridContainer;
    background: ${theme.colors.white};
    display: grid;
    width: 100%;
    @media screen and (max-width: 700px) {
      grid-template-areas:
        "Information"
        "Graph"
        "Orderbook"
        "ExploreMarket";
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
    }

    @media screen and (min-width: 700px) {
      grid-template-areas:
        "Information Information Information"
        "Graph Graph Orderbook"
        "ExploreMarket ExploreMarket Orderbook";
      grid-template-rows: fit-content(100%) 1fr fit-content(100%);
      grid-template-columns: 4fr 1fr max-content;
    }

    grid-gap: 0.5rem;
  `}
`;

export const GraphContainer = styled.div``;
