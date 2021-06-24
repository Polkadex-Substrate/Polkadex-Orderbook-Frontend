import { WrapperIcon } from "src/components/CustomIcon/styles";
import styled, { css } from "styled-components";
export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin-right: 0.5rem;
    width: max-content;
  `}
`;

export const ContentWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 40rem;
    width: max-content;
    background-color: ${theme.colors.tertiaryBackground};
    box-shadow: ${theme.shadow.primary};
    border-radius: ${theme.border.radius.primary.medium};
  `}
`;

export const ContentWrapperContainer = styled.div`
  padding: 1.5rem;
`;

export const ContentWrapperFlex = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    display: flex;
  `}
`;

export const ContentWrapperHeader = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: 2rem 1.5rem;
    span {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 1.6rem;
      font-weight: 600;
    }
    p {
      opacity: 0.7;
    }
    h3 {
      font-size: ${theme.font.sizes.small};
      margin-bottom: 0.7rem;
    }
  `}
`;

export const TabWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    border-radius: ${theme.border.radius.primary.small};
  `}
`;

export const TabWrapperTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  span {
    margin-left: 1rem;
    font-weight: 600;
  }
`;

export const WalletWrapper = styled.div`
  ${WrapperIcon} {
    margin-right: 0.5rem;
  }
  h4 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;
export const WalletBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    opacity: 0.7;
  }
  span {
    font-weight: 500;
    font-size: 1.3rem;
  }
`;

export const WalletBox = styled.a`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    :not(:last-child) {
      margin-bottom: 1rem;
    }
  `}
`;
export const WalletBoxContainer = styled.div`
  span {
    font-weight: 600;
  }
  p {
    opacity: 0.7;
  }
`;

export const WalletContainer = styled.div``;

export const WalletSelectWrapper = styled.div``;
export const WalletSelectHeader = styled.button`
  ${WrapperIcon} {
    margin-right: 0.7rem;
    display: inline-block;
    vertical-align: middle;
  }
`;

export const WalletSelectContent = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    border-radius: 1rem;
    padding: 1.5rem;
    margin-top: 1.5rem;
    strong {
      display: block;
      margin-top: 1.5rem;
    }
  `}
`;
export const WalletSeletActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
`;

export const MyWallet = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    border-radius: 1.5rem;
    max-width: 35rem;
    width: max-content;
  `}
`;

export const MyWalletHeaderWrapper = styled.div``;
export const MyWalletHeader = styled.div`
  ${({ theme }) => css`
    padding: 1rem;
    display: flex;
    align-items: stretch;
    img {
      border-radius: 50%;
      max-width: 3rem;
      width: 100%;
      height: 100%;
      max-height: 3rem;
      margin-right: 1rem;
    }

    span {
      font-weight: 600;
      font-size: 1.4rem;
    }

    p {
      opacity: 0.7;
      font-size: 1.3rem;
    }
  `}
`;
export const MyWalletContent = styled.div``;
export const MyWalletBox = styled.div``;
export const MyWalletTransactions = styled.a`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    border-radius: 1.5rem;
    text-align: center;
    padding: 1.5rem 1rem;
    border-radius: 1.5rem;
    display: block;
    width: 100%;
    margin-top: 1.5rem;
  `}
`;
export const MyWalletBoxButton = styled.div`
  ${({ theme }) => css`
    button {
      background: ${theme.colors.primaryBackground};
      padding: 0.5rem;
      border-radius: 0.4rem;
    }
  `}
`;
export const MyWalletBoxWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-gap: 2rem;
    align-items: center;
    padding: 1rem 1.5rem;
    font-size: 1.2rem;

    button {
      background: ${theme.colors.primaryBackground};
      padding: 0.5rem;
      border-radius: 0.4rem;
    }
  `}
`;
export const MyWalletDropdown = styled.div`
  ${({ theme }) => css`
    button {
      :not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  `}
`;
export const MyWalletInput = styled.div`
  padding: 0 1.5rem;
  a {
    margin-top: 0.5rem;
    opacity: 0.7;
    ${WrapperIcon} {
      display: inline-block;
      vertical-align: center;
    }
  }
`;
