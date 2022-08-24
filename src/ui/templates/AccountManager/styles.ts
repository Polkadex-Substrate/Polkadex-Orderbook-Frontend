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
  padding: 2rem;
  @media screen and (min-width: 590px) {
    padding: 4rem;
  }
`;

export const Title = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 2rem;
    border-radius: 1rem;
    h1 {
      font-size: 2.3rem;
      font-weight: 550;
    }
  `}
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 2rem;
`;

export const TitleBalance = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
`;
export const TitleText = styled.small`
  ${({ theme }) => css`
    display: block;
    color: ${theme.colors.tertiaryText};
    margin-bottom: 1rem;
    font-size: 1.2rem;
  `}
`;

export const TitleActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    a {
      padding: 1rem 2rem;
      border-radius: 1rem;
      font-weight: 500;
      transition: border 0.5s ease-in, background 0.5s ease-in;
    }
  `}
`;
export const OthersActions = styled.a`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    :active {
      border-color: ${theme.colors.primary};
    }
    :hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;

export const Deposit = styled.a`
  ${({ theme }) => css`
    background: ${theme.colors.green};
    color: ${theme.colors.white};
    cursor: pointer;
    :hover {
      background: ${theme.colors.green}33;
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
export const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  span {
    user-select: none;
  }
  div {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
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
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    padding-bottom: 6rem;
    :hover {
      strong {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

export const CardHeaderIcon = styled.div`
  ${({ theme }) => css`
    width: 1.5rem;
    svg {
      stroke: ${theme.colors.tertiaryText};
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
      transition: color 0.3s ease-in-out;
    }
    button {
      display: inline-block;
      width: 1.4rem;
      height: 1.4rem;
      vertical-align: middle;
      margin-right: 0.4rem;
      svg {
        display: block;
        stroke: ${theme.colors.tertiaryText};
      }
    }
    span {
      color: ${theme.colors.tertiaryText};
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
    color: ${theme.colors.tertiaryText};
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
        stroke: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const DropdownContent = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 0.8rem;
    button {
      white-space: nowrap;
      color: ${theme.colors.tertiaryText};
      font-size: 1.5rem;
      padding: 1.2rem;
      transition: background 0.5s ease-in;
      text-align: left;
      width: 100%;
      border-radius: 0.8rem;

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
      background-color: ${theme.colors.primary}22;
      padding: 0.6rem 1rem;
      border-radius: 0.8rem;
      cursor: not-allowed;
    }
    button {
      color: ${theme.colors.tertiaryText};
      background: ${theme.colors.secondaryBackgroundOpacity};
      border-radius: 0.8rem;
      padding: 0.8rem 1.8rem;
      height: fit-content;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      transition: background 0.3s ease-in, border 0.3s ease-in;
      :hover {
        border-color: ${theme.colors.secondaryBackgroundOpacity};
        background: none;
      }
      :active {
        border-color: ${theme.colors.primary};
      }
    }
  `}
`;

export const CreateAccount = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    border: 3px dashed ${theme.colors.secondaryBackground};
    cursor: pointer;
    min-height: 20rem;
  `}
`;

export const CreateAccountWrapper = styled.div`
  ${({ theme }) => css`
    font-size: 1.5rem;
    color: ${theme.colors.tertiaryText};
    div {
      display: inline-block;
      width: 1rem;
      margin-right: 0.5rem;
      svg {
        fill: ${theme.colors.primary};
      }
    }
    a {
      color: ${theme.colors.primary};
    }
  `}
`;

export const LinkAccountColumn = styled.a`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 2rem;
    flex: 1;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 1.5rem;
    margin-top: 1rem;
    transition: transform 0.2s ease-in, box-shadow 0.2s ease-in;
    :hover {
      transform: translateY(0.2rem);
      box-shadow: ${theme.shadows.tertiary};
    }
    span {
      display: block;
      font-size: 1.6rem;
      font-weight: 550;
      margin-bottom: 0.3rem;
    }
  `}
`;

export const FlexCenter = styled.div``;

export const LinkAccountColumnWrapper = styled.div`
  ${({ theme }) => css`
    :first-child {
      svg {
        width: 3rem;
      }
    }
    :last-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      span {
        display: block;
        font-size: 1.4rem;
        font-weight: 550;
        margin-bottom: 0.3rem;
        transition: color 0.3s ease-in-out;
      }
      div {
        :last-child {
          width: 1.5rem;
          svg {
            transition: stroke 0.3s ease-in-out;
            stroke: ${theme.colors.tertiaryText};
          }
        }
      }
    }
  `}
`;

export const SelectInput = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    user-select: none;
    span {
      display: block;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const SelectInputFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;
export const SelectInputWrapper = styled.div``;

export const SelectInputContainer = styled.div`
  ${({ theme }) => css`
    input {
      width: 100%;
      display: block;
      color: ${theme.colors.text};
    }
  `}
`;

export const SelectAccount = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;
`;

export const SelectAccountContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    align-items: center;

    :first-child {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 0.8rem;
      padding: 0.8rem;
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
    :last-child {
      flex: 1;
      justify-content: space-between;
      strong {
        font-size: 1.4rem;
        font-weight: 500;
      }
      span {
        color: ${theme.colors.tertiaryText};
      }
      span,
      strong {
        display: block;
      }
      div:last-child {
        width: 1.1rem;
        align-self: center;
        fill: ${theme.colors.tertiaryText};
        stroke: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const Verified = styled.small`
  ${({ theme }) => css`
    align-self: flex-start;
    display: inline-block !important;
    margin-left: 1rem;
    white-space: nowrap;
    background: ${theme.colors.green}33;
    padding: 0.2rem 0.4rem;
    border-radius: 0.3rem;
    font-size: 1.2rem;
    svg {
      width: 1rem;
      display: inline-block;
      vertical-align: middle;
    }
  `}
`;

export const UnVerified = styled.a`
  ${({ theme }) => css`
    padding: 1rem 2rem;
    border-radius: 1rem;
    font-weight: 500;
    transition: background-color 0.5s ease-in, color 0.5s ease-in;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    cursor: pointer;
    :hover {
      background: ${theme.colors.primary}33;
      color: ${theme.colors.primary};
    }
  `}
`;
export const MyDropdownContentTitle = styled.div`
  padding: 1.2rem;
`;
export const MyDropdownContentCard = styled.div`
  ${({ theme }) => css`
    white-space: nowrap;
    font-size: 1.3rem;
    transition: background 0.5s ease-in;
    text-align: left;

    span {
      display: inline-block;
      margin-left: 0.4rem;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const MyDropdownContent = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 0.8rem;
  `}
`;

export const ContentEmpty = styled.div`
  ${({ theme }) => css`
    margin-top: 2rem;
    border-radius: 1.5rem;
    border: 2px solid ${theme.colors.tertiaryBackground};
    display: grid;

    gap: 2.5rem;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 2rem;
    opacity: 0.8;
    div {
      background: ${theme.colors.tertiaryBackgroundOpacity};
      width: 100%;
      height: 8rem;
      border-radius: 1.5rem;
    }
  `}
`;
