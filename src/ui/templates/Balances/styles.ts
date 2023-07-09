import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    min-height: 100vh;
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
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  width: 100%;
  padding-top: 4rem;
  max-width: 100vw;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    margin-bottom: 3rem;
    p {
      color: ${theme.colors.tertiaryText};
    }
    width: 90%;
    max-width: 140rem;
  `}
`;

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 1rem;
    width: 90%;
    max-width: 140rem;
  `}
`;
export const Content = styled.div`
  overflow-x: hidden;
  :is(:hover) {
    overflow-x: auto;
  }
  td,
  th {
    padding-right: 2rem;
  }
`;

export const Header = styled.div`
  ${({ theme }) =>
    css`
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      h2 {
        font-size: 1.6rem;
        font-weight: 550;
      }
    `}
`;

export const HeaderBox = styled.div`
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

export const WithdrawLink = styled(Link)``;
export const DepositLink = styled(Link)`
  ${({ theme }) => css`
    background: ${theme.colors.green};
    color: ${theme.colors.white};
    :hover {
      background-color: ${theme.colors.green}33;
    }
  `}
`;
