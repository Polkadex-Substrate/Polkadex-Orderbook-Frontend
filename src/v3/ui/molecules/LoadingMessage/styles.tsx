import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const Container = styled.div<{
  color: string;
  isVisible: boolean;
  isPriority?: boolean;
}>`
  ${({ theme, color, isVisible, isPriority }) => css`
    position: absolute;
    top: 0;
    background: ${theme.colors[color]};
    padding: 1rem;
    color: ${theme.colors.text};
    width: 100%;
    height: 100%;
    display: ${isVisible ? "block" : "none"};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${isPriority ? 99 : 0};
    opacity: 1;
    p {
      font-weight: 600;
      display: inline-block;
    }
  `}
`;
