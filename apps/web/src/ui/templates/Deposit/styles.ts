import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
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
  overflow: hidden;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem;
  overflow-y: scroll;
  @media screen and (min-width: 590px) {
    padding: 4rem 4rem 10rem 4rem;
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
    margin-bottom: 1rem;
    cursor: pointer;
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
    strong {
      color: ${theme.colors.text};
      font-weight: 500;
    }
  `}
`;

export const MAXButton = styled.button`
  ${({ theme }) => css`
    display: block;
    align-self: flex-end;
    font-size: 1.2rem;
    margin-top: 1.2rem;
    color: white;
    background: ${theme.colors.green};
    border-radius: 0.3rem;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    margin-bottom: -0.5rem;
    transition: background 0.2s ease-in;
    &:hover {
      background: ${theme.colors.green}88;
    }
  `}
`;

export const SelectAccountAvatar = styled.div``;
export const Success = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
`;

export const SelectAccount = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    align-items: center;
    div {
      &:first-child {
        min-width: 3.5rem;
        min-height: 3.5rem;
        border-radius: 0.8rem;
        padding: 0.8rem;
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
      &:last-child {
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
      &:first-child {
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
      &:last-child {
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
      &:first-child {
        border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;

export const History = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 1rem;
    margin-top: 4rem;
    padding-bottom: 3rem;
    flex: 1;
    h2 {
      font-size: 1.8rem;
      font-weight: 500;
      padding: 2rem 3rem;
    }
  `}
`;
export const HistoryContent = styled.div`
  ${({ theme }) => css`
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.secondaryBackground};
      padding-bottom: 1.5rem;
    }
  `}
`;
export const Status = styled.span<{ color: string }>`
  ${({ theme, color }) => css`
    background: ${theme.colors[color]};
    color: ${theme.colors.white};
    font-size: 1.1rem;
    padding: 0.3rem;
    border-radius: 0.4rem;
  `}
`;

export const Cell = styled.div`
  display: inline-block;
  vertical-align: middle;
  font-weight: 500;
`;

export const CellName = styled(Cell)`
  padding-left: 1rem;
`;

export const Cellamount = styled(Cell)``;
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
      color: ${theme.colors.tertiaryText};
      font-size: 1.2rem;
      padding: 0.6rem;
      transition:
        background 0.3s ease-in,
        border 0.3s ease-in;
      background: ${theme.colors.primary}22;
      color: ${theme.colors.primary};
      border-radius: 0.8rem;
      border: 1px solid;
      border-color: transparent;
      &:hover {
        background: transparent;
        border-color: ${theme.colors.primary};
      }
    }
  `}
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 10rem;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #8ba1be1;
`;
