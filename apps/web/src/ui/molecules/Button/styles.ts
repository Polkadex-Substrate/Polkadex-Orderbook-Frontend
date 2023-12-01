import styled, { css } from "styled-components";

import { Wrapper as IconWrapper } from "../Icon/styles";

import { normalizeValue } from "@/utils/normalize";

const sizeModifier = {
  small: () => css`
    font-size: ${normalizeValue(1.2)};
    padding: ${normalizeValue(0.2)} ${normalizeValue(0.4)};
    border-radius: ${normalizeValue(0.4)};
  `,
  extraSmall: () => css`
    font-size: ${normalizeValue(1.2)};
    padding: ${normalizeValue(0.4)} ${normalizeValue(0.6)};
    border-radius: ${normalizeValue(0.6)};
  `,
  medium: () => css`
    padding: ${normalizeValue(0.8)};
    border-radius: ${normalizeValue(0.8)};
  `,
  large: () => css`
    padding: ${normalizeValue(1.2)};
    border-radius: ${normalizeValue(0.6)};
  `,
  extraLarge: () => css`
    padding: 1.5rem ${normalizeValue(2)};
    border-radius: ${normalizeValue(0.8)};
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
    background = "white",
    color = "black",
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
    &:disabled {
      cursor: not-allowed;
    }
    ${sizeModifier[size]()};
    ${
      hasIcon &&
      css`
        padding-right: ${normalizeValue(1)};
      `
    }
    ${IconWrapper} {
      margin-right: ${normalizeValue(0.6)};
      vertical-align: middle;
    }
    &:hover {
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
        color: ${theme.colors.white};
        p {
          display: inline-block;
          padding-right: ${normalizeValue(0.8)};
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
