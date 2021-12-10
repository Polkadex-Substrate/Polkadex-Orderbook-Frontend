import styled, { css } from "styled-components";

export const Template = styled.div`
  display: grid;
  grid-template-columns: 12rem 8rem 1fr 1fr 1fr 1fr 1.5fr;
  grid-gap: 0.5rem;
  text-align: left;
  overflow-y: scroll;
  scrollbar-width: none;
`;

export const Wrapper = styled(Template)`
  font-size: 1.3rem;
  padding: 0 1rem;
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
    align-self: baseline;
    span {
      display: block;
      font-weight: 500;
      font-size: ${theme.font.sizes.xxxsmall};
    }
    button {
      color: #0090e1;
      font-size: ${theme.font.sizes.xxxsmall};
    }
  `}
`;

export const Side = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    color: ${isSell ? theme.colors.green : theme.colors.primary};
    text-transform: capitalize;
    font-size: ${theme.font.sizes.xxxsmall};
  `}
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexJustify = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const Box = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackgroundOpacity};
    box-shadow: ${theme.shadows.tertiary};
    border-radius: 0.5rem;
    margin: 0 0.5rem 1.5rem 0.5rem;
  `}
`;

export const Header = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    display: flex;
    justify-content: space-between;
    display: center;
    padding: 1.5rem;

    p {
      font-size: 1.3rem;
      font-weight: 600;
    }
    span {
      display: block;
      padding: 0.1rem 0.2rem;
      background: ${isSell ? theme.colors.primary : theme.colors.green};
      width: fit-content;
      border-radius: 0.4rem;
      text-transform: capitalize;
      font-weight: 500;
      margin-top: 0.4rem;
    }
    button {
      opacity: 0.7;
    }
  `}
`;

export const Footer = styled.div`
  padding: 1.5rem;
`;

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    padding: 1.5rem;
    p,
    span {
      font-size: ${theme.font.sizes.xxxsmall};
    }
  `}
`;

export const Info = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:last-child) {
      margin-bottom: 1rem;
    }
    p,
    span {
      font-size: ${theme.font.sizes.xxxsmall};
    }
    span {
      opacity: 0.7;
    }
    p {
      font-weight: 500;
    }
  `}
`;
