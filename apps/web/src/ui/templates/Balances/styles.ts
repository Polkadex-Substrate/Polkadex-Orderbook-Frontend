import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    height: 100vh;
    display: flex;
    max-width: 160rem;
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
      margin-left: 2rem;
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
    padding-right: 2rem;
  }
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 2rem;
    h1 {
      font-size: 2.5rem;
      font-weight: 500;
    }
    h2 {
      font-size: ${theme.font.sizes.small};
      font-weight: normal;
      opacity: 0.5;
    }
    @media screen and (min-width: 1110px) {
      padding: 4rem;
    }
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    h2 {
      font-size: 1.7rem;
      font-weight: 550;
    }
    @media screen and (min-width: 1110px) {
      padding: 1.5rem 4rem;
    }
  `}
`;

export const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  label {
    white-space: nowrap;
  }
`;

export const Column = styled.div`
  ${({ theme }) => css`
    font-size: 1.2rem;
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
      font-size: 1.3rem;
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
  padding-left: 1rem;
`;

export const TokenIcon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 5rem;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.3rem;
    background: ${theme.colors.primaryBackground};
  `}
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Link = styled.div`
  ${({ theme }) => css`
    border-radius: 0.4rem;
    padding: 0.2rem 0.4rem;
    font-size: 1.3rem;
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
    height: 30rem;
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
    gap: 3rem;
    padding: 4rem;
    p {
      opacity: 0.6;
    }
    h4 {
      font-size: 1.7rem;
      font-weight: 500;
    }
    a {
      background: ${theme.colors.secondaryBackgroundOpacity};
      padding: 1rem 2rem;
      border-radius: 0.5rem;
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
    gap: 0.5rem;
    div {
      width: 3rem;
      height: 3rem;
      padding: 0.6rem;
      border-radius: 50rem;
      background: ${theme.colors.secondaryBackgroundOpacity};
      margin-bottom: 1rem;
    }
  `}
`;

export const SkeletonComponent = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  gap: 1rem;
  flex-direction: column;
  @media screen and (min-width: 1110px) {
    padding: 4rem;
  }
`;
