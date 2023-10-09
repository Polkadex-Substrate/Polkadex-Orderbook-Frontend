import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

export const Main = styled.div`
  ${({ theme }) => css`
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid ${theme.colors.primary}; /* Dark Green */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: ${spinAnimation} 1s linear infinite;
    padding: 1.8rem;
  `}
`;

export const Logo = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
