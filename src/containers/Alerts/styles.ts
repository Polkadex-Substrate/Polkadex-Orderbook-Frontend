import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
    right: calc(var(0.5em) * 2);
    top: calc(var(0.5em) * 8);
    z-index: 100000;
    @media screen and (max-width: 767px), (max-height: 599px) {
        bottom: 44px;
        left: 0;
        position: fixed;
        right: 0;
        top: auto;
        z-index: 99999;

        div {
          align-items: center;
          border-radius: 0;
          display: flex;
          height: 27px;
          justify-content: center;
          margin-top: -11px;
          position: fixed;
          width: 100%;

          .alert {
            border: none;
            color: ${theme.colors.text};
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.008em;
          }

          .alert-danger {
            background: ${theme.colors.primary};
          }

          .alert-success {
            background: ${theme.colors.green};
          }
        }
    }
  `}
`;