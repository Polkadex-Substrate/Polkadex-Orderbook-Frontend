import Link from "next/link";
import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main<{ open?: boolean }>`
  ${({ theme, open }) => css`
    visibility: hidden;
    opacity: 0;
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
      visibility: visible;
      opacity: 100%;
      display: flex;
    `}
  `}
`;

export const Button = styled(Link)`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    padding: ${normalizeValue(1.3)};
    border-radius: ${normalizeValue(0.5)};
    transition: background-color 0.4s ease-in;
    &:hover {
      background: ${theme.colors.primaryHover};
    }
  `}
`;

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${normalizeValue(1)} ${normalizeValue(3)} ${normalizeValue(1)} 0;
  max-width: ${normalizeValue(140)};
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: 600px) {
    padding: ${normalizeValue(8)} ${normalizeValue(8)} 0 ${normalizeValue(8)};
  }
  a {
    width: fit-content;
  }
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
  .spline {
    margin-top: ${normalizeValue(-10)};
    @media screen and (min-width: 1000px) and (max-width: 1500px) {
      margin-top: ${normalizeValue(-20)};
    }
    @media screen and (min-width: 1500px) {
      margin-top: ${normalizeValue(-22)};
    }
  }
`;

export const HeroAside = styled.div`
  ${({ theme }) => css`
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${normalizeValue(1.5)};
    text-align: center;
    h1 {
      font-size: ${normalizeValue(5)};
      font-weight: 500;
    }
    p {
      line-height: 0.8;
      font-size: ${normalizeValue(4)};
      margin-bottom: ${normalizeValue(2)};
      strong {
        color: ${theme.colors.primary};
      }
      @media screen and (min-width: 600px) {
        font-size: ${normalizeValue(7)};
      }
    }
  `}
`;

export const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${normalizeValue(2)};
  span {
    font-size: ${normalizeValue(1.6)};
    opacity: 0.5;
    svg {
      width: ${normalizeValue(1)};
      display: inline;
      margin-right: ${normalizeValue(0.5)};
    }
  }
`;

export const Start = styled.section`
  max-width: ${normalizeValue(140)};
  margin: 0 auto;
  width: 100%;

  @media screen and (min-width: 700px) {
    margin-top: ${normalizeValue(-9)};
  }
  @media screen and (min-width: 1100px) {
    margin-top: ${normalizeValue(-14)};
  }
`;

export const StartHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: ${normalizeValue(1)};
    padding: 0 ${normalizeValue(3)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (min-width: 600px) {
      padding: 0 ${normalizeValue(5)};
    }
    span {
      font-size: ${normalizeValue(5)};
      @media screen and (min-width: 992px) {
        font-size: ${normalizeValue(8)};
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
  gap: ${normalizeValue(3)};
  padding: ${normalizeValue(3)} ${normalizeValue(1)};
  @media screen and (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    padding: ${normalizeValue(3)} ${normalizeValue(5)} ${normalizeValue(5)}
      ${normalizeValue(5)};
  }

  a {
    flex: 1;
    width: 100%;
    text-align: center;
  }
  span {
    font-size: ${normalizeValue(1.4)};
    opacity: 0.5;
    svg {
      width: ${normalizeValue(1)};
      display: inline;
      margin-left: ${normalizeValue(1)};
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
    gap: ${normalizeValue(2)};
    min-width: ${normalizeValue(32)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    padding: ${normalizeValue(3)} ${normalizeValue(1)};
    &:not(:last-child) {
      border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    }
    @media screen and (min-width: 600px) {
      padding: ${normalizeValue(8)} ${normalizeValue(5)};
    }
    h3 {
      font-size: ${normalizeValue(2)};
      font-weight: 500;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: ${normalizeValue(1)};
    }
    &:first-child span {
      border: 1px solid ${theme.colors.primary};
      &::before {
        background: ${theme.colors.primary};
      }
    }
    span {
      position: relative;
      width: ${normalizeValue(4)};
      height: ${normalizeValue(4)};
      border-radius: 100%;
      border: 1px solid ${theme.colors.secondaryBackground};
      display: flex;
      align-items: center;
      justify-content: center;
      &::before {
        position: absolute;
        width: ${normalizeValue(2.5)};
        height: ${normalizeValue(2.5)};
        border-radius: 100%;
        content: "";
        background: ${theme.colors.secondaryBackground};
      }
    }
    p {
      opacity: 0.7;
      line-height: 1.4;
      font-size: ${normalizeValue(1.4)};
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
  max-width: ${normalizeValue(140)};
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
    gap: ${normalizeValue(2)};
    flex-wrap: wrap;
    padding: ${normalizeValue(4)} ${normalizeValue(1)};
    @media screen and (min-width: 600px) {
      padding: ${normalizeValue(4)} ${normalizeValue(8)};
    }

    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: ${normalizeValue(5)};
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
    font-size: ${normalizeValue(2.5)};
    font-weight: 500;
  }
  p {
    opacity: 0.7;
    line-height: 1.4;
    font-size: ${normalizeValue(1.4)};
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
      max-height: ${normalizeValue(40)};
      width: 100%;
      max-width: ${normalizeValue(60)};
      object-fit: contain;
    }
    div {
      padding-left: ${normalizeValue(6)};
      display: flex;
      flex-direction: column;
      gap: ${normalizeValue(1)};
      padding: ${normalizeValue(3)};
    }
    @media screen and (min-width: 600px) {
      div {
        padding: ${normalizeValue(6)};
        max-width: ${normalizeValue(40)};
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
    gap: ${normalizeValue(4)};
    text-align: center;
    min-width: ${normalizeValue(38)};
    padding: ${normalizeValue(3)} ${normalizeValue(1)} 0 ${normalizeValue(1)};
    @media screen and (min-width: 600px) {
      padding: ${normalizeValue(6)} ${normalizeValue(6)} 0 ${normalizeValue(6)};
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
      gap: ${normalizeValue(1)};
    }

    img {
      width: 100%;
      max-width: ${normalizeValue(38)};
      height: 100%;
    }
  `}
`;

export const FeaturesWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: ${normalizeValue(2)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const FeaturesFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: ${normalizeValue(2)};
    padding: ${normalizeValue(3)} ${normalizeValue(1)};
    flex-direction: column;
    @media screen and (min-width: 600px) {
      padding: ${normalizeValue(3)} ${normalizeValue(5)};
      flex-direction: row;
      align-items: center;
    }
    a {
      &:first-child {
        font-size: ${normalizeValue(1.6)};
        color: ${theme.colors.blue};
        transition: opacity ease-in 0.3s;
        &:hover {
          opacity: 0.6;
        }
        svg {
          width: ${normalizeValue(1)};
          height: ${normalizeValue(1)};
          display: inline;
          margin-left: ${normalizeValue(0.5)};
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
    max-width: ${normalizeValue(140)};
    margin: 0 auto;
    width: 100%;
  `}
`;

export const SupportCard = styled.div`
  ${({ theme }) => css`
    flex: 1;
    min-width: ${normalizeValue(35)};
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2)};
    justify-content: space-between;
    padding: ${normalizeValue(3)} ${normalizeValue(1)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (min-width: 600px) {
      padding: ${normalizeValue(5)};
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
        width: ${normalizeValue(1)};
        height: ${normalizeValue(1)};
        display: inline;
        margin-left: ${normalizeValue(0.5)};
        fill: ${theme.colors.blue};
      }
    }
  `}
`;

export const SupportCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1)};

  h3 {
    font-size: ${normalizeValue(2)};
    font-weight: 600;
  }
  p {
    opacity: 0.5;
    line-height: 1.4;
    font-size: ${normalizeValue(1.4)};
  }
`;

export const SupportCardFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(1)};
    a {
      background: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: ${normalizeValue(0.5)};
      padding: ${normalizeValue(1)};
      transition: background-color ease 0.4s;
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
      svg {
        display: inline;
        vertical-align: middle;
        fill: ${theme.colors.white};
        width: ${normalizeValue(1.2)};
        height: ${normalizeValue(1.2)};
        &:first-child {
          margin-right: ${normalizeValue(0.8)};
        }
        &:last-child {
          margin-left: ${normalizeValue(0.5)};
        }
      }
    }
  `}
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 ${normalizeValue(1)};
  max-width: ${normalizeValue(140)};
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: 600px) {
    padding: 0 ${normalizeValue(5)};
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
  gap: ${normalizeValue(2)};
  padding: ${normalizeValue(4)} 0;
  span {
    width: ${normalizeValue(4)};
    height: ${normalizeValue(4)};
  }
  div {
    flex: 1;
    min-width: ${normalizeValue(20)};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: ${normalizeValue(2)};
    strong {
      font-size: ${normalizeValue(1.5)};
      font-weight: 600;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: ${normalizeValue(1)};
      list-style: none;
    }
  }
`;

export const FooterBottom = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${normalizeValue(2)};
    flex-wrap: wrap;
    padding: ${normalizeValue(3)} 0;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const FooterCopyright = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${normalizeValue(2)};
  div {
    display: flex;
    gap: ${normalizeValue(1)};
  }
`;

export const FooterSocial = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(2)};
    a {
      svg {
        width: ${normalizeValue(1.6)};
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
    padding: ${normalizeValue(2)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    position: sticky;
    top: 0;
    z-index: 2;
    max-width: ${normalizeValue(140)};
    margin: 0 auto;
    width: 100%;
  `}
`;

export const Logo = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    align-items: start;
    gap: ${normalizeValue(0.5)};
    svg {
      max-width: ${normalizeValue(14)};
    }
    span {
      font-weight: 500;
      font-size: ${normalizeValue(1.2)};
      display: inline-block;
      background: ${theme.colors.primary};
      padding: ${normalizeValue(0.2)} ${normalizeValue(0.3)};
      border-radius: ${normalizeValue(0.2)};
    }
  `}
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(2)};
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
    padding: ${normalizeValue(2.5)};
    overflow: auto;
    -webkit-backdrop-filter: blur(5px);
    border-radius: ${normalizeValue(2)};
    backdrop-filter: blur(5px);
    background: ${theme.colors.primaryBackground};
  `}
`;

export const MenuClose = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: ${normalizeValue(2)};
    top: ${normalizeValue(2)};
    z-index: 2;
    width: ${normalizeValue(3)};
    height: ${normalizeValue(3)};
    padding: ${normalizeValue(1)};
    transition: background-color ease 0.4s;
    cursor: pointer;
    border-radius: ${normalizeValue(38)};
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
  gap: ${normalizeValue(2)};
  span {
    opacity: 0.5;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1)};
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1)};
    list-style: none;
    a {
      font-size: ${normalizeValue(1.5)};
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
    gap: ${normalizeValue(2)};
    .dropdownButton {
      font-size: ${normalizeValue(1.4)};
      svg {
        width: ${normalizeValue(1)};
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
      gap: ${normalizeValue(1)};
      position: absolute;
      right: 0;
      top: ${normalizeValue(3)};
      max-width: ${normalizeValue(50)};
      background: ${theme.colors.white};
      border-radius: ${normalizeValue(1)};
      padding: ${normalizeValue(2)};
      a {
        font-weight: 500;
        font-size: ${normalizeValue(1.4)};
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
    min-height: ${normalizeValue(50)};
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
      gap: ${normalizeValue(1)};
      margin: ${normalizeValue(10)} auto auto auto;
      font-size: ${normalizeValue(1.6)};
      color: ${theme.colors.red};
      padding: ${normalizeValue(1)} ${normalizeValue(1)};
      a {
        color: white;
        padding: ${normalizeValue(0.9)} ${normalizeValue(1.9)};
        font-size: ${normalizeValue(1.4)};
      }
    `}
  `}
`;
