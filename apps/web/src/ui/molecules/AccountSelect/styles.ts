import { Combobox } from "@headlessui/react";
import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

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
    gap: ${normalizeValue(1)};
    input {
      flex: 1;
    }
    input,
    p {
      color: ${theme.colors.text};
      white-space: nowrap;
      font-size: ${normalizeValue(2)};
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
    gap: ${normalizeValue(1)};
    button {
      background: ${theme.colors.secondaryBackground};
      padding: ${normalizeValue(0.5)};
      border-radius: ${normalizeValue(0.5)};
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
    width: ${normalizeValue(1)};
    height: ${normalizeValue(1)};
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
    border-radius: ${normalizeValue(0.5)};
    width: ${normalizeValue(2.3)};
    height: ${normalizeValue(2.3)};
    padding: ${normalizeValue(0.5)};
    svg {
      stroke: ${theme.colors.tertiaryText};
    }
  `}
`;

export const OptionsWrapper = styled(Combobox.Options)`
  position: absolute;
  margin-top: 5px;
  max-height: ${normalizeValue(24)};
  max-width: ${normalizeValue(40)};
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
    border-radius: 0 0 ${normalizeValue(0.5)} ${normalizeValue(0.5)};
    padding: ${normalizeValue(1.5)};
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1)};
    small {
      font-size: ${normalizeValue(1.2)};
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
    gap: ${normalizeValue(1)};
    padding: ${normalizeValue(0.8)};
    border-radius: ${normalizeValue(1)};
    cursor: pointer;
    transition: background-color ease 0.4s;
    div {
      svg {
        width: ${normalizeValue(2.5)};
        height: ${normalizeValue(2.5)};
      }
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
    gap: ${normalizeValue(0.5)};
    div {
      width: ${normalizeValue(1.3)};
      height: ${normalizeValue(1.3)};
      svg {
        fill: ${theme.colors.primary};
      }
    }
    background: ${theme.colors.white};
    border-radius: ${normalizeValue(0.5)};
    padding: ${normalizeValue(0.8)};
    p {
      color: ${theme.colors.inverse};
    }
  `}
`;
