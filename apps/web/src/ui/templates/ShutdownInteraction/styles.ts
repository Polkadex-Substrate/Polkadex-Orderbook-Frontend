import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.colors.primaryBackground};
    box-shadow: ${theme.shadows.primary};
    max-width: 42rem;
    width: 100%;
    border-radius: 1.2rem;
    p,
    a,
    span {
      font-size: 1.4rem;
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    position: relative;
    button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 4rem;
      height: 4rem;
      background-color: transparent;
      border-radius: 100rem;
      display: grid;
      place-items: center;
      transition: background-color 0.4s ease;
      &:hover {
        background-color: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    h2 {
      font-size: 2.2rem;
      font-weight: 550;
    }
    p {
      color: ${theme.colors.tertiaryText};
      line-height: 1.5;
    }
    span {
      color: ${theme.colors.text};
    }
    a {
      color: ${theme.colors.primary};
    }
    img {
      width: 100%;
    }
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    border-top: 1px solid ${theme.colors.secondaryBackground};
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
    padding: 1.5rem 2rem;
    p {
      color: ${theme.colors.tertiaryText};
    }
    a {
      border-radius: 0.6rem;
      padding: 1rem;
      background: ${theme.colors.primary};
      transition: background-color 0.4s ease;
      &:hover {
        background: ${theme.colors.primary}BF;
      }
    }
  `}
`;
