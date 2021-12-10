import styled, { css } from "styled-components";

export const Main = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    min-height: 100vh;
    max-width: 140rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  `}
`;

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin: 5.8rem auto 0 auto;
  width: 100%;
  flex: 1;

  @media screen and (min-width: 760px) {
    grid-template-columns: 0.5fr 2fr;
  }
`;
export const Grid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-gap: 1rem;
    @media screen and (min-width: 1170px) {
      grid-template-columns: 2fr 1.3fr;
    }
  `}
`;
export const Container = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const EstimateBalance = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 1.5rem;
    @media screen and (min-width: 460px) {
      padding: 2.5rem;
    }
    h2 {
      font-size: 1.6rem;
      font-weight: 550;
    }
    p {
      font-size: 2.5rem;
    }
    span {
      font-size: 1.3rem;
      opacity: 0.7;
    }
  `}
`;

export const TokenInfo = styled.div`
  display: grid;
  align-items: center;
  padding: 1.5rem;
  grid-gap: 1rem;
  @media screen and (min-width: 460px) {
    padding: 2.5rem;
  }
  span {
    font-weight: 550;
  }
  p {
    opacity: 0.7;
  }
  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 460px) and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1fr;
  }
`;
export const HeaderContainer = styled.div`
  padding: 0 1.5rem;
  @media screen and (min-width: 460px) {
    padding: 0 2.5rem;
  }
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 1rem;
    border-radius: 1rem;
  `}
`;
export const Tab = styled.li<{ isActive?: boolean; color: "primary" | "green" }>`
  ${({ theme, isActive, color }) => css`
    background: ${isActive ? theme.colors[color] : "none"};
    padding: 1.2rem;
    border-radius: 0.5rem;
    display: inline-block;
    cursor: pointer;
    font-weight: 550;
    text-align: center;
  `}
`;
