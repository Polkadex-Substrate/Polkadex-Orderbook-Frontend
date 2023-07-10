import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding-left: 3rem;
  ${media.lessThan("medium")`
   padding:3rem 0rem;
  `}
`;

export const Menu = styled.div`
  ${({ theme }) => css`
    display: none;
    align-items: center;
    gap: 0.5rem;
    font-size: ${theme.font.sizes.small};
    padding: 1.5rem 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
    color: ${theme.colors.tertiaryText};
    &:hover {
      color: white;
    }
    ${media.lessThan("medium")`
   display: flex;
  `}
  `}
`;
