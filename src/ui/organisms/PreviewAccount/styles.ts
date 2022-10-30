import styled, { css } from "styled-components";

export const Main = styled.section`
  ${({ theme }) => css`
    border-radius: 1.5rem 0 0 0;
    background: ${theme.colors.primaryBackground};
    box-shadow: ${theme.shadows.secondary};
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    gap: 2rem;
    min-width: 90vw;
    min-height: 99vh;
    height: 100%;
    padding: 3rem 2rem 2rem 2rem;
    @media screen and (min-width: 440px) {
      min-width: 50rem;
      max-width: 50rem;
    }
    overflow-y: auto;
  `}
`;
export const Header = styled.button`
  ${({ theme }) => css`
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    border-radius: 10rem;
    cursor: pointer;
    transition: background-color 0.5s ease-in;
    svg {
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
    }
    :hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
    :active {
      background: ${theme.colors.secondaryBackground};
    }
  `}
`;
export const Content = styled.div`
  h2 {
    font-size: 1.8rem;
    font-weight: 550;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1.5rem;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const Button = styled.button`
  ${({ theme }) => css`
    padding: 1rem;
    width: 100%;
    border-radius: 0.3rem;
    font-weight: 500;
    background: ${theme.colors.primary};
    :disabled {
      background: none;
      border: 2px solid ${theme.colors.secondaryBackground};
    }
  `}
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  strong {
    font-weight: normal;
    font-size: 1.1rem;
    align-self: flex-end;
  }
`;
export const CardWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-radius: 0.4rem;
    background: ${theme.colors.tertiaryBackgroundOpacity};
  `}
`;
export const CardContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
    span {
      font-size: 1.2rem;
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
    width: 1.5rem;
    height: 1.5rem;
    padding: ${isActive ? "0.3rem" : "0.4rem"};
    border-radius: 10rem;
    svg {
      fill: ${theme.colors.text};
      stroke: ${theme.colors.text};
    }
  `}
`;

export const Actions = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    button {
      background: ${isActive ? theme.colors.primary : theme.colors.secondaryBackgroundOpacity};
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

export const CardBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Icon = styled.div`
  ${({ theme }) => css`
    width: 0.8rem;
    svg {
      fill: ${theme.colors.tertiaryText};
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;
export const CardInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      fill: ${theme.colors.tertiaryText};
      stroke: ${theme.colors.tertiaryText};
    }

    small {
      color: ${theme.colors.tertiaryText};
      font-size: 1.3rem;
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
  gap: 1rem;
`;

export const FooterButton = styled.button`
  height: 100%;
  border-radius: 0.3rem;
  font-weight: 500;
  padding: 1rem;
`;

export const ExportButton = styled(FooterButton)`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    :disabled {
      background: gray;
      cursor: not-allowed;
    }
  `}
`;

export const DropdownButton = styled(FooterButton)`
  ${({ theme }) => css`
    background: ${theme.colors.red};
    cursor: pointer;
    div {
      display: inline-block;
      margin-left: 0.5rem;
      width: 0.7rem;
    }
  `}
`;

export const UnlockAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;
