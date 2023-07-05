import styled, { css } from "styled-components";
import { generateMedia } from "styled-media-query";
const customMedia = generateMedia({
  large: "923px",
});

export const Container = styled.div<{ show: boolean }>`
  ${({ theme, show }) => css`
    border-left: 1px solid ${theme.colors.secondaryBackground};
    max-width: 35rem;
    width: 100%;
    min-height: 100vh;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex-shrink: 0;
    ${customMedia.lessThan("large")`
        display:${show ? "flex" : "none"};
        position:absolute;
        right:0;
        top:0;
        z-index:2;
        background:${theme.colors.primaryBackground}
  `};
  `}
`;

export const Heading = styled.div`
  ${({ theme }) => css`
    font-size: medium;
    font-weight: 500;
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
    font-size: medium;
    padding: 1.8rem;
    font-weight: 400;
    border-radius: ${theme.border.radius.medium};
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `}
`;

export const Social = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
`;

export const OnlyIcons = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1.5rem;
  `}
`;

export const IconWrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    width: 6rem;
    height: 6rem;
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
    line-height: 2.5rem;
  `}
`;

export const Pink = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    text-decoration: underline;
    cursor: pointer;
  `}
`;
