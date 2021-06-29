import styled, { css } from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  min-height: 100vh;
  /* overflow-x: hidden; */
  max-width: 192rem;
  margin: 0 auto;
  ${({ theme }) => css`
    box-shadow: ${theme.shadow.primary};
  `}
`;

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "Header Header Header"
    "Graph Graph P2P"
    "Transactions Transactions Transactions";
  grid-template-columns: auto minmax(100rem, 140rem ) minmax(32rem, 36rem);
  grid-template-rows: min-content min-content min-content;
  grid-gap: 1rem;
  flex: 1;
`;
