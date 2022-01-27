import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    height: 100vh;
    /* background: #ff99008d; */
    overflow-y: auto;
  `}
`;
export const Container = styled.div`
  /* padding-top: 7rem; */
`;
