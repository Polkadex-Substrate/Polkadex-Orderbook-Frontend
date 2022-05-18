import styled, { css } from "styled-components";

import { Wrapper as IconWrapper } from "../Icon/styles";

const sizeModifier = {
  small: () => css`
    font-size: 1.2rem;
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;
  `,
  extraSmall: () => css`
    font-size: 1.2rem;
    padding: 0.4rem 0.6rem;
    border-radius: 0.6rem;
  `,
  medium: () => css`
    padding: 0.8rem;
    border-radius: 0.8rem;
  `,
  extraLarge: () => css`
    padding: 1.5rem 2rem;
    border-radius: 0.8rem;
  `,
};

export const Wrapper = styled.button<{
  background?: string;
  hasIcon: boolean;
  isFull?: boolean;
  color?: string;
  size?: string;
  hoverColor?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}>`
  ${({
    theme,
    size = "medium",
    isFull = true,
    background,
    color,
    hasIcon = false,
    isDisabled,
    hoverColor = "primary",
    isLoading,
  }) => css`
    border-style: none;
    font-weight: 500;
    transition: background 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
      color ${theme.transition.default}, opacity ${theme.transition.default};
    width: ${isFull ? "100%" : "fit-content"};
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: ${theme.colors[color]};
    background: ${isDisabled ? "gray" : theme.colors[background]};
    white-space: nowrap;
    ${sizeModifier[size]()};
    ${
      hasIcon &&
      css`
        padding-right: 1rem;
      `
    }
    ${IconWrapper} {
      margin-right: 0.6rem;
      vertical-align: middle;
    }
    :hover {
      ${
        background === "transparent"
          ? css`
              opacity: 0.6;
            `
          : css`
              background: ${isDisabled ? "gray" : theme.colors[hoverColor]};
              color: ${theme.colors.white};
            `
      }
    }
    ${
      isLoading &&
      css`
    p {
      display: inline-block;
      :after {
        content: ".";
        animation: dots 1.5s steps(5, end) infinite;
      }
      @keyframes dots {
        0%,
        20% {
          color: rgba(0, 0, 0, 0);
          text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
        }
        40% {
          color: white;
          text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
        }
        60% {
          text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
        }
        80%,
        100% {
          text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
        }
      }
    `
    }

    }

  `};
`;
