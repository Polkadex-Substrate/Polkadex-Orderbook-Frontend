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
    overflow-y: auto;
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

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2)};
    h2 {
      font-size: ${normalizeValue(1.8)};
      font-weight: 600;
    }
    p {
      line-height: 1.4;
      color: ${theme.colors.tertiaryText};
    }
    strong {
      font-weight: 600;
      color: ${theme.colors.text};
    }
    a {
      color: ${theme.colors.primary};
      text-decoration: underline;
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(2)};
  margin-top: ${normalizeValue(1.5)};
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1)};
`;

export const Card = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1)};
    padding: ${normalizeValue(1.5)};
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: ${normalizeValue(0.4)};
    opacity: ${isActive ? 1 : 0.3};
    cursor: pointer;
    user-select: none;
  `}
`;
export const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${normalizeValue(1)};
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
`;

export const CardInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.3)};
    span {
      font-weight: 500;
    }
    p {
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const CardIcon = styled.div`
  ${({ theme }) => css`
    width: ${normalizeValue(3)};
    height: ${normalizeValue(3)};
    border-radius: ${normalizeValue(20)};
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: ${normalizeValue(0.8)};
    svg {
      fill: ${theme.colors.tertiaryText};
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;

export const CardArrow = styled.div`
  ${({ theme }) => css`
    width: ${normalizeValue(1)};
    svg {
      fill: ${theme.colors.tertiaryText};
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;
