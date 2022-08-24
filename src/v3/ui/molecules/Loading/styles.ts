import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div<{
  isVisible: boolean;
}>`
  ${({ theme, isVisible }) => css`
    position: absolute;
    top: 0;
    background-color: ${theme.colors.primaryBackground}99;
    padding: 1rem;
    color: ${theme.colors.text};
    width: 100%;
    height: 100%;
    opacity: ${isVisible ? 1 : 0};
    visibility: ${isVisible ? "visible" : "hidden"};
    cursor: pointer;
    transition: opacity 0.6s;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    div {
      background: ${theme.colors.secondaryBackgroundSolid};
      border: 1px solid ${theme.colors.secondaryBackground};
      padding: 2rem;
      border-radius: 1.5rem;

      p {
        text-align: center;
        margin-top: 1rem;
      }
    }
    svg {
      stroke: ${theme.colors.primary};
      fill: ${theme.colors.primary};
    }
  `}
`;
