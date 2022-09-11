import styled, { css } from "styled-components";

export const Wrapper = styled.section``;

export const Header = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 12rem 8rem 3.5rem 3rem 1fr 1fr 1fr 1fr 1rem;
    grid-gap: 0.5rem;
    text-align: left;
    margin-bottom: 1rem;
    padding: 0 1rem;
    span {
      font-size: ${theme.font.sizes.xxsmall};
      font-weight: 500;
      opacity: 0.5;
    }
  `}
`;

export const Content = styled.div`
  display: grid;
  overflow-x: hidden;

  @media screen and (min-width: 500px) and (max-width: 1110px) {
    grid-template-columns: 1fr 1fr;
  }
`;
