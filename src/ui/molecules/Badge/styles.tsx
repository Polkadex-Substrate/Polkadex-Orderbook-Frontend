import styled, { css } from "styled-components";

const sizeModifier = {
  small: () => css`
    padding: 0.2rem 0.5rem;
    font-size: 1.2rem;
  `,
  medium: () => css`
    padding: 0.4rem 0.8rem;
    font-size: 1.3rem;
  `,
  large: () => css`
    padding: 0.6rem 1rem;
    font-size: 1.6rem;
  `,
};

export const Wrapper = styled.div<{ background: string; size: string }>`
  ${({ theme, background = "primary", size }) => css`
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    width: fit-content;
    background-color: ${theme.colors[background]};
    color: ${theme.colors.text};
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    ${sizeModifier[size]()};
    p {
      font-weight: 600;
    }
  `}
`;

export const Round = styled.span`
  ${({ theme }) => css`
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.5rem;
    background-color: ${theme.colors.text};
  `}
`;
