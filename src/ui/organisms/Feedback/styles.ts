import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Container = styled.div`
  width: 100%;
`;

export const Heading = styled.p`
  font-size: 4rem;
  padding-top: 3rem;
  font-weight: 700;
  ${media.lessThan("medium")`
    font-size:3rem;
  `}
`;

export const BorderWrapper = styled.div`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 4rem 2rem;
  max-width: 51rem;
  width: 100%;
`;

export const Question = styled.p`
  ${({ theme }) => css`
    opacity: 0.5;
    font-size: ${theme.font.sizes.small};
  `}
`;

export const Input = styled.textarea`
  ${({ theme }) => css`
    width: 100%;
    max-width: 42rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    background-color: ${theme.colors.secondaryBackgroundOpacity};
    opacity: 0.5;
    font-size: small;
    height: 3.4rem;
    padding-left: 0.8rem;
    padding: 1.5rem;
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
