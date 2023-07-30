import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const Card = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: 1.5rem;
    border-radius: 0.4rem;
    span {
      font-size: 1.3rem;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  h3 {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Words = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const WordsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;
export const WordsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const WordsTitle = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 0.5rem;
    border-radius: 0.5rem;
    div {
      width: 1.5rem;
      height: 1.5rem;
      svg {
        fill: ${theme.colors.tertiaryText};
        stroke: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const WordsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    div {
      padding: 0.3rem 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid ${theme.colors.secondaryBackground};
      width: fit-content;
    }
    input {
      color: ${theme.colors.text};
    }
    svg {
      stroke: ${theme.colors.tertiaryText};
      fill: ${theme.colors.tertiaryText};
    }
  `}
`;

export const WordsFooter = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    font-size: 1.2rem;
    text-align: center;
    color: ${theme.colors.tertiaryText};
    button {
      display: flex;
      align-items: center;
      background: ${theme.colors.secondaryBackgroundOpacity};
      padding: 0.5rem;
      border-radius: 0.5rem;
      div {
        display: inline-block;
        margin-right: 0.4rem;
        width: 1.5rem;
        height: 1.5rem;
        svg {
          fill: ${theme.colors.tertiaryText};
          stroke: ${theme.colors.tertiaryText};
        }
      }
    }
  `}
`;

export const DefaultAccount = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const Wallet = styled(Card)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    p {
      strong {
        font-size: 1.2rem;
        font-weight: normal;
        color: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const WalletContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    button {
      width: 1.2rem;
      height: 1.2rem;

      svg {
        stroke: ${theme.colors.tertiaryText};
        fill: ${theme.colors.tertiaryText};
      }
    }
  `}
`;
export const Actions = styled.div`
  ${({ theme }) => css`
    text-align: center;
    padding: 1.2rem 1rem;
    background: ${theme.colors.primary};
    border-radius: 0.4rem;
    transition: background-color 0.4s ease-in;
    cursor: pointer;
    font-weight: 500;
    :hover {
      background: ${theme.colors.primary}99;
    }
  `}
`;
