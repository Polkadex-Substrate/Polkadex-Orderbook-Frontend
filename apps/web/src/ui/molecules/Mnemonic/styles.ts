import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: ${normalizeValue(1.2)};
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.secondaryBackground};
    width: 100%;
    border-radius: ${normalizeValue(1)};
    input,
    label {
      color: ${theme.colors.black};
    }
    label,
    input {
      font-size: ${normalizeValue(1.3)};
    }
    label {
      font-weight: 600;
      width: 100%;
    }
    input {
      margin-top: ${normalizeValue(1)};
      display: block;
      width: 100%;
    }
  `}
`;

export const MnemonicContainer = styled.div``;

export const MnemonicAction = styled.button`
  ${({ theme }) => css`
    text-align: center;
    width: 100%;
    margin-top: ${normalizeValue(2)};
    position: relative;
    color: ${theme.colors.black};
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    &:hover {
      opacity: 0.7;
    }
    span {
      display: block;
      line-height: 1.3;
      text-transform: lowercase;
      :first-letter {
        text-transform: uppercase;
      }
    }
  `}
`;

export const TagsContainer = styled.div`
  margin-top: ${normalizeValue(1.2)};
  display: flex;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  ${({ theme }) => css`
    padding: ${normalizeValue(0.5)};
    border-radius: ${normalizeValue(0.5)};
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    width: fit-content;
    margin-bottom: ${normalizeValue(0.5)};
    &:not(:last-child) {
      margin-right: ${normalizeValue(0.5)};
    }
  `}
`;
export const MnemonicSelect = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${normalizeValue(4)} 0;
    color: ${theme.colors.black};
    span {
      margin: 0 ${normalizeValue(0.5)};
    }
    button :first-child {
      opacity: 0.6;
    }
  `}
`;

export const MnemonicImport = styled.div<{ hasTag?: boolean }>`
  ${({ hasTag }) => css`
    margin-top: ${normalizeValue(1)};
    ul {
      list-style: none;
      li {
        display: inline-block;
        width: ${hasTag ? "initial" : "100%"};
      }
      input {
        width: 100%;
      }
    }
  `}
`;

export const MnemonicListItem = styled.li`
  ${({ theme }) => css`
    padding: ${normalizeValue(0.5)};
    border-radius: ${normalizeValue(0.5)};
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    width: fit-content;
    margin-bottom: ${normalizeValue(0.5)};
    &:not(:last-child) {
      margin-right: ${normalizeValue(0.5)};
    }
  `}
`;
