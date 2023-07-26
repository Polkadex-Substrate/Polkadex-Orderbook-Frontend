import styled, { css } from "styled-components";

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: max-content;
`;

export const Switch = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 6.3rem;
    height: 3.4rem;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: 0.4rem;
    padding: 4px;
    transition: 300ms all;

    &:before {
      transition: 300ms all;
      content: "";
      position: absolute;
      width: 2.4rem;
      height: 3.4rem;
      border-radius: 0.4rem;
      top: 50%;
      right: 0;
      background: ${theme.colors.secondaryBackgroundOpacity};
      transform: translate(0, -50%);
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    opacity: 0;
    position: absolute;

    &:checked + ${Switch} {
      &:before {
        transform: translate(-4rem, -50%);
        background: ${theme.colors.primary};
      }
    }
  `}
`;

export const Text = styled.div<{ checked: boolean }>`
  ${({ theme, checked }) => css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${checked ? "3rem" : "0.8rem"};
    transition: 0.2s;
    color: ${checked ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)"};
  `}
`;
