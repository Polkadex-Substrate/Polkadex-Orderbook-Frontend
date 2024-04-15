import styled, { css } from "styled-components";

import { Props } from "./types";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SecondaryWrapper = styled.div<{ color: string; size: string }>`
  ${({ theme, color, size }) => css`
    width: ${size};
    height: ${size};
    display: inline-block;
    vertical-align: middle;
    svg {
      width: 100%;
      height: 100%;
    }
    svg path,
    svg rect {
      fill: ${theme.colors[color]};
    }
  `}
`;

export const Container = styled.div<Props>`
  ${({ theme, size = normalizeValue(1), color = "primary" }) => css`
    margin-left: ${normalizeValue(-2)};

    &,
    &:before,
    &:after {
      border-radius: 50%;
      background-color: ${theme.colors[color]};
      width: ${size};
      height: ${size};
      transform-origin: center center;
      display: inline-block;
    }
    & {
      position: relative;
      background-color: ${theme.colors[color]};
      opacity: 1;
      -webkit-animation: spScaleAlpha 1s infinite linear;
      animation: spScaleAlpha 1s infinite linear;
    }
    &:before,
    &:after {
      content: "";
      position: absolute;
      opacity: 0.25;
    }
    &:before {
      bottom: 0;
      left: 0;
      margin-left: ${normalizeValue(1.2)};

      -webkit-animation: spScaleAlphaBefore 1s infinite linear;
      animation: spScaleAlphaBefore 1s infinite linear;
    }
    &:after {
      left: 0;
      top: 0;
      margin-left: ${normalizeValue(2.4)};
      -webkit-animation: spScaleAlphaAfter 1s infinite linear;
      animation: spScaleAlphaAfter 1s infinite linear;
    }
    @-webkit-keyframes spScaleAlpha {
      0% {
        opacity: 1;
      }
      33% {
        opacity: 0.25;
      }
      66% {
        opacity: 0.25;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes spScaleAlpha {
      0% {
        opacity: 1;
      }
      33% {
        opacity: 0.25;
      }
      66% {
        opacity: 0.25;
      }
      100% {
        opacity: 1;
      }
    }
    @-webkit-keyframes spScaleAlphaBefore {
      0% {
        opacity: 0.25;
      }
      33% {
        opacity: 1;
      }
      66% {
        opacity: 0.25;
      }
    }
    @keyframes spScaleAlphaBefore {
      0% {
        opacity: 0.25;
      }
      33% {
        opacity: 1;
      }
      66% {
        opacity: 0.25;
      }
    }
    @-webkit-keyframes spScaleAlphaAfter {
      33% {
        opacity: 0.25;
      }
      66% {
        opacity: 1;
      }
      100% {
        opacity: 0.25;
      }
    }
    @keyframes spScaleAlphaAfter {
      33% {
        opacity: 0.25;
      }
      66% {
        opacity: 1;
      }
      100% {
        opacity: 0.25;
      }
    }
  `}
`;