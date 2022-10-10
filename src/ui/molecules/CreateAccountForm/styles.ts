import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: 1.5rem;
    border-radius: 0.4rem;
    span {
      font-size: 1.2rem;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const WalletSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  small {
    align-self: flex-end;
    opacity: 0.5;
  }
`;

export const WalletSelectWrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WalletSelectArrow = styled.div`
  width: 0.8rem;
`;

export const DropdownHeader = styled.span`
  ${({ theme }) => css`
    small {
      color: ${theme.colors.tertiaryText};
      font-size: 1.3rem;
    }
  `}
`;

export const WalletSelectContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    p {
      strong {
        font-weight: normal;
        color: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const WalletSelectContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    div {
      width: 1.3rem;
      height: 1.3rem;
      padding: 0.2rem;
      border-radius: 10rem;
      background: ${theme.colors.secondaryBackgroundOpacity};
      svg {
        stroke: ${theme.colors.tertiaryText};
        fill: ${theme.colors.tertiaryText};
      }
    }
  `}
`;
export const WalletName = styled(Container)`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      flex: 1;
    }
    input {
      color: ${theme.colors.text};
    }
    button {
      background: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: 0.3rem;
      padding: 0.5rem;
      font-weight: 500;
      font-size: 1.3rem;
      transition: background-color 0.4s ease-in-out;
      :hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
export const Password = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const PasswordHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const PasswordFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      color: ${theme.colors.text};
      width: 100%;
    }
    button {
      width: 1.5rem;
      svg {
        fill: ${theme.colors.tertiaryText};
        stroke: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const Footer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    button {
      border-radius: 0.3rem;
      font-weight: 500;
      padding: 1rem;
      :first-child {
        background: ${theme.colors.secondaryBackground};
      }
      :last-child {
        flex: 1;
        background: ${theme.colors.primary};
      }
    }
  `}
`;
