import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  margin: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  max-width: 34rem;
  width: 100%;

  .animate-alert-enter {
    opacity: 0;
    transform: translateX(110%);
    transition: opacity 300ms ease-in, transform 300ms ease-in;
  }

  .animate-alert-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms ease-in, transform 300ms ease-in;
  }

  .animate-alert-exit {
    opacity: 1;
  }

  .animate-alert-exit-active {
    opacity: 0;
    transform: translateX(110%);
    transition: opacity 300ms ease-in, transform 300ms ease-in;
  }
`;
