import styled, { css } from "styled-components";

export const Wrapper = styled.button<{
  isSell?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
}>`
  ${({ theme, isSell, isSuccess, isLoading }) => css`
    position: relative;
    z-index: 0;
    display: flex;
    align-items: center;
    background: ${isSell ? theme.colors.primary : theme.colors.green};
    color: ${theme.colors.white};
    padding: 1rem;
    border-radius: 1rem;
    font-weight: 500;
    width: 100%;
    transition: transform 0.2s ease, background 0.3s ease;
    :disabled {
      background: ${theme.colors.primaryBackground};
      color: ${theme.colors.text};
      cursor: not-allowed;
      span svg:nth-child(1) {
        stroke: transparent;
      }
    }
    :active {
      transform: translateY(0.2rem);
    }

    span {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      border-radius: 1rem;
      position: relative;
      overflow: hidden;
      background: ${isLoading ? "white" : "transaparent"};
      :before {
        content: "";
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        transition: transform 0.3s ease, background 0.3s ease;
      }
      svg {
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
        left: 50%;
        top: 50%;
        margin: -0.6rem 0 0 -0.6rem;
        z-index: 1;
        :nth-child(1) {
          width: 2rem;
          height: 2rem;
          top: 0;
          left: 0;
          fill: none;
          margin: 0;
          stroke: ${isLoading ? "white" : isSell ? theme.colors.primary : theme.colors.green};
          stroke-width: 1px;
          stroke-dashoffset: 47.124 * 2;
          stroke-dasharray: 47.124;
        }
        :nth-child(2) {
          fill: ${theme.colors.primary};
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateY(2rem);
        }
      }
    }

    ul {
      position: relative;
      z-index: -1;
      list-style: none;
      height: 1.4rem;
      width: 10rem;
      display: inline-block;
      transform-style: preserve-3d;
      transition: transform 0.3s ease;
      flex: 1;
      margin-right: 2rem;
      li {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        white-space: nowrap;
        backface-visibility: hidden;
        transform-origin: 50% 50%;
        :nth-child(1) {
          transform: rotateX(0deg) translateZ(1rem);
        }
        :nth-child(2) {
          transform: rotateX(-90deg) translateZ(1rem);
        }
        :nth-child(3) {
          transform: rotateX(-180deg) translateZ(1rem);
        }
      }
    }

    ${isLoading &&
    css`
      span {
        background: none;
        transition: background 0.1s ease 0.3s;
        :before {
          transform: scale(1);
        }
        svg {
          :nth-child(1) {
            animation: turn 1s linear infinite forwards, path 1.6s linear infinite forwards;
          }
        }
      }
      ul {
        transform: rotateX(90deg);
      }
      ${isSuccess &&
      css`
        background: ${isSell ? theme.colors.primary : theme.colors.green};
        span {
          background: white;
          transition: background 0.1s ease 0s;
          :before {
            background: ${isSell ? theme.colors.primary : theme.colors.green};
            transform: scale(0);
          }
          svg {
            :nth-child(1) {
              animation: none;
            }

            :nth-child(2) {
              fill: ${isSell ? theme.colors.primary : theme.colors.green};
              opacity: 1;
              transform: translateY(0);
              transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s,
                opacity 0.4s ease 0.25s;
            }
          }
        }
        ul {
          transform: rotateX(180deg);
        }
      `}
    `}
    @keyframes turn {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes path {
      100% {
        stroke-dashoffset: 0;
      }
    }
  `}
`;
