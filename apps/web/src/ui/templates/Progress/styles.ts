import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  background: #020303;
`;

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: ${normalizeValue(6)};
    padding: ${normalizeValue(1)};
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const Content = styled.section``;

export const Hero = styled.div`
  max-width: ${normalizeValue(100)};
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
  @media screen and (max-width: 1000px) {
    padding: 0 ${normalizeValue(1)};
  }
`;

export const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
  padding: ${normalizeValue(3)} 0 ${normalizeValue(2)};
  @media screen and (max-width: 470px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeroTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: ${normalizeValue(5)};
    height: ${normalizeValue(5)};
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(38)};
    svg {
      max-width: ${normalizeValue(1.5)};
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;

export const HeroContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.5)};
    h3,
    p {
      color: ${theme.colors.white};
    }
    h3 {
      font-size: ${normalizeValue(2)};
      font-weight: 600;
    }
    p {
      font-size: ${normalizeValue(1.4)};
      line-height: 1.4;
      a {
        color: ${theme.colors.primary};
        &:hover {
          text-decoration: underline;
        }
      }
    }
  `}
`;

export const HeroInteraction = styled.div`
  perspective: 800px;

  img {
    width: 100%;
    transform-style: preserve-3d;
    transform: scale3d(1.2, 1, 2) rotate3d(1, 0, 0, 40deg);
    transition: transform 1s;
  }
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors.secondaryBackground};
    padding: ${normalizeValue(3)} ${normalizeValue(2)};
    backdrop-filter: blur(10px);
    background: ${theme.colors.overlayOpacity};
    margin-top: ${normalizeValue(-4)};
    @media screen and (min-width: 750px) {
      margin-top: ${normalizeValue(-10)};
    }
  `}
`;

export const FooterWrapper = styled.div`
  max-width: ${normalizeValue(120)};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(4)};
`;

export const FooterTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.5)};
    h1,
    p {
      color: ${theme.colors.white};
    }
    h1 {
      font-size: ${normalizeValue(3)};
      font-weight: 600;
    }
    p {
      font-size: ${normalizeValue(1.4)};
      line-height: 1.4;
    }
  `}
`;

export const FooterContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2)};
    span {
      font-size: ${normalizeValue(1.6)};
      font-weight: 600;
      color: ${theme.colors.white};
    }
  `}
`;

export const FooterFlex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${normalizeValue(2)};
  flex-wrap: wrap;
`;

export const FooterCard = styled.div<{ checked?: boolean; pending?: boolean }>`
  ${({ checked, pending, theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1.5)};
    min-width: ${normalizeValue(20)};
    p {
      line-height: 1.4;
      color: ${checked || pending
        ? theme.colors.white
        : theme.colors.tertiaryText};
    }
    div {
      width: ${normalizeValue(2)};
      height: ${normalizeValue(2)};
      border-radius: ${normalizeValue(10)};
      ${checked || pending
        ? css`
            background: ${checked ? theme.colors.green : theme.colors.orange};
          `
        : css`
            background: ${theme.colors.secondaryBackground};
          `}
      svg {
        max-width: ${normalizeValue(1.1)};
        fill: ${theme.colors.text};
      }
    }
  `}
`;
