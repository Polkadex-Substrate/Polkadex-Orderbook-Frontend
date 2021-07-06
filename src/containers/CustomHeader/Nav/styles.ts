import { WrapperIcon } from "src/components/CustomIcon/styles";
import styled, { css } from "styled-components";

type StyleProps= {
  active: boolean
}

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
  `}
`;
export const Container = styled.div`
  :not(:last-child) {
    margin-right: 1rem;
  }
`

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
    width: max-content;
  `}
`;

export const MyWalletHeaderWrapper = styled.div``;
export const MyWalletHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: stretch;
    padding: 1rem 2rem;
    ${WrapperIcon} {
      margin-right: 0.5rem;
    }

    p {
      opacity: 0.7;
      font-size: 1.3rem;
      font-weight: 500;
      margin: 0;
    }
  `}
`;

export const WalletUsername = styled.span`
  font-weight: 600;
  font-size: 1.4rem;
`

export const WalletTag = styled.span`
   ${({ theme }) => css`
     background: ${theme.colors.primary};
     font-size: 1rem;
     line-height: 1;
     border-radius: 0.3rem;
     padding: 0.2rem;
     font-weight: 600;
     display: inline-block;
   `}
`

export const MyWalletContent = styled.div`
`;
export const MyWalletBox = styled.div``;
export const MyWalletTransactions = styled.a`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    text-align: center;
    padding: 1.2rem;
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

    a {
      opacity: 0.7;
      ${WrapperIcon} {
        display: inline-block;
        vertical-align: center;
      }
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
`;

// Language
export const LanguageWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: 1.5rem;
    border-radius: 1.2rem;
    width: fit-content;
  `}
`;

export const LanguageContainer = styled.div``;
export const LanguageTitle = styled.span`
  ${({ theme }) => css`
    font-size: 1.2rem;
    opacity: 0.6;
    font-weight: 600;
    display: block;
    margin-bottom: 1rem;
  `}
`;
export const LanguageContent = styled.div``;
export const LanguageCurrencyWrapper = styled.a`
  cursor: pointer;
  display: block;
  :not(:last-child) {
    margin-bottom: 1.1rem;
  }
`;

export const LanguageNameWrapper = styled.a<StyleProps>`
  ${({ theme, active }) => css`
  background: ${active ? theme.colors.primary : 'none'};
  padding: 0.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
    img {
      margin-right: 0.5rem;
      width: 2rem;
      height: 2rem;
    }
    span {
      margin-right: 0.5rem;
    }
    :hover {
      opacity: ${active ? 1 : 0.8};
      transition: ${theme.transition.default};
    }
  `}
`;

export const MyWalletLinks = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:last-child) {
      margin-bottom: 0.8rem;
    }
  }
`
