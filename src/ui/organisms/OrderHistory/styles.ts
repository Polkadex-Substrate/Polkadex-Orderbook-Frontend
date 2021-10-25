import styled, { css } from "styled-components";

export const Wrapper = styled.section``;

export const Template = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.4fr 0.4fr 0.8fr 0.6fr 0.4fr 0.6fr 0.1fr;
  grid-gap: 0.5rem;
  text-align: left;
  overflow-y: scroll;
  scrollbar-width: none;
`;

export const Header = styled(Template)`
  ${({ theme }) => css`
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
  @media screen and (min-width: 500px) and (max-width: 1110px) {
    grid-template-columns: 1fr 1fr;
  }
`;
