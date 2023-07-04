import styled, { css } from "styled-components";
export const Container = styled.div`
  ${({ theme }) => css`
    border-left: 1px solid ${theme.colors.secondaryBackground};
    width: 35rem;
    min-height: 100vh;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
  `}
`;
