import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Container = styled.div<{ show: boolean }>`
  ${({ theme, show }) => css`
    max-width: 25rem;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex-shrink: 0;
    ${media.lessThan("medium")`
    background: ${theme.colors.primaryBackground};
    display: ${show ? "flex" : "none"};
    position: absolute;
    left: 0;
    top:5rem;
    max-width:100%;
    z-index:3;
    padding: 3rem;
  `}
  `}
`;
