import styled, { css } from "styled-components";

export const Main = styled.section`
  grid-area: Information;
  padding: 1rem 1rem 0 1rem;
  border-radius: 1.5rem;
  display: grid;
  grid-template-columns: fit-content(100%) auto;
  grid-gap: 2rem;
  align-items: center;
`;

export const AsideLeft = styled.div`
  ${({ theme }) => css`
    border-right: 1px solid ${theme.colors.secondaryBackground};
    padding-right: 1rem;
  `}
`;

export const AsideRight = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 1rem;
`;

export const Ticker = styled.span`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    padding: 0.2rem 0.4rem;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 1.1rem;
  `}
`;

export const Tag = styled.span<{ isNegative?: boolean }>`
  ${({ theme, isNegative }) => css`
    position: relative;
    padding: 0.2rem 0.4rem;
    border-radius: 0.5rem;
    background: ${isNegative ? theme.colors.primary : theme.colors.green}33;
    color: ${isNegative ? theme.colors.primary : theme.colors.green};
    font-weight: 500;
    font-size: 1.2rem;
    ::before {
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: ${isNegative ? "0.5rem" : "0"} 0.5rem ${isNegative ? "0" : "0.5rem"} 0.5rem;
      border-color: ${isNegative ? theme.colors.primary : "transparent"} transparent
        ${isNegative ? "transparent" : theme.colors.green} transparent;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.3rem;
    }
  `}
`;

export const Group = styled.div``;
// Card
export const Card = styled.div<{ isHorizontal?: boolean; textColor?: string }>`
  ${({ theme, isHorizontal, textColor = "text" }) => css`
    display: flex;
    flex-direction: ${isHorizontal ? "row" : "column"};
    align-items: ${isHorizontal ? "center" : "flex-start"};
    ${CardContainer} {
      margin-top: ${isHorizontal ? 0 : "0.5rem"};
      margin-left: ${isHorizontal ? "0.5rem" : 0};
      p {
        color: ${theme.colors[textColor || "inverse"]};
      }
    }
  `}
`;

export const CardTitle = styled.span`
  display: block;
  opacity: 0.5;
  font-weight: 500;
  font-size: 1.2rem;
`;

export const CardContainer = styled.div`
  display: flex:
  align-items: center;
  p {
    font-weight: 500;
    font-size: 1.4rem;
  }
`;

export const CardChildren = styled.div<{ hasMargin?: boolean }>`
  ${({ hasMargin }) => css`
    margin-left: ${hasMargin ? "0.5rem" : 0};
  `}
`;
