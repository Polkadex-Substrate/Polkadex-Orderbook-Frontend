import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    min-height: 100vh;
    box-shadow: ${theme.shadows.primary};
    position: relative;
    display: flex;
  `}
`;

export const Wrapper = styled.div`
  display: grid;
  max-width: 140rem;
  width: 100%;
  margin: 0 auto;
  grid-gap: 0.8rem;
  grid-template-columns: auto minmax(26rem, fit-content) minmax(26rem, fit-content);
  @media screen and (min-width: 1050px) {
    grid-template-areas:
      "Graph Orderbook PlaceOrder"
      "Transactions Market PlaceOrder";
    grid-template-columns: auto minmax(26rem, max-content) minmax(27rem, max-content);
  }

  @media screen and (max-width: 1050px) {
    grid-template-areas:
      "Graph Orderbook "
      "PlaceOrder Market"
      "Transactions Transactions";
  }

  @media screen and (min-width: 705px) {
    padding-top: 5.5rem;
    grid-template-rows: minmax(40rem, 43rem) 1fr;
  }
  @media screen and (max-width: 700px) {
    padding-top: 4.5rem;
    grid-template-areas:
      "Toolbar"
      "Graph"
      "Orderbook"
      "PlaceOrder"
      "Market"
      "Transactions";
  }
`;
