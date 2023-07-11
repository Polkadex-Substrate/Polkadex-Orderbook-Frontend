import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
  `}
`;

export const Heading = styled.p`
  font-size: 4rem;
  padding-top: 3rem;
  font-weight: 700;
  ${media.lessThan("medium")`
  font-size:3rem
  `}
`;

export const BorderWrapper = styled.div`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const QuestionWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 3rem;
    max-width: 51rem;
    width: 100%;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
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
    height: 1.4rem;
    padding-left: 0.8rem;
    padding: 1.5rem;
    color: ${theme.colors.text};
    flex-shrink: 0;

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

export const SwitchWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.5rem;
  `}
`;

export const Switch = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 6rem;
    height: 3rem;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: 0.4rem;
    cursor: pointer;
  `}
`;

export const SwitchHandle = styled.div<{ active: boolean }>`
  ${({ theme, active }) => css`
    width: 2rem;
    height: 3rem;
    background-color: ${active
      ? theme.colors.primary
      : theme.colors.secondaryBackgroundOpacity};
    transition: 300ms all;
    border-radius: 0.4rem;
    flex-shrink: 0;
  `}
`;

export const SwitchText = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  `}
`;

export const Comment = styled.div<{ maxHeight: number }>`
  height: ${(p) => `${p.maxHeight}px`};
  transition: all 0.25s ease-in-out;
  overflow: hidden;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  margin-top: ${(p) => `${p.maxHeight ? "0" : "-1.5rem"}`};
`;
