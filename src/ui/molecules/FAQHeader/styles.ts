import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Header = styled.div`
  ${({ theme }) => css`
    padding: 3rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
    width: 100%;
  `}
`;

export const BreadCrumbWrapper = styled.div`
  ${({ theme }) => css`
    font-size: large;
    font-weight: 300;
  `}
`;

export const LastCrumb = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.tertiaryText};
  `}
`;

export const Heading = styled.p`
  font-size: 3rem;
  padding-top: 3rem;
  font-weight: 700;
  ${media.lessThan("medium")`
  font-size:3rem
  `}
`;
