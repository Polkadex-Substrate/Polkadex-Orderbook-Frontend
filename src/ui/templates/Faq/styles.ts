import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 160rem;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    @media screen and (max-width: 590px) {
      display: block;
    }
  `}
`;

export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  @media screen and (max-height: 830px) {
    justify-content: flex-start;
    margin-top: 3rem;
  }
`;

export const Introduction = styled.div`
  ${({ theme }) => css`
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 5rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const IntroductionTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      h1 {
        font-size: ${theme.font.sizes.giant};
        font-weight: 550;
      }
      p {
        color: ${theme.colors.tertiaryText};
        font-size: ${theme.font.sizes.medium};
        line-height: 1.4;
        span {
          color: ${theme.colors.text};
        }
      }
    }
  `}
`;

export const Search = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.colors.tertiaryBackground};
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
  `}
`;

export const SearchContainer = styled.label`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    flex: 1;
    padding: 1.2rem 0;
    svg {
      width: 2rem;
      height: 2rem;
      stroke: ${theme.colors.secondaryBackground};
    }
    input {
      flex: 1;
      color: ${theme.colors.text};
      font-size: ${theme.font.sizes.medium};
    }
  `}
`;

export const IntroductionSearch = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    p {
      color: ${theme.colors.tertiaryText};
      a {
        font-weight: 500;
        color: ${theme.colors.primary};
      }
    }
    button {
      background-color: ${theme.colors.secondaryBackground};
      padding: 1rem;
      border-radius: 2rem;
    }
  `}
`;

export const Trending = styled.div`
  ${({ theme }) => css`
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
    h2 {
      font-size: ${theme.font.sizes.xlarge};
      font-weight: 500;
    }
  `}
`;

export const TrendingCards = styled.div`
  ${({ theme }) => css`
    display: grid;
    justify-content: space-between;
    column-gap: 2rem;
    row-gap: 3rem;
    flex-wrap: wrap;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    span {
      font-size: ${theme.font.sizes.medium};
      font-weight: 500;
    }
    p {
      color: ${theme.colors.tertiaryText};
    }
    @media screen and (min-width: 600px) and (max-width: 850px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (min-width: 850px) {
      grid-template-columns: repeat(4, 1fr);
    }
  `}
`;
