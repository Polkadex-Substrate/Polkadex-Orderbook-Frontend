import styled, { css } from "styled-components";
import media from "styled-media-query";
import Link from "next/link";
export const Header = styled.div<{ noBorder: boolean }>`
  ${({ theme, noBorder }) => css`
    display: flex;
    flex-direction: column;
    padding: 4rem 2rem;
    width: 100%;
    gap: 2rem;
    ${!noBorder &&
    css`
      border-bottom: 1px solid ${theme.colors.secondaryBackground};
    `}
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
  padding-top: 2rem;
  font-weight: 700;
  ${media.lessThan("medium")`
    font-size:3rem;
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
      font-size: ${theme.font.sizes.giant};
      font-weight: 550;
    }
    p {
      color: ${theme.colors.tertiaryText};
      font-size: ${theme.font.sizes.medium};
      line-height: 1.4;
      span {
        color: ${theme.colors.text};
      }
    }
  `}
`;
