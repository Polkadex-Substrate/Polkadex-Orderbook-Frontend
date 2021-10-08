import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    min-height: 100vh;
    box-shadow: ${theme.shadow.primary};
    position: relative;
    display: flex;
  `}
`;

export const Wrapper = styled.div`
  display: grid;
  max-width: 140rem;
  width: 100%;
  margin: 0 auto;
  /* grid-template-rows: minmax(40rem, 60rem) max-content; */
  grid-gap: 0.8rem;
  padding-top: 5.8rem;
  grid-template-rows: max-content;
  grid-template-columns: auto minmax(26rem, fit-content) minmax(26rem, fit-content);
  @media screen and (min-width: 1050px) {
    grid-template-areas:
      "Graph Orderbook PlaceOrder"
      "Transactions Market PlaceOrder";
    grid-template-columns: auto minmax(26rem, max-content) minmax(26rem, max-content);
  }

  @media screen and (max-width: 1050px) {
    grid-template-areas:
      "Graph Orderbook "
      "PlaceOrder Market"
      "Transactions Transactions";
  }

  @media screen and (max-width: 700px) {
    grid-template-areas:
      "Graph"
      "Orderbook"
      "PlaceOrder"
      "Market"
      "Transactions";
  }
`;
