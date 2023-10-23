import Link from "next/link";
import styled, { css } from "styled-components";

export const Main = styled.main<{ open?: boolean }>`
  ${({ theme, open }) => css`
    transition:
      opacity 1s ease-in-out,
      visibility 1s ease-in-out;
    position: relative;
    background: #1c1c26;
    color: ${theme.colors.white};
    display: none;
    min-height: 100vh;
    flex-direction: column;
    margin: 0 auto;
    ${open &&
    css`
      display: flex;
    `}
  `}
`;

export const Button = styled(Link)`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    padding: 1.3rem;
    border-radius: 0.5rem;
    transition: background-color 0.4s ease-in;
    &:hover {
      background: ${theme.colors.primaryHover};
    }
  `}
`;

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem 3rem 1rem 0;
  max-width: 140rem;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: 600px) {
    padding: 8rem 8rem 0 8rem;
  }
  a {
    width: fit-content;
  }
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
  .spline {
    margin-top: -10rem;
    @media screen and (min-width: 1000px) and (max-width: 1500px) {
      margin-top: -20rem;
    }
    @media screen and (min-width: 1500px) {
      margin-top: -22rem;
    }
  }
`;

export const HeroAside = styled.div`
  ${({ theme }) => css`
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
    h1 {
      font-size: 5rem;
      font-weight: 500;
    }
    p {
      line-height: 0.8;
      font-size: 4rem;
      margin-bottom: 2rem;
      strong {
        color: ${theme.colors.primary};
      }
      @media screen and (min-width: 600px) {
        font-size: 7rem;
      }
    }
  `}
`;

export const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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

export const Start = styled.section`
  max-width: 140rem;
  margin: 0 auto;
  width: 100%;

  @media screen and (min-width: 700px) {
    margin-top: -9rem;
  }
  @media screen and (min-width: 1100px) {
    margin-top: -14rem;
  }
`;

export const StartHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (min-width: 600px) {
      padding: 0 5rem;
    }
    span {
      font-size: 5rem;
      @media screen and (min-width: 992px) {
        font-size: 8rem;
      }

      &:nth-child(2) {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

export const StartFooter = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 3rem 1rem;
  @media screen and (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    padding: 3rem 5rem 5rem 5rem;
  }

  a {
    flex: 1;
    width: 100%;
    text-align: center;
  }
  span {
    font-size: 1.4rem;
    opacity: 0.5;
    svg {
      width: 1rem;
      display: inline;
      margin-left: 1rem;
      vertical-align: middle;
    }
  }
`;

export const StartContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const StartCard = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-width: 32rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    padding: 3rem 1rem;
    &:not(:last-child) {
      border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    }
    @media screen and (min-width: 600px) {
      padding: 8rem 5rem;
    }
    h3 {
      font-size: 2rem;
      font-weight: 500;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    &:first-child span {
      border: 1px solid ${theme.colors.primary};
      &::before {
        background: ${theme.colors.primary};
      }
    }
    span {
      position: relative;
      width: 4rem;
      height: 4rem;
      border-radius: 100%;
      border: 1px solid ${theme.colors.secondaryBackground};
      display: flex;
      align-items: center;
      justify-content: center;
      &::before {
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 100%;
        content: "";
        background: ${theme.colors.secondaryBackground};
      }
    }
    p {
      opacity: 0.7;
      line-height: 1.4;
      font-size: 1.4rem;
    }
  `}
`;

export const Features = styled.section`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors.secondaryBackground};
    background: ${theme.colors.darkBackground};
  `}
`;
export const FeaturesContainer = styled.section`
  max-width: 140rem;
  margin: 0 auto;
  width: 100%;
`;

export const FeatureShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
export const FeaturesHeaderCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 4rem 1rem;
    @media screen and (min-width: 600px) {
      padding: 4rem 8rem;
    }

    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 5rem;
      p {
        font-size: 3em;
        @media screen and (min-width: 600px) {
          font-size: 4em;
        }
      }
      span {
        line-height: 0.5;
        font-size: 5em;

        @media screen and (min-width: 600px) {
          font-size: 8em;
        }
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
export const FeaturesHeader = styled.div`
  ${({ theme }) => css`
    position: relative;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const FeaturesContent = styled.section`
  h3 {
    font-size: 2.5rem;
    font-weight: 500;
  }
  p {
    opacity: 0.7;
    line-height: 1.4;
    font-size: 1.4rem;
  }
`;

export const FeaturesHighlight = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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
      width: 100%;
      max-width: 60rem;
      object-fit: contain;
    }
    div {
      padding-left: 6rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 3rem;
    }
    @media screen and (min-width: 600px) {
      div {
        padding: 6rem;
        max-width: 40rem;
      }
    }
  `}
`;

