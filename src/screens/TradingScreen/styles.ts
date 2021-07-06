import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    /* overflow-x: hidden; */
    max-width: 192rem;
    margin: 0 auto;
    box-shadow: ${theme.shadow.primary};
    position: relative;
  `}
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "Graph Orderbook P2P"
    "Transactions Market P2P";
    grid-template-columns: 2fr 1fr 1fr;

  grid-template-rows: minmax(40rem,60rem) 1fr;
  grid-gap: 1rem;
  padding-top: 6rem;
  max-height: 100vh;

  @media screen and (min-width: 1650px) {
     grid-template-columns: 3.4fr 1fr 1fr;
  }
`;
