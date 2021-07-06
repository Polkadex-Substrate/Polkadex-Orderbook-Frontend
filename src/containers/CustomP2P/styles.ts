import { WrapperIcon } from "src/components/CustomIcon/styles";
import styled, { css } from "styled-components";

type StyleProps = {
  isActive?: boolean;
  isSell?: boolean;
};
export const Wrapper = styled.section`
  ${({ theme }) => css`
    grid-area: P2P;
    max-height: 100vh;
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 1rem;

    h2 {
      font-size: ${theme.font.sizes.medium};
      font-weight: 500;
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin-top: 1.5rem;
  `}
`;
export const TabHeader = styled.div<StyleProps>`
  ${({ theme, isSell, isActive }) => css`
    background: ${isActive
      ? isSell
        ? theme.colors.primary
        : theme.colors.green
      : "transparent"};
    padding: 1.2rem;
    border-radius: 0.2rem;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
  `}
`;
export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: 1rem;
  `}
`;
export const Footer = styled.div`
  margin-top: 2.5rem;
`;
export const FooterTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  a {
    opacity: 0.6;
    ${WrapperIcon} {
      display: inline-block;
      margin-left: 0.5rem;
      line-height: 0;
      vertical-align: middle;
    }
  }
`;
export const FooterContent = styled.div``;
export const FooterActions = styled.div`
  ${({ theme }) => css`
    margin: 0 0 2rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    margin-bottom: 1.5rem;
    button {
      background: ${theme.colors.primaryBackground};
      border-bottom: 2px solid;
      padding: 1.2rem;
      border-radius: 0.2rem;
      font-weight: 600;
      :first-child {
        border-bottom-color: ${theme.colors.green};
      }
      :last-child {
        border-bottom-color: ${theme.colors.primary};
      }
    }
  `}
`;
export const FooterTokens = styled.div``;
export const FooterToken = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;
export const FooterTokenCard = styled.div`
  :first-child {
    display: flex;
    align-items: center;
    p {
      margin-right: 0.5rem;
      font-weight: 600;
    }
    span {
      opacity: 0.6;
    }
  }
  :last-child {
    span {
      font-weight: 600;
    }
  }
  span {
    display: block;
  }
`;

// Form
export const FormWrapper = styled.div``;
export const FormHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1.5rem;
  `}
`;

export const FormTabHeader = styled.div<StyleProps>`
  ${({ theme, isSell, isActive }) => css`
    border-bottom: 2px solid;
    border-bottom-color: ${isActive
      ? isSell
        ? theme.colors.primary
        : theme.colors.green
      : "transparent"};
    opacity: ${isActive ? 1 : 0.7};
    padding: 1.2rem;
    border-radius: 0.2rem;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
  `}
`;
export const FormContent = styled.div``;

// Input
export const InputWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: 1.2rem 0.8rem;
    border-radius: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    p { 
      margin: 0;
      }
    p,
    span {
      opacity: 0.6;
      font-weight: 500;
    }
    div {
      flex: 1;
      text-align: end;
    }
    input {
      color: ${theme.colors.text};
      text-align: end;
      margin-right: 1rem;
      font-size: ${theme.font.sizes.medium};
    }
  `}
`;
