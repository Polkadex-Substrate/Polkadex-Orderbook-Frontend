import styled, { css } from "styled-components";

import { NavProps } from "./types";

export const Wrapper = styled.nav`
  grid-area: Navigation;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: -webkit-fill-available;
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    background: ${theme.colors.gradientBackground};
    box-shadow: ${theme.shadow.primary};
    border-radius: ${theme.border.radius.primary.small};
    overflow: hidden;
    transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    flex-direction: column;
    max-width: 4.5rem;
    min-width: 4.5rem;
    min-height: 60rem;
    margin-right: 1rem;
    align-items: flex-start;

    }
  `}
`;
export const Container = styled.ul`
  list-style: none;
  & :last-child {
    align-self: stretch;
  }
  & li :not(:last-child) {
    margin-bottom: 0.7rem;
  }
  & :not(:last-child) {
    padding: 1rem;
  }
`;

export const NavWrapper = styled.a<Partial<NavProps>>`
  ${({ theme, active, icon, soon }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    filter: ${active ? "none" : "grayscale(100%) opacity(0.5)"};
    min-width: 20rem;
    transition: 0.2s ease-in-out;
    & :hover {
      filter: grayscale(0%) opacity(1);
    }
    & p {
      margin-left: ${icon ? "1.4rem" : 0};
      font-size: ${theme.font.sizes.xsmall};
      font-weight: 500;
      opacity: ${soon ? 0.5 : 1};
    }
  `}
`;

export const NavContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    & span {
      display: block;
      position: absolute;
      bottom: -0.5rem;
      border-radius: 0.2rem;
      padding: 0.2rem;
      font-size: 1rem;
      background: ${theme.colors.secondaryBackgroundSolid};
      box-shadow: ${theme.shadow.top};
    }
  `}
`;

export const Footer = styled.div`
  max-width: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem;
  height: fit-content;
  margin-top: 5rem;
`;

export const FooterNotifications = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 1rem;
`;
export const FooterLanguage = styled.div``;

// Language
export const LanguageWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: 2rem;
    border-radius: 1.5rem;
    width: fit-content;
  `}
`;

export const LanguageContainer = styled.div``;
export const LanguageTitle = styled.span`
  ${({ theme }) => css`
    font-size: 1.2rem;
    opacity: 0.6;
    font-weight: 600;
    display: block;
    margin-bottom: 1.8rem;
  `}
`;
export const LanguageContent = styled.div``;
export const LanguageCurrencyWrapper = styled.a`
  cursor: pointer;
  display: block;
  & :not(:last-child) {
    margin-bottom: 1.1rem;
  }
`;

export const LanguageNameWrapper = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  & :not(:last-child) {
    margin-bottom: 1.2rem;
  }
  & img {
    margin-right: 0.5rem;
    width: 2rem;
    height: 2rem;
  }
  & span {
    margin-right: 0.5rem;
  }
`;
