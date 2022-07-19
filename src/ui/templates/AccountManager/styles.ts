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
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 4rem;
`;

export const Title = styled.div`
  h1 {
    font-size: 2.3rem;
    font-weight: 550;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const TitleBalance = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    align-items: center;
    div {
      :first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;
        border: 1px solid ${theme.colors.secondaryBackground};
        border-radius: 10rem;
      }
      :last-child {
        strong {
          display: block;
          margin-bottom: 0.3rem;
          font-weight: 500;
        }
        strong,
        small {
          color: ${theme.colors.secondaryText};
          font-size: 1.2rem;
        }
        span {
          font-size: 1.5rem;
          font-weight: 500;
        }
      }
    }
    svg {
      max-width: 1.5rem;
      stroke: ${theme.colors.secondaryText};
    }
  `}
`;

export const TitleActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    a {
      color: ${theme.colors.secondaryText};
      border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      padding: 1rem 2rem;
      border-radius: 1rem;
    }
  `}
`;
export const Content = styled.div`
  margin-top: 4rem;
  h2 {
    font-size: 2rem;
    font-weight: 550;
  }
`;
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;
export const Card = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    border-radius: 1rem;
    border-width: 1px;
    border-style: solid;
    border-color: ${isActive ? theme.colors.primary : theme.colors.secondaryBackground};
    border-left-width: ${isActive ? "6px" : "1px"};
  `}
`;
export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  padding-bottom: 6rem;
`;

export const CardHeaderIcon = styled.div`
  ${({ theme }) => css`
    width: 1.5rem;
    svg {
      stroke: ${theme.colors.secondaryText};
    }
  `}
`;

export const CardHeaderContent = styled.div`
  ${({ theme }) => css`
    strong {
      display: block;
      font-size: 1.6rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    button {
      display: inline-block;
      width: 1.4rem;
      height: 1.4rem;
      vertical-align: middle;
      margin-right: 0.4rem;
      svg {
        display: block;
        stroke: ${theme.colors.secondaryText};
      }
    }
    span {
      color: ${theme.colors.secondaryText};
      font-size: 1.4rem;
      display: flex;
    }
    p {
      white-space: nowrap;
    }
  `}
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem 2rem 2rem;
`;

export const DropdownHeader = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 0.8rem;
    padding: 0.5rem 1rem;
    color: ${theme.colors.secondaryText};
    font-size: 1.5rem;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 0.8rem;
    padding: 0.5rem 1rem;
    user-select: none;
    div {
      vertical-align: middle;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      margin-left: 1rem;
      svg {
        stroke: ${theme.colors.secondaryText};
      }
    }
  `}
`;
export const DropdownContent = styled.div`
  ${({ theme }) => css`
    background: white;
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 0.8rem;
    button {
      white-space: nowrap;
      color: ${theme.colors.secondaryText};
      font-size: 1.5rem;
      padding: 1.2rem;
      transition: background 0.5s ease-in;
      text-align: left;
      width: 100%;
      :first-child {
        border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
      :hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;

export const ContentActions = styled.div`
  ${({ theme }) => css`
    span,
    button {
      font-size: 1.5rem;
    }
    span {
      display: block;
      color: ${theme.colors.primary};
    }
    button {
      color: ${theme.colors.secondaryText};
      background: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: 0.8rem;
      padding: 0.8rem 1.8rem;
      height: fit-content;
    }
  `}
`;

export const CreateAccount = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    border: 3px dashed ${theme.colors.secondaryBackground};
    cursor: pointer;
  `}
`;
export const CreateAccountWrapper = styled.div`
  ${({ theme }) => css`
    font-size: 1.5rem;
    color: ${theme.colors.secondaryText};
    div {
      display: inline-block;
      width: 1rem;
      margin-right: 0.5rem;
      svg {
        fill: ${theme.colors.secondaryText};
      }
    }
    a {
      color: ${theme.colors.primary};
    }
  `}
`;
