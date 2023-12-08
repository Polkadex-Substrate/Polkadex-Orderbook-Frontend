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
      width: 100%;
      height: 100%;
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
export const Button = styled.button`
  ${({ theme }) => css`
    padding: ${normalizeValue(1)};
    width: 100%;
    border-radius: ${normalizeValue(0.3)};
    font-weight: 500;
    background: ${theme.colors.primary};
    &:disabled {
      background: none;
      border: 2px solid ${theme.colors.secondaryBackground};
    }
  `}
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.5)};
  strong {
    font-weight: normal;
    font-size: ${normalizeValue(1.1)};
    align-self: flex-end;
  }
`;
export const CardWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${normalizeValue(1.5)};
    border-radius: ${normalizeValue(0.4)};
    background: ${theme.colors.tertiaryBackgroundOpacity};
  `}
`;
export const CardContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.4)};
    flex: 1;
    span {
      font-size: ${normalizeValue(1.2)};
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const Verified = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${isActive ? theme.colors.green : theme.colors.red};
    width: ${normalizeValue(1.5)};
    height: ${normalizeValue(1.5)};
    padding: ${isActive ? normalizeValue(0.3) : normalizeValue(0.4)};
    border-radius: ${normalizeValue(10)};
    svg {
      fill: white;
      stroke: white;
    }
  `}
`;

export const Actions = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    button {
      background: ${isActive
        ? theme.colors.primary
        : theme.colors.secondaryBackgroundOpacity};
      border-radius: ${normalizeValue(0.3)};
      padding: ${normalizeValue(0.5)};
      font-weight: 500;
      font-size: ${normalizeValue(1.3)};
      transition: background-color 0.4s ease-in-out;
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;

export const CardBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.5)};
`;

export const Icon = styled.div`
  ${({ theme }) => css`
    width: ${normalizeValue(0.8)};
    svg {
      fill: ${theme.colors.tertiaryText};
      stroke: ${theme.colors.tertiaryText};
      width: 100%;
      height: 100%;
    }
  `}
`;
export const CardInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    font-size: ${normalizeValue(1.3)};
    svg {
      fill: ${theme.colors.tertiaryText};
      stroke: ${theme.colors.tertiaryText};
      width: 100%;
      height: 100%;
    }

    small {
      color: ${theme.colors.tertiaryText};
      font-size: ${normalizeValue(1.3)};
    }
    input {
      color: ${theme.colors.text};
      width: 100%;
    }
  `}
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${normalizeValue(1)};
`;

export const FooterButton = styled.button`
  height: 100%;
  border-radius: ${normalizeValue(0.3)};
  font-weight: 500;
  padding: ${normalizeValue(1)};
`;

export const ExportButton = styled(FooterButton)`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    &:disabled {
      background: gray;
      cursor: not-allowed;
    }
  `}
`;

export const DropdownButton = styled(FooterButton)`
  ${({ theme }) => css`
    font-size: ${normalizeValue(1.3)};
    background: ${theme.colors.red};
    cursor: pointer;
    div {
      display: inline-block;
      margin-left: ${normalizeValue(0.5)};
      width: ${normalizeValue(0.7)};
      svg {
        width: 100%;
        height: 100%;
      }
    }
  `}
`;

export const UnlockAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;
