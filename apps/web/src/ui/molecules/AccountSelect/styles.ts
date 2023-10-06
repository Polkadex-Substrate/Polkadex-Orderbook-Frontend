import { Combobox } from "@headlessui/react";
import styled, { css } from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    input {
      flex: 1;
    }
    input,
    p {
      color: ${theme.colors.text};
      white-space: nowrap;
      font-size: 2rem;
      font-weight: 500;
      span {
        opacity: 0.5;
      }
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    button {
      background: ${theme.colors.secondaryBackground};
      padding: 0.5rem;
      border-radius: 0.5rem;
      width: 100%;
      transition: background-color 0.5s ease;
      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
      &:hover:not(:disabled) {
        background: ${theme.colors.primaryHover};
      }
    }
  `}
`;

export const Arrow = styled.div<{ open: boolean }>`
  ${({ open }) => css`
    width: 1rem;
    height: 1rem;
    transition: transform ease 0.3s;
    ${open &&
    css`
      transform: rotate(180deg);
    `}
  `}
`;

export const Icon = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 0.5rem;
    width: 2.3rem;
    height: 2.3rem;
    padding: 0.5rem;
    svg {
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;

export const OptionsWrapper = styled(Combobox.Options)`
  position: absolute;
  margin-top: 5px;
  max-height: 24rem;
  max-width: 40rem;
  width: 100%;
  overflow: auto;
  top: 100%;
  z-index: 2;
`;

export const OptionsContainer = styled.div`
  ${({ theme }) => css`
    list-style: none;
    top: 100%;
    width: 100%;
    border-top: 1px solid ${theme.colors.secondaryBackground};
    background-color: ${theme.colors.secondaryBackgroundSolid};
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    small {
      font-size: 1.2rem;
      opacity: 0.5;
    }
  `}
`;

export const OptionsItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OptionsItem = styled(Combobox.Option)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color ease 0.4s;
    div {
      width: 2.5em;
      height: 2.5rem;
    }
    span {
      opacity: 0.5;
    }
    &:hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;

export const Errors = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    div {
      width: 1.3rem;
      height: 1.3rem;
      svg {
        fill: ${theme.colors.primary};
      }
    }
    background: ${theme.colors.white};
    border-radius: 0.5rem;
    padding: 0.8rem;
    p {
      color: ${theme.colors.inverse};
    }
  `}
`;
