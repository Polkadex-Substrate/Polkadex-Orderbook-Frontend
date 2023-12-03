import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.section`
  ${({ theme }) => css`
    border-radius: ${normalizeValue(1.5)} 0 0 0;
    background: ${theme.colors.primaryBackground};
    box-shadow: ${theme.shadows.secondary};
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    gap: ${normalizeValue(2)};
    min-width: 90vw;
    min-height: 99vh;
    height: 100%;
    padding: ${normalizeValue(3)} ${normalizeValue(2)} ${normalizeValue(2)}
      ${normalizeValue(2)};
    @media screen and (min-width: 440px) {
      min-width: ${normalizeValue(50)};
      max-width: ${normalizeValue(50)};
    }
  `}
`;
export const Header = styled.button`
  ${({ theme }) => css`
    width: ${normalizeValue(4)};
    height: ${normalizeValue(4)};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(10)};
    cursor: pointer;
    transition: background-color 0.5s ease-in;
    svg {
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
    }
    &:hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
    &:active {
      background: ${theme.colors.secondaryBackground};
    }
  `}
`;
export const Content = styled.div`
  h2 {
    font-size: ${normalizeValue(1.8)};
    font-weight: 600;
  }
`;
export const Card = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    width: ${normalizeValue(8)};
    height: ${normalizeValue(8)};
    cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover {
      transform: translateY(${normalizeValue(-0.2)};) scale(1.2);
    }
    svg g circle:first-child {
      fill: ${isActive ? theme.colors.primary : theme.colors.white};
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${normalizeValue(1)};
  margin-top: ${normalizeValue(1.5)};
`;

export const Footer = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
`;
export const Button = styled.button`
  ${({ theme }) => css`
    padding: ${normalizeValue(1)};
    width: 100%;
    border-radius: ${normalizeValue(0.3)};
    font-weight: 500;
    &:first-child {
      background: ${theme.colors.secondaryBackground};
      flex: 1;
    }
    &:last-child {
      background: ${theme.colors.primary};
      &:disabled {
        background: gray;
      }
    }
  `}
`;
