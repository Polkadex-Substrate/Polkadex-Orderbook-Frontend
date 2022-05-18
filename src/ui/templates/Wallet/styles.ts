import styled, { css } from "styled-components";

export const Main = styled.div`
  ${({ theme }) => css`
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
  margin: 4.5rem auto 0 auto;
  width: 100%;
  flex: 1;
  padding: 1rem;
  @media screen and (min-width: 892px) {
    grid-template-columns: minmax(30rem, 34rem) 1fr;
  }
`;
export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Grid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-gap: 1rem;
    @media screen and (min-width: 1260px) {
      grid-template-columns: 2fr minmax(36rem, 38rem);
      flex: 1;
    }
  `}
`;
export const Container = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    box-shadow: ${theme.shadows.tertiary};
    border-radius: 1rem;
    height: fit-content;
  `}
`;

export const EstimateBalance = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    box-shadow: ${theme.shadows.tertiary};
    border-radius: 1rem;
    margin-bottom: 1rem;
  `}
`;

export const EstimatedBalanceWrapper = styled.div`
  padding: 2.5rem;
  h2 {
    font-size: 1.4rem;
    font-weight: 550;
  }
  p {
    font-size: 2.5rem;
  }
  span {
    font-size: 1.3rem;
    opacity: 0.7;
  }
`;

export const TokenInfo = styled.div`
  ${({ theme }) => css`
    display: grid;
    align-items: center;
    padding: 2rem;
    grid-gap: 1rem;

    span {
      font-weight: 550;
    }
    p {
      color: ${theme.colors.secondaryBackgroundDark};
    }
    @media screen and (min-width: 600px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 460px) and (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr 1fr;
    }
  `}
`;
export const TokenInfoWrapper = styled.div`
  ${({ theme }) => css`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    margin-right: 0.5rem;
  `}
`;

export const HeaderContainer = styled.div`
  ${({ theme }) => css`
    padding: 1rem 2rem 0 2rem;
    border-radius: 0 0 1.5rem 1.5rem;
    box-shadow: ${theme.shadows.smooth};
  `}
`;

export const Header = styled.div``;
export const Tab = styled.li<{ isActive?: boolean; color: "primary" | "green" }>`
  ${({ theme, isActive, color }) => css`
    color: ${isActive ? theme.colors.text : theme.colors.secondaryBackgroundDark};
    border-bottom: 4px solid ${isActive ? theme.colors[color] : "none"};
    padding: 1.2rem;
    display: inline-block;
    cursor: pointer;
    font-weight: 500;
  `}
`;
