import styled, { css } from "styled-components";
import { generateMedia } from "styled-media-query";

import { normalizeValue } from "@/utils/normalize";
const customMedia = generateMedia({
  large: "923px",
});

export const Container = styled.div<{ show: boolean }>`
  ${({ theme, show }) => css`
    border-left: 1px solid ${theme.colors.secondaryBackground};
    max-width: ${normalizeValue(38)};
    width: 100%;
    min-height: 100vh;
    padding: ${normalizeValue(2)};
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2)};
    flex-shrink: 0;
    ${customMedia.lessThan("large")`
        display:flex;
        position:absolute;
        right:0;
        top:0;
        opacity:${show ? "1" : "0"};
        visibility:${show ? "visible" : "hidden"};
        z-index:2;
        background:${theme.colors.primaryBackground};
        transition: 0.2s;
  `};
  `}
`;

export const Heading = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    font-weight: 500;
  `}
`;

export const Button = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    font-size: large;
    padding: ${normalizeValue(1.8)};
    font-weight: 500;
    border-radius: ${theme.border.radius.medium};
  `}
`;

export const SocialWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    font-size: ${theme.font.sizes.small};
    padding: ${normalizeValue(1.8)};
    font-weight: 400;
    border-radius: ${theme.border.radius.medium};
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1.5)};
  `}
`;

export const Social = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
  align-items: center;
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
  &:hover svg {
    fill: white;
  }
  transition: 0.2s;
`;

export const OnlyIcons = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
`;

export const IconWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    width: 4.5rem;
    height: 4.5rem;
    border-radius: ${theme.border.radius.medium};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.tertiaryBackground};
    }
    transition: 0.2s;
  `}
`;

export const Icon = styled.div`
  opacity: 0.2;
`;

export const Community = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    padding: ${normalizeValue(1.8)};
    border-radius: ${theme.border.radius.medium};
  `}
`;

export const Description = styled.div`
  ${({ theme }) => css`
    font-size: small;
    color: ${theme.colors.tertiaryText};
    margin-top: ${normalizeValue(1)};
    font-weight: 400;
    line-height: ${normalizeValue(2)};
  `}
`;

export const Pink = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    text-decoration: underline;
    cursor: pointer;
  `}
`;
