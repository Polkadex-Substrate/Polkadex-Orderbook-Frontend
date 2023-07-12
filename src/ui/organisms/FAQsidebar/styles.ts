import Link from "next/link";
import styled, { css } from "styled-components";
import { generateMedia } from "styled-media-query";
const customMedia = generateMedia({
  large: "923px",
});

export const Container = styled.div<{ show: boolean }>`
  ${({ theme, show }) => css`
    border-left: 1px solid ${theme.colors.secondaryBackground};
    max-width: 30rem;
    width: 100%;
    min-height: 100vh;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
        transition: 0.2s ease background-color;;
  `};
  `}
`;

export const Heading = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    font-weight: 500;
  `}
`;

export const CallToActionLink = styled(Link)`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    padding: 1.4rem;
    border-radius: 0.8rem;
    text-align: center;
    transition: ease 0.8s background-color;
    :hover {
      background: ${theme.colors.primaryHover};
    }
  `}
`;

export const Button = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    font-size: large;
    padding: 1.8rem;
    font-weight: 500;
    border-radius: ${theme.border.radius.medium};
  `}
`;

export const SocialWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    font-size: ${theme.font.sizes.small};
    padding: 1.8rem;
    font-weight: 400;
    border-radius: ${theme.border.radius.medium};
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `}
`;

export const Social = styled(Link)`
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease background-color;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
    svg {
      fill: white;
    }
  }
  div {
    max-width: 2rem;
    img {
      width: 100%;
    }
  }
`;

export const OnlyIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const IconWrapper = styled(Link)`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    width: 4.5rem;
    height: 4.5rem;
    border-radius: ${theme.border.radius.medium};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color ease 0.2s;
    &:hover {
      background-color: ${theme.colors.tertiaryBackground};
    }
    img {
      max-width: 1.6rem;
    }
  `}
`;

export const Community = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    padding: 1.8rem;
    border-radius: ${theme.border.radius.medium};
  `}
`;

export const Description = styled.div`
  ${({ theme }) => css`
    font-size: small;
    color: ${theme.colors.tertiaryText};
    margin-top: 1rem;
    font-weight: 400;
    line-height: 2rem;
    strong {
      color: ${theme.colors.primary};
      text-decoration: underline;
      cursor: pointer;
      font-weight: normal;
    }
  `}
`;
