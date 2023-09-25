import Link from "next/link";
import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.darkBackground};
    display: flex;
    max-width: 130rem;
    min-height: 100vh;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    flex-direction: column;
    margin: 0 auto;
    border-left: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Button = styled(Link)`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    padding: 1.2rem 1.3rem;
    border-radius: 0.5rem;
    transition: background-color 0.4s ease-in;
    &:hover {
      background: ${theme.colors.primaryHover};
    }
  `}
`;

export const Hero = styled.section`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    padding: 8rem;
    background-image: url("/img/heroBg.png");
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    a {
      width: fit-content;
    }
  `}
`;

export const HeroAside = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 60rem;
    h1 {
      font-size: 5rem;
      font-weight: 500;
    }
    p {
      line-height: 0.8;
      font-size: 7rem;
      margin-bottom: 2rem;
      strong {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

export const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  span {
    font-size: 1.6rem;
    opacity: 0.5;
    svg {
      width: 1rem;
      display: inline;
      margin-right: 0.5rem;
    }
  }
`;

export const Start = styled.section``;

export const StartHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 8rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};

    span {
      font-size: 9rem;
      &:nth-child(2) {
        margin-top: 4rem;
      }
      &:nth-child(3) {
        margin-top: 8rem;
      }
      &:nth-child(2) {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

export const StartFooter = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 3rem;
    padding: 3rem 8rem 8rem 8rem;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    &::before {
      position: absolute;
      content: "";
      width: 50%;
      border-bottom: 4px solid ${theme.colors.primary};
      left: 0;
      bottom: 0;
    }
    a {
      flex: 1;
      width: 100%;
      text-align: center;
    }
    span {
      opacity: 0.5;
      svg {
        width: 1rem;
        display: inline;
        margin-left: 1rem;
      }
    }
  `}
`;

export const StartContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 3rem;
`;

export const StartCard = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 5rem;
    min-width: 32rem;
    &:not(:last-child) {
      border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    }
    h3 {
      font-size: 2rem;
      font-weight: 500;
    }
    div {
      position: relative;
      width: 4rem;
      height: 4rem;
      border-radius: 100%;
      border: 1px solid ${theme.colors.primary};
      display: flex;
      align-items: center;
      justify-content: center;
      &::before {
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 100%;
        content: "";
        background: ${theme.colors.primary};
      }
    }
    p {
      opacity: 0.7;
      line-height: 1.5;
    }
  `}
`;

export const Features = styled.section``;

export const FeaturesHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 6rem 8rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 5rem;
      p {
        font-size: 5rem;
      }
      span {
        line-height: 0.5;
        font-size: 9rem;
      }
      &:nth-child(1) span {
        color: ${theme.colors.primary};
      }
      &:nth-child(2) span {
        color: transparent;
        -webkit-text-stroke: 1px ${theme.colors.primary};
      }
      &:nth-child(3) p {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

export const FeaturesContent = styled.section`
  h3 {
    font-size: 2.5rem;
    font-weight: 500;
  }

  p {
    opacity: 0.7;
    line-height: 1.5;
  }
`;

export const FeaturesHighlight = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    &::before {
      position: absolute;
      content: "";
      width: 50%;
      border-bottom: 4px solid ${theme.colors.primary};
      right: 0;
      bottom: 0;
    }
    img {
      max-height: 40rem;
    }
    div {
      padding-left: 6rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 40rem;
    }
  `}
`;

export const FeaturesCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    text-align: center;
    padding: 5rem 5rem 0 5rem;
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    &:not(:last-child) {
      border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    }
    img {
      max-height: 30rem;
    }
  `}
`;

export const FeaturesWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 2rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const FeaturesFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    padding: 6rem 8rem;
    a:first-child {
      font-size: 1.6rem;
      color: ${theme.colors.blue};
      transition: opacity ease-in 0.3s;
      &:hover {
        opacity: 0.6;
      }
      svg {
        width: 1rem;
        height: 1rem;
        display: inline;
        margin-left: 0.5rem;
        fill: ${theme.colors.blue};
      }
    }
  `}
`;
