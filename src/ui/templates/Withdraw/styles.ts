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

export const Title = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.secondaryText};
    cursor: pointer;
    transition: color 0.5s ease-in;
    width: fit-content;
    div {
      vertical-align: middle;
      display: inline-block;
      width: 3rem;
      height: 3rem;
      padding: 0.8rem;
      border-radius: 10rem;
      border: 1px solid ${theme.colors.secondaryBackground};
      margin-right: 0.8rem;
      transition: border 0.5s ease-in;

      svg {
        fill: ${theme.colors.text};
        stroke: ${theme.colors.text};
      }
    }
    :hover {
      color: ${theme.colors.text};
      div {
        border-color: ${theme.colors.text};
      }
    }
  `}
`;

export const Column = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 2rem;
    background-image: url("/img/depositHero.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right;
    @media screen and (min-width: 830px) {
      background-position: bottom;
    }
    div {
      padding: 3.5rem;
    }
    h1 {
      font-size: 2.2rem;
      font-weight: 550;
      margin-bottom: 1.5rem;
    }
    p {
      line-height: 1.4;
    }
  `}
`;

export const Container = styled.div`
  flex: 1;
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
  @media screen and (min-width: 830px) {
    grid-template-columns: minmax(25rem, 30rem) 1fr;
  }
`;

export const Box = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;

  @media screen and (min-width: 830px) {
    padding: 8rem 4rem 4rem 4rem;
  }
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

export const SelectInputContainer = styled.div`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    padding-bottom: 1rem;
    margin-top: 1rem;

    input {
      width: 100%;
      display: block;
      color: ${theme.colors.text};
    }
  `}
`;
export const Available = styled.span`
  ${({ theme }) => css`
    display: block;
    align-self: flex-end;
    font-size: 1.3rem;
    margin-top: 0.2rem;
    strong {
      color: ${theme.colors.text};
      font-weight: 500;
    }
  `}
`;

export const SelectAccount = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    align-items: center;
    div {
      :first-child {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 0.8rem;
        padding: 0.8rem;
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      :last-child {
        strong {
          font-size: 1.4rem;
          font-weight: 500;
        }
        span {
          color: ${theme.colors.tertiaryText};
        }
        strong,
        span {
          display: block;
        }
      }
    }
  `}
`;

export const DropdownHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-between;
    flex: 1;
    div {
      span {
        display: block;
      }
      :first-child {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        span {
          width: 2rem;
          height: 2rem;
          border-radius: 10rem;
          padding: 0.4rem;
          background: ${theme.colors.secondaryBackgroundOpacity};
        }
      }
      :last-child {
        span {
          width: 1rem;
          height: 1rem;
          svg {
            stroke: ${theme.colors.secondaryText};
          }
        }
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
      font-size: 1.3rem;
      padding: 1.2rem;
      border-radius: 0.8rem;
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

export const Form = styled.div`
  @media screen and (min-width: 830px) {
    max-width: 40rem;
  }
  form {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
`;

export const History = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 1rem;
    margin-top: 4rem;
    flex: 1;
    h2 {
      padding: 2rem 2rem 0 2rem;

      font-size: 1.8rem;
      font-weight: 500;
    }
  `}
`;
export const HistoryWrapper = styled.div`
  max-height: 35rem;
  overflow-y: hidden;
  padding: 2rem;
  height: 100%;
  :hover {
    overflow-y: auto;
  }
`;

export const HistoryContent = styled.div`
  ${({ theme }) => css`
    :not(:last-child) {
      border-bottom: 1px solid ${theme.colors.secondaryBackground};
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
    }
  `}
`;
export const HistoryTable = styled.div`
  margin-top: 1.5rem;
  th,
  td {
    width: 10rem;
  }
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
  `}
`;
export const HeaderColumn = styled.strong`
  ${({ theme }) => css`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${theme.colors.tertiaryText};
  `}
`;

export const HistoryTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    strong {
      font-weight: normal;
      font-size: 1.5rem;
    }
    button {
      width: fit-content;
      font-size: 1.2rem;
      padding: 0.8rem;
    }
  `}
`;
