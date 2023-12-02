import styled, { css } from "styled-components";
import media from "styled-media-query";
import Link from "next/link";

import { normalizeValue } from "@/utils/normalize";

export const Header = styled.div<{ noBorder?: boolean }>`
  ${({ noBorder, theme }) => css`
    padding: ${normalizeValue(3)};
    ${!noBorder &&
    `border-bottom: 1px solid ${theme.colors.secondaryBackground}`};
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
  font-size: ${normalizeValue(3)};
  padding-top: ${normalizeValue(3)};
  font-weight: 700;

  ${media.lessThan("medium")`
    font-size: ${normalizeValue(3)};
  `}
`;
