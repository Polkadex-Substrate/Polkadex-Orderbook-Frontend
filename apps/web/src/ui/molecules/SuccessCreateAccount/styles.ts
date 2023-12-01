import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(2)};
`;

export const Card = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: ${normalizeValue(1.5)};
    border-radius: ${normalizeValue(0.4)};
    span {
      font-size: ${normalizeValue(1.3)};
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.5)};
  text-align: center;
  h3 {
    font-size: ${normalizeValue(1.8)};
    font-weight: 500;
  }
`;
export const CopyButton = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(0.5)};
    transition: background-color ease 0.5s;
    width: 100%;
    text-align: center;
    &:hover {
      background: ${theme.colors.secondaryBackground};
    }
    &.active {
      background: ${theme.colors.green};
    }
    &:disabled {
      cursor: not-allowed;
      background: ${theme.colors.primaryBackgroundOpacity};
    }
  `}
`;
export const MnemonicFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.5)};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.5)};
`;

export const Words = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1.5)};
`;

export const WordsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${normalizeValue(2)};
`;

export const WordsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.5)};
`;

export const WordsTitle = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: ${normalizeValue(0.5)};
    border-radius: ${normalizeValue(0.5)};
    div {
      width: ${normalizeValue(1.5)};
      height: ${normalizeValue(1.5)};
      svg {
        fill: ${theme.colors.tertiaryText};
        stroke: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const WordsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${normalizeValue(1)};
    div {
      padding: 0.3rem ${normalizeValue(0.5)};
      border-radius: ${normalizeValue(0.5)};
      border: 1px solid ${theme.colors.secondaryBackground};
      width: fit-content;
    }
    input {
      color: ${theme.colors.text};
    }
    svg {
      stroke: ${theme.colors.tertiaryText};
      fill: ${theme.colors.tertiaryText};
    }
  `}
`;

export const WordsFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${normalizeValue(1)};
    font-size: ${normalizeValue(1.2)};
    text-align: center;
    color: ${theme.colors.tertiaryText};
    button {
      display: flex;
      align-items: center;
      background: ${theme.colors.secondaryBackgroundOpacity};
      padding: ${normalizeValue(0.5)};
      border-radius: ${normalizeValue(0.5)};
      div {
        display: inline-block;
        margin-right: ${normalizeValue(0.4)};
        width: ${normalizeValue(1.5)};
        height: ${normalizeValue(1.5)};
        svg {
          fill: ${theme.colors.tertiaryText};
          stroke: ${theme.colors.tertiaryText};
        }
      }
    }
  `}
`;

export const DefaultAccount = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${normalizeValue(0.5)};
`;

export const Wallet = styled(Card)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.7)};
    p {
      strong {
        font-size: ${normalizeValue(1.2)};
        font-weight: normal;
        color: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const WalletContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    button {
      svg {
        stroke: ${theme.colors.tertiaryText};
        fill: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const Actions = styled.div`
  ${({ theme }) => css`
    text-align: center;
    padding: 1.2rem ${normalizeValue(1)};
    background: ${theme.colors.primary};
    border-radius: ${normalizeValue(0.4)};
    transition: background-color 0.4s ease-in;
    cursor: pointer;
    font-weight: 500;
    &:hover {
      background: ${theme.colors.primary}99;
    }
  `}
`;
