import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    background: ${theme.colors.primaryBackground};
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(1.5)};
    min-height: ${normalizeValue(34)};
    @media screen and (min-width: 400px) {
      min-width: ${normalizeValue(35)};
    }
  `}
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
  padding: ${normalizeValue(1)} ${normalizeValue(1.5)};
  div {
    max-width: ${normalizeValue(4)};
    width: 100%;
  }
  span {
    font-size: ${normalizeValue(1.4)};
  }
`;
export const Switch = styled.div`
  ${({ theme }) => css`
    margin: ${normalizeValue(1.5)};
    border: 2px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: ${normalizeValue(1)};
  `}
`;
export const SwitchCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    font-size: ${normalizeValue(1.3)};
    justify-content: space-between;
    align-items: center;
    gap: ${normalizeValue(2)};
    padding: ${normalizeValue(1.5)};
    &:first-child {
      cursor: pointer;
    }
    &:last-child {
      border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      opacity: 0.5;
    }
  `}
`;

export const DropdownHeader = styled.div`
  ${({ theme }) => css`
    small {
      font-size: ${normalizeValue(1.3)};
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const DropdownEmpty = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: ${normalizeValue(2)};
    border-radius: ${normalizeValue(0.8)};
    width: 100%;
    @media screen and (min-width: 400px) {
      min-width: 3 ${normalizeValue(1.5)};
    }
    a {
      display: block;
      margin-top: ${normalizeValue(1.5)};
      text-align: center;
      padding: ${normalizeValue(1.5)};
      background-color: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: ${normalizeValue(0.7)};
      transition: background-color 0.3s ease-out;
      &:hover {
        background-color: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
export const SwitchCardContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.8)};
    span {
      display: flex;
      align-items: center;
      font-size: ${normalizeValue(1.3)};
      div {
        display: flex;
        align-items: center;
        justify-center;
        max-width: ${normalizeValue(1)};
        max-height: ${normalizeValue(1)};
        border-radius: ${normalizeValue(10)};
        margin-left: ${normalizeValue(0.5)};
        background: ${theme.colors.green};
        padding: ${normalizeValue(0.1)};
        svg {
          fill: ${theme.colors.white};
          width: 100%;
          height: 100%;
        }
      }
    }
  `}
`;
export const SwitchCardInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(0.5)};
    small {
      font-size: ${normalizeValue(1.3)};
      color: ${theme.colors.tertiaryText};
    }
    button {
      max-width: ${normalizeValue(1)};
      svg {
        stroke: ${theme.colors.tertiaryText};
        fill: ${theme.colors.tertiaryText};
        width: 100%;
        height: 100%;
      }
    }
    p {
      word-break: break-all;
    }
  `}
`;

export const SwitchCardArrow = styled.div`
  max-width: ${normalizeValue(0.8)};
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Links = styled.div``;
export const Card = styled.div<{ isHoverable?: boolean }>`
  ${({ isHoverable = true }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${normalizeValue(1)} ${normalizeValue(1.5)};
    &:last-child {
      margin-bottom: ${normalizeValue(1)};
    }
    ${isHoverable &&
    css`
      cursor: pointer;
      transition: opacity 0.3s ease-in-out;
      :hover {
        opacity: 0.6;
      }
    `}
  `}
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CardTitle = styled.div`
  ${({ theme }) => css`
    margin-left: ${normalizeValue(1)};
    span {
      font-size: ${normalizeValue(1.3)};
      color: ${theme.colors.tertiaryText};
    }
    p {
      opacity: 0.6;
    }
  `}
`;
