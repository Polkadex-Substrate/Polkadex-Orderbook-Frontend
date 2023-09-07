import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    border-bottom: 1px solid
      ${isActive ? theme.colors.text : theme.colors.secondaryBackgroundOpacity};
    padding-bottom: 1rem;
    transition: border-color 0.3s ease-in-out;
    ${Flex} {
      span {
        color: ${isActive ? theme.colors.text : theme.colors.tertiaryText};
      }
    }
  `}
`;

export const Flex = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      transition: color 0.3s ease-in-out;
    }

    button {
      white-space: nowrap;
      font-size: 1.2rem;
      color: ${theme.colors.tertiaryText};
      border-radius: 0.5rem;
      padding: 0.5rem;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      transition:
        background 0.3s ease-in,
        border 0.3s ease-in;
      svg {
        display: inline-block;
        max-width: 1.3rem;
        vertical-align: middle;
        stroke: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const Title = styled(Flex)`
  ${({ theme }) => css`
    button {
      background: ${theme.colors.secondaryBackgroundOpacity};
      &:hover {
        border-color: ${theme.colors.secondaryBackgroundOpacity};
        background: none;
      }
      &:active {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;
export const Footer = styled(Flex)`
  ${({ theme }) => css`
    span {
      color: ${theme.colors.text};
    }
    button {
      border-color: ${theme.colors.secondaryBackgroundOpacity};
      &:hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;

export const Container = styled.div``;

export const Phrases = styled.div`
  margin: 2rem 0;
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.5rem;
    span {
      display: block;
      width: fit-content;
      font-size: 1.2rem;
      border-radius: 0.5rem;
      padding: 0.5rem;
      border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
