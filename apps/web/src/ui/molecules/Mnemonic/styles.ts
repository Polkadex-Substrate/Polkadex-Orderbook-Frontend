import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 1.2rem;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.secondaryBackground};
    width: 100%;
    border-radius: 1rem;
    input,
    label {
      color: ${theme.colors.black};
    }
    label,
    input {
      font-size: 1.3rem;
    }
    label {
      font-weight: 600;
      width: 100%;
    }
    input {
      margin-top: 1rem;
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
    margin-top: 2rem;
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
  margin-top: 1.2rem;
  display: flex;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  ${({ theme }) => css`
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    width: fit-content;
    margin-bottom: 0.5rem;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  `}
`;
export const MnemonicSelect = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    color: ${theme.colors.black};
    span {
      margin: 0 0.5rem;
    }
    button :first-child {
      opacity: 0.6;
    }
  `}
`;

export const MnemonicImport = styled.div<{ hasTag?: boolean }>`
  ${({ hasTag }) => css`
    margin-top: 1rem;
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
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    width: fit-content;
    margin-bottom: 0.5rem;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  `}
`;
