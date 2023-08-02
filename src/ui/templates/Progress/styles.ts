import styled, { css } from "styled-components";

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
    max-height: 6rem;
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const Content = styled.section``;

export const Hero = styled.div`
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
  @media screen and (max-width: 1000px) {
    padding: 0 1rem;
  }
`;

export const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 3rem 0 2rem;
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
    min-width: 5rem;
    height: 5rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 30rem;
    svg {
      max-width: 1.5rem;
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;

export const HeroContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    h3,
    p {
      color: ${theme.colors.white};
    }
    h3 {
      font-size: 2rem;
      font-weight: 550;
    }
    p {
      font-size: 1.4rem;
      line-height: 1.4;
      a {
        color: ${theme.colors.primary};
        :hover {
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
    padding: 3rem 2rem;
    backdrop-filter: blur(10px);
    background: ${theme.colors.overlayOpacity};
    margin-top: -4rem;
    @media screen and (min-width: 750px) {
      margin-top: -10rem;
    }
  `}
`;

export const FooterWrapper = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const FooterTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    h1,
    p {
      color: ${theme.colors.white};
    }
    h1 {
      font-size: 3rem;
      font-weight: 550;
    }
    p {
      font-size: 1.4rem;
      line-height: 1.4;
    }
  `}
`;

export const FooterContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    span {
      font-size: 1.6rem;
      font-weight: 600;
      color: ${theme.colors.white};
    }
  `}
`;

export const FooterFlex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const FooterCard = styled.div<{ checked?: boolean; pending?: boolean }>`
  ${({ checked, pending, theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-width: 20rem;
    p {
      line-height: 1.4;
      color: ${checked || pending ? theme.colors.white : theme.colors.tertiaryText};
    }
    div {
      width: 2rem;
      height: 2rem;
      border-radius: 10rem;
      ${checked || pending
        ? css`
            background: ${checked ? theme.colors.green : theme.colors.orange};
          `
        : css`
            background: ${theme.colors.secondaryBackground};
          `}
      svg {
        max-width: 1.1rem;
        fill: ${theme.colors.text};
      }
    }
  `}
`;
