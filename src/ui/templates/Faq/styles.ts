import Link from "next/link";
import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 160rem;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    @media screen and (max-width: 590px) {
      display: block;
    }
  `}
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    @media screen and (max-height: 830px) {
      justify-content: flex-start;
    }
    strong {
      color: ${theme.colors.text};
      font-weight: normal;
    }
  `}
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
    a {
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
      line-height: 1.4;
      max-width: 22rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media screen and (min-width: 800px) and (max-width: 1150px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (min-width: 1150px) {
      grid-template-columns: repeat(4, 1fr);
    }
  `}
`;

export const Categories = styled.div`
  ${({ theme }) => css`
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const CategoriesTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    h2 {
      font-size: ${theme.font.sizes.xlarge};
      font-weight: 500;
    }
    p {
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const CategoriesCards = styled.div`
  display: grid;
  column-gap: 1rem;
  row-gap: 3rem;
  @media screen and (min-width: 800px) and (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 900px) and (max-width: 1150px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 1150px) {
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
  }
`;

export const CategoriesCard = styled(Link)`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: 2rem;
    border-radius: 0.8rem;

    span {
      font-size: ${theme.font.sizes.medium};
    }
    div {
      width: 1.8rem;
      height: 1.8rem;
      img {
        width: 100%;
      }
    }

    span {
      font-size: ${theme.font.sizes.small};
    }
  `}
`;

export const Videos = styled.div`
  ${({ theme }) => css`
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const VideosTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex: 1;
    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h2 {
        font-size: ${theme.font.sizes.xlarge};
        font-weight: 500;
      }
      p {
        font-size: ${theme.font.sizes.small};
        color: ${theme.colors.tertiaryText};
      }
    }
    a {
      color: ${theme.colors.primary};
    }
  `}
`;

export const VideosCards = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const VideosPrimary = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const VideosPrimaryContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    span {
      color: ${theme.colors.tertiaryText};
    }
    p {
      font-size: ${theme.font.sizes.small};
      font-weight: 500;
    }
  `}
`;

export const IframeContainer = styled.div`
  flex: 1;
  position: relative;
  min-width: 30rem;
  min-height: 20rem;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const VideosSecondary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  flex: 1;
  max-width: 28rem;
`;

export const VideosSecondaryCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 28rem;
    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      span {
        color: ${theme.colors.tertiaryText};
        font-size: ${theme.font.sizes.xxsmall};
      }
      p {
        font-size: ${theme.font.sizes.xsmall};
      }
    }
    img {
      max-height: 7rem;
    }
  `}
`;
