import styled, { css } from "styled-components";
import media from "styled-media-query";

import { normalizeValue } from "@/utils/normalize";

export const Container = styled.div`
  width: 100%;
`;

export const Heading = styled.p`
  font-size: 4rem;
  padding-top: ${normalizeValue(3)};
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
    gap: ${normalizeValue(1.5)};
    padding: ${normalizeValue(3)};
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
    background-color: ${theme.colors.secondaryBackgroundOpacity};
    opacity: 0.5;
    font-size: small;
    height: ${normalizeValue(1.4)};
    padding-left: ${normalizeValue(0.8)};
    padding: ${normalizeValue(1.5)};
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
    margin-top: ${normalizeValue(1)};
  `}
`;

export const SwitchWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(1.5)};
  `}
`;

export const Switch = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 6rem;
    height: ${normalizeValue(3)};
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: ${normalizeValue(0.4)};
    cursor: pointer;
  `}
`;

export const SwitchHandle = styled.div<{ active: boolean | null }>`
  ${({ theme, active }) => css`
    width: ${normalizeValue(2)};
    height: ${normalizeValue(3)};
    background-color: ${active
      ? theme.colors.primary
      : theme.colors.secondaryBackgroundOpacity};
    transition: 300ms all;
    border-radius: ${normalizeValue(0.4)};
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

export const Comment = styled.div<{ maxHeight: number | undefined }>`
  height: ${(p) => `${p.maxHeight}px`};
  transition: all 0.25s ease-in-out;
  overflow: hidden;
  display: flex;
  gap: ${normalizeValue(1.5)};
  flex-direction: column;
  margin-top: ${(p) => `${p.maxHeight ? "0" : "-1.5rem"}`};
`;
