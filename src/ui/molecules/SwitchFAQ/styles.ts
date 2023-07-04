import styled, { css } from "styled-components";

export const CheckBoxWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    width: 6.3rem;
    height: 3.4rem;
    cursor: pointer;
    border-radius: 0.4rem;
  `}
`;

export const Checker = styled.div<{ checked?: boolean }>`
  ${({ theme, checked }) => css`
    background-color: ${checked
      ? theme.colors.primary
      : theme.colors.secondaryBackgroundOpacity};
    width: 2.3rem;
    height: 3.4rem;
    margin-left: ${checked ? "0" : "4rem"};
    transition: 0.2s;
    border-radius: 0.4rem;
  `}
`;

export const Text = styled.div<{ checked?: boolean }>`
  ${({ theme, checked }) => css`
    position: absolute;
    top: 1rem;
    /* z-index: -2; */
    left: ${checked ? "3rem" : "1rem"};
    color: ${checked ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)"};
  `}
`;