export const FeaturesCard = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 4rem;
    text-align: center;
    min-width: 30rem;
    padding: 3rem 1rem 0 1rem;
    @media screen and (min-width: 600px) {
      padding: 6rem 6rem 0 6rem;
      &:not(:last-child) {
        border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
    }
    @media screen and (max-width: 600px) {
      &:not(:last-child) {
        border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    img {
      width: 100%;
      max-width: 30rem;
      height: 100%;
    }
  `}
`;

export const FeaturesWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const FeaturesFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    padding: 3rem 1rem;
    flex-direction: column;
    @media screen and (min-width: 600px) {
      padding: 3rem 5rem;
      flex-direction: row;
      align-items: center;
    }
    a {
      &:first-child {
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
      &:last-child {
        text-align: center;
      }
    }
  `}
`;

export const Support = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    max-width: 140rem;
    margin: 0 auto;
    width: 100%;
  `}
`;

export const SupportCard = styled.div`
  ${({ theme }) => css`
    flex: 1;
    min-width: 35rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: space-between;
    padding: 3rem 1rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (min-width: 600px) {
      padding: 5rem;
      &:first-child {
        border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
    }

    &:first-child a {
      color: ${theme.colors.blue};
      transition: opacity ease 0.5s;
      &:hover {
        opacity: 0.5;
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

export const SupportCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 2rem;
    font-weight: 550;
  }
  p {
    opacity: 0.5;
    line-height: 1.4;
    font-size: 1.4rem;
  }
`;

export const SupportCardFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    a {
      background: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: 0.5rem;
      padding: 1rem;
      transition: background-color ease 0.4s;
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
      svg {
        display: inline;
        vertical-align: middle;
        fill: ${theme.colors.white};
        width: 1.2rem;
        height: 1.2rem;
        &:first-child {
          margin-right: 0.8rem;
        }
        &:last-child {
          margin-left: 0.5rem;
        }
      }
    }
  `}
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1rem;
  max-width: 140rem;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: 600px) {
    padding: 0 5rem;
  }
  a {
    transition: opacity ease 0.5s;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
`;

export const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 4rem 0;
  span {
    width: 4rem;
    height: 4rem;
  }
  div {
    flex: 1;
    min-width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    strong {
      font-size: 1.5rem;
      font-weight: 550;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
    }
  }
`;

export const FooterBottom = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    padding: 3rem 0;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const FooterCopyright = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  div {
    display: flex;
    gap: 1rem;
  }
`;

export const FooterSocial = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
    a {
      svg {
        width: 1.6rem;
        fill: ${theme.colors.white};
      }
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    position: sticky;
    top: 0;
    z-index: 2;
    max-width: 140rem;
    margin: 0 auto;
    width: 100%;
  `}
`;

export const Logo = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    align-items: start;
    gap: 0.5rem;
    svg {
      max-width: 14rem;
    }
    span {
      font-weight: 500;
      font-size: 1.2rem;
      display: inline-block;
      background: ${theme.colors.primary};
      padding: 0.2rem 0.3rem;
      border-radius: 0.2rem;
    }
  `}
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

export const MenuWrapper = styled.div`
  position: absolute;
  z-index: 10;
`;

export const MenuContent = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 96vw;
    height: 96vh;
    padding: 2.5rem;
    overflow: auto;
    -webkit-backdrop-filter: blur(5px);
    border-radius: 2rem;
    backdrop-filter: blur(5px);
    background: ${theme.colors.primaryBackground};
  `}
`;

export const MenuClose = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: 2rem;
    top: 2rem;
    z-index: 2;
    width: 3rem;
    height: 3rem;
    padding: 1rem;
    transition: background-color ease 0.4s;
    cursor: pointer;
    border-radius: 30rem;
    &:hover {
      background-color: ${theme.colors.secondaryBackground};
    }
    svg {
      stroke: ${theme.colors.white};
    }
  `}
`;

export const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  span {
    opacity: 0.5;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    a {
      font-size: 1.5rem;
    }
  }
`;

export const MenuButton = styled.button`
  ${({ theme }) => css`
    svg {
      cursor: pointer;
      .line {
        fill: none;
        stroke: ${theme.colors.text};
        stroke-width: 6;
        transition:
          stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
          stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      .line1 {
        stroke-dasharray: 60 207;
        stroke-width: 6;
      }
      .line2 {
        stroke-dasharray: 60 60;
        stroke-width: 6;
      }
      .line3 {
        stroke-dasharray: 60 207;
        stroke-width: 6;
      }
      @media screen and (min-width: 750px) {
        display: none;
      }
    }
  `}
`;

export const Aside = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2rem;
    .dropdownButton {
      font-size: 1.4rem;
      svg {
        width: 1rem;
        display: inline-block;
        vertical-align: middle;
        opacity: 0.5;
        fill: ${theme.colors.white};
      }
    }
    .dropdownContent {
      color: ${theme.colors.black};
      display: flex;
      flex-direction: column;
      gap: 1rem;
      position: absolute;
      right: 0;
      top: 3rem;
      max-width: 50rem;
      background: ${theme.colors.white};
      border-radius: 1rem;
      padding: 2rem;
      a {
        font-weight: 500;
        font-size: 1.4rem;
        white-space: nowrap;
        transition: opacity 0.5s ease-in-out;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  `}
`;

export const Spline = styled.div`
  @media screen and (min-width: 1000px) {
    min-height: 50rem;
  }
`;

export const SplineError = styled.div<{ error: boolean }>`
  ${({ theme, error }) => css`
    display: none;
    ${error &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
      margin: 10rem auto auto auto;
      font-size: 1.6rem;
      color: ${theme.colors.red};
      padding: 1rem 1rem;
      a {
        color: white;
        padding: 0.9rem 1.9rem;
        font-size: 1.4rem;
      }
    `}
  `}
`;
