import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div<{ color: string; isActive: boolean }>`
  ${({ theme, color, isActive }) => css`
    position: absolute;
    top: 0;
    z-index: 32;
    background-color: ${theme.colors[color]};
    padding: 1rem;
    color: ${theme.colors.text};
    width: 100%;
    height: 100%;
    opacity: ${isActive ? 1 : 0};
    cursor: pointer;
    transition: opacity 0.6s;
    display: ${isActive ? "flex" : "none"};
    align-items: center;
    justify-content: center;
  `}
`;
