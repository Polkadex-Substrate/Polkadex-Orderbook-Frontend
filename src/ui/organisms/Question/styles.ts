import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Container = styled.div`
  width: 100%;
  padding-left: 4rem;
  ${media.lessThan("medium")`
   padding-left:0;
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    font-weight: 700;
    font-size: ${theme.font.sizes.xxlarge};
    padding-bottom: 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
    ${media.lessThan("medium")`
   padding:0 3rem 3rem 3rem;
  `}
  `}
`;
