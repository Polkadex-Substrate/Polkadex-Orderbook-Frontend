import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    padding: 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
    width: 100%;
  `}
`;

export const BreadCrumbWrapper = styled.div`
  ${({ theme }) => css`
    font-size: large;
    font-weight: 300;
  `}
`;

export const LastCrumb = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.tertiaryText};
  `}
`;

export const Heading = styled.p`
  font-size: 4rem;
  padding-top: 3rem;
  font-weight: 700;
`;

export const QuestionWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const Question = styled.p`
  ${({ theme }) => css`
    opacity: 0.5;
    font-size: medium;
  `}
`;

export const Button = styled.button<{ isDisabled: boolean }>`
  ${({ theme, isDisabled }) => css`
    background-color: ${isDisabled ? "gray" : theme.colors.primary};
    font-size: large;
    padding: 1.8rem 0rem;
    border-radius: ${theme.border.radius.medium};
    width: 50rem;
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    width: 50rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    background-color: ${theme.colors.secondaryBackgroundOpacity};
    opacity: 0.5;
    font-size: small;
    height: 5.4rem;
    padding-left: 0.8rem;
    color: white;
    &::placeholder {
      color: ${theme.colors.tertiaryText};
    }
  `}
`;

export const InputError = styled.div`
  ${({ theme }) => css`
    font-size: small;
    color: ${theme.colors.red};
    margin-top: 1rem;
  `}
`;
