import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.colors.primaryBackground};
    box-shadow: ${theme.shadows.primary};
    max-width: 42rem;
    width: 100%;
    border-radius: ${normalizeValue(1.2)};
    p,
    a,
    span {
      font-size: ${normalizeValue(1.4)};
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    position: relative;
    button {
      position: absolute;
      top: ${normalizeValue(1)};
      right: ${normalizeValue(1)};
      width: 4rem;
      height: 4rem;
      background-color: transparent;
      border-radius: ${normalizeValue(100)};
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
    gap: ${normalizeValue(2)};
    padding: ${normalizeValue(2)};
    h2 {
      font-size: ${normalizeValue(2.2)};
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
    gap: ${normalizeValue(1)};
    border-top: 1px solid ${theme.colors.secondaryBackground};
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-bottom-left-radius: ${normalizeValue(1.2)};
    border-bottom-right-radius: ${normalizeValue(1.2)};
    padding: 1.5rem ${normalizeValue(2)};
    p {
      color: ${theme.colors.tertiaryText};
    }
    a {
      border-radius: ${normalizeValue(0.6)};
      padding: ${normalizeValue(1)};
      background: ${theme.colors.primary};
      transition: background-color 0.4s ease;
      &:hover {
        background: ${theme.colors.primary}BF;
      }
    }
  `}
`;
