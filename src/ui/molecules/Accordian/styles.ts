import Link from "next/link";
import styled, { css } from "styled-components";

export const Container = styled.div``;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${theme.font.sizes.small};
    line-height: 1.25;
    cursor: pointer;
  `}
`;

export const ContentWrapper = styled.div<{ maxHeight: number }>`
  max-height: ${(p) => `${p.maxHeight}px`};
  transition: max-height 0.25s ease-in-out;
  overflow: hidden;

  margin-top: 1rem;
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-size: ${theme.font.sizes.small};
    padding: 1.6rem;
    background-color: ${theme.colors.tertiaryBackgroundOpacity};
    border-radius: 1rem;
  `}
`;

export const Single = styled(Link)<{ active: boolean }>`
  ${({ theme, active }) => css`
    cursor: pointer;
    color: ${active ? "white" : theme.colors.tertiaryText};
  `}
`;
