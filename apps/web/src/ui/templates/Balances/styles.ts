import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    height: 100vh;
    display: flex;
    max-width: ${normalizeValue(160)};
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    flex-direction: column;
  `}
`;

export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  max-height: 95vh;
  overflow: hidden;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-left: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (min-width: 590px) {
      margin-left: ${normalizeValue(2)};
    }
  `}
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 100vw;
`;

export const Container = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    background: ${theme.colors.clearBackgroundOpacity};
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;
  &:is(:hover) {
    overflow-x: auto;
  }
  td,
  th {
    padding-right: ${normalizeValue(2)};
  }
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.6)};
    padding: ${normalizeValue(2)};
    h1 {
      font-size: ${normalizeValue(2.5)};
      font-weight: 500;
    }
    h2 {
      font-size: ${theme.font.sizes.small};
      font-weight: normal;
      opacity: 0.5;
    }
    @media screen and (min-width: 1110px) {
      padding: ${normalizeValue(4)};
    }
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    padding: ${normalizeValue(1.5)} ${normalizeValue(2)};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    h2 {
      font-size: ${normalizeValue(1.7)};
      font-weight: 600;
    }
    @media screen and (min-width: 1110px) {
      padding: ${normalizeValue(1.5)} ${normalizeValue(4)};
    }
  `}
`;

export const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${normalizeValue(1)};
  label {
    white-space: nowrap;
  }
`;

export const Column = styled.div`
  ${({ theme }) => css`
    font-size: ${normalizeValue(1.2)};
    font-weight: 500;
    color: ${theme.colors.tertiaryText};
  `}
`;

export const Cell = styled.div`
  ${({ theme }) => css`
    display: inline-block;
    vertical-align: middle;
    font-weight: 500;
    small {
      font-size: ${normalizeValue(1.3)};
      color: ${theme.colors.tertiaryText};
    }
    span {
      white-space: nowrap;
    }
    &.pdexCell {
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const CellFlex = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${normalizeValue(1)};
`;

export const TokenIcon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(5)};
    width: ${normalizeValue(2.5)};
    height: ${normalizeValue(2.5)};
    margin-right: ${normalizeValue(0.3)};
    background: ${theme.colors.primaryBackground};
  `}
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
`;

export const Link = styled.div`
  ${({ theme }) => css`
    border-radius: ${normalizeValue(0.4)};
    padding: ${normalizeValue(0.2)} ${normalizeValue(0.4)};
    font-size: ${normalizeValue(1.3)};
    transition: background-color 0.4s ease-in-out;
    border: 1px solid ${theme.colors.secondaryBackground};
    cursor: pointer;
  `}
`;

export const WithdrawLink = styled(Link)`
  ${({ theme }) => css`
    &.disabled {
      color: ${theme.colors.tertiaryText};
      cursor: not-allowed;
    }
  `}
`;

export const DepositLink = styled(Link)`
  ${({ theme }) => css`
    background: ${theme.colors.green};
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.green}33;
    }
    .disabled {
      background-color: ${theme.colors.green}33;
      cursor: not-allowed;
    }
  `}
`;

export const LoadingWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    z-index: 20;
    height: ${normalizeValue(38)};
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.tertiaryBackgroundOpacity};
  `}
`;

export const Support = styled.div`
  display: flex;
  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

export const SupportCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex: 1;
    align-items: flex-end;
    justify-content: space-between;
    gap: ${normalizeValue(3)};
    padding: ${normalizeValue(4)};
    p {
      opacity: 0.6;
      font-size: ${normalizeValue(1.3)};
    }
    h4 {
      font-size: ${normalizeValue(1.7)};
      font-weight: 500;
    }
    a,
    button {
      font-size: ${normalizeValue(1.3)};
      background: ${theme.colors.secondaryBackgroundOpacity};
      padding: ${normalizeValue(1)} ${normalizeValue(2)};
      border-radius: ${normalizeValue(0.5)};
      transition: background-color 0.5s ease;
      white-space: nowrap;
      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
      &:hover:not(:disabled) {
        background: ${theme.colors.secondaryBackground};
      }
      &:active:not(:disabled) {
        background: ${theme.colors.primary};
      }
    }

    &:first-child {
      @media screen and (max-width: 850px) {
        border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
      @media screen and (min-width: 850px) {
        border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;

export const SupportCardContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.5)};
    div {
      width: ${normalizeValue(3)};
      height: ${normalizeValue(3)};
      padding: ${normalizeValue(0.6)};
      border-radius: ${normalizeValue(50)};
      background: ${theme.colors.secondaryBackgroundOpacity};
      margin-bottom: ${normalizeValue(1)};
    }
  `}
`;

export const SkeletonComponent = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  gap: ${normalizeValue(1)};
  flex-direction: column;
  @media screen and (min-width: 1110px) {
    padding: ${normalizeValue(4)};
  }
`;

export const IntroCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1)};
  div {
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1.5)};
  }
  span {
    font-size: ${normalizeValue(1.8)};
    font-weight: 500;
  }
  p {
    line-height: 1.4;
    opacity: 0.7;
    font-size: ${normalizeValue(1.4)};
  }
`;
