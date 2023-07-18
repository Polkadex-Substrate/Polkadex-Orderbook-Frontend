import styled, { css } from "styled-components";
import media from "styled-media-query";
import Link from "next/link";
export const Header = styled.div<{ noBorder: boolean }>`
  ${({ noBorder }) => css`
    padding: 3rem;
    border-bottom: ${!noBorder ? "1px solid ${theme.colors.secondaryBackground" : ""};
    width: 100%;
  `}
`;

export const BreadCrumbWrapper = styled.div`
  ${({ theme }) => css`
    text-transform: capitalize;
    cursor: pointer;
    color: ${theme.colors.tertiaryText}!important;
  `}
`;

export const LastCrumb = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.white}!important;
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
