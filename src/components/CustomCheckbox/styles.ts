import styled, { css } from "styled-components";

import Props from "./types";

export const Wrapper = styled.div<Partial<Props>>`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => css`
    & label {
      width: fit-content;
      cursor: pointer;
      line-height: 1.8rem;
      margin-left: 0.6rem;
    }

    & input {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      appearance: none;
      width: 2rem;
      height: 2rem;
      background: ${theme.colors.secondaryBackground};
      border-radius: 0.5rem;
      transition: ${theme.transition.fast};
      position: relative;
      outline: none;

      &:before {
        content: "";
        width: 0.5rem;
        height: 0.9rem;
        border: 0.2rem solid ${theme.colors.text};
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg);
        position: absolute;
        top: 0.1rem;
        opacity: 0;
        transition: ${theme.transition.fast};
      }
      &:focus {
        box-shadow: 0 0 0.5rem ${theme.colors.white};
      }
      &:hover {
        border-color: ${theme.colors.secondaryBackground};
        transition: ${theme.transition.fast};
      }
      &:checked {
        border-color: ${theme.colors.primary};
        background: ${theme.colors.primary};
        &:before {
          opacity: 1;
        }
      }
    }

    & p {
      font-size: 1.3rem;
    }
  `}
`;
