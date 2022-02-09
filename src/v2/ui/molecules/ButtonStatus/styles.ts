import styled, { css } from "styled-components";

export const Wrapper = styled.button<{
  isSell?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
}>`
  ${({ theme, isSell, isSuccess, isLoading }) => css`
    background: ${isSell ? theme.colors.primary : theme.colors.green};
    color: ${theme.colors.white};
    padding: 1.5rem;
    border-radius: 1rem;
    text-align: center;
    font-weight: 500;
    width: 100%;

    :disabled {
      background: ${theme.colors.secondaryBackground};
      color: ${theme.colors.black};
    }
    :hover {
      span {
        svg {
          :nth-child(2) {
            transform: translateY(-20px);
          }
          :nth-child(3) {
            transform: translateY(0);
          }
        }
      }
    }

    span {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      border-radius: 1rem;
      position: relative;
      overflow: hidden;
      background: white;
      svg {
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
        left: 50%;
        top: 50%;
        margin: -0.6rem 0 0 -0.6rem;
        :nth-child(1) {
          width: 20px;
          height: 20px;
          top: 0;
          left: 0;
          fill: none;
          margin: 0;
          stroke: ${theme.colors.primary};
          stroke-width: 1px;
          stroke-dashoffset: 47.124 * 2;
          stroke-dasharray: 47.124;
        }
        :nth-child(2) {
          fill: ${theme.colors.primary};
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        :nth-child(3) {
          fill: ${theme.colors.primary};
          transform: translateY(20px);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
        }
      }
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      height: 20px;
      width: 70px;
      display: inline-block;
      vertical-align: top;
      text-align: center;
      position: relative;
      perspective: 80rem;
      perspective-origin: 50% 50% 0;
      transition: transform 0.3s ease;
      li {
        background: red;
        margin-bottom: 1rem;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        transform-style: preserve-3d;
        transform-origin: 50% 50% 0;
        transform: rotateX(0deg);
        :nth-child(2) {
          transform-style: preserve-3d;
          transform-origin: 50% 50% 0;
          transform: rotateX(0deg);
        }
      }
    }

    ${isSuccess &&
    css`
      transform: scale(0.94);
    `}

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
            animation: turn 1.6s linear infinite forwards, path 1.6s linear infinite forwards;
          }
          :nth-child(2) {
            transform: translateY(-20px);
          }
          :nth-child(3) {
            opacity: 0;
            transform: translateY(0) scale(0.6);
          }
        }
      }
      ul {
        transform: rotateX(50deg);
      }
      /* ${isSuccess &&
      css`
        background: green;
        box-shadow: 0 4px 20px rgba($success, 0.15);
        span {
          transition: background 0.1s ease 0s;
          :before {
            background: $success;
            transform: scale(0);
          }
          svg {
            :nth-child(1) {
              animation: none;
            }
            :nth-child(3) {
              fill: $success;
              opacity: 1;
              transform: scale(1);
              transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s,
                opacity 0.4s ease 0.25s;
            }
          }
        }
        ul {
          transform: rotateX(180deg);
        }
      `} */
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
