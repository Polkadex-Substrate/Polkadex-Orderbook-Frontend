import styled, { css } from "styled-components";

export const Main = styled.section<{ isFull?: boolean }>`
  ${({ theme, isFull }) => css`
    display: grid;
    grid-template-columns: auto fit-content(100%);
    grid-gap: 1rem;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    border-radius: 1rem;
    box-shadow: ${theme.shadows.secondary};
    max-width: ${isFull ? "auto" : "80rem"};
  `}
`;

export const Container = styled.div`
  display: flex;
  overflow: hidden;
`;
export const ActionsContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.5rem;
`;

export const Actions = styled.div`
  ${({ theme }) => css`
    margin: 1rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    transition: border 0.5s ease-in-out;
    cursor: pointer;
    :hover {
      border: 1px solid ${theme.colors.secondaryBackground};
    }
    :active {
      transform: translateY(2px);
    }
  `}
`;
// Card
export const Card = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    position: relative;
    padding: 3rem 2rem;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 0.5rem;
    background: ${isActive ? theme.colors.gradientPrimary : theme.colors.white};
    transition: background 0.3s ease-in-out;
    min-width: 23rem;
    user-select: none;
    cursor: pointer;
    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.5rem;
      margin: 0 auto;
      background: ${isActive ? theme.colors.primary : "initial"};
      border-radius: 10rem;
    }
    :hover {
      background: ${isActive
        ? theme.colors.gradientPrimary
        : theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;

export const CardTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 550;
`;

export const CardAsideLeft = styled.div<{ isNegative?: boolean }>`
  ${({ theme, isNegative }) => css`
    div {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      p {
        opacity: 0.5;
      }
      span {
        padding-left: 0.5rem;
        position: relative;
        white-space: nowrap;
        color: ${isNegative ? theme.colors.primary : theme.colors.green};
        ::before {
          content: "";
          width: 0;
          height: 0;
          border-style: solid;
          border-width: ${isNegative ? "0.5rem" : "0"} 0.5rem ${isNegative ? "0" : "0.5rem"}
            0.5rem;
          border-color: ${isNegative ? theme.colors.primary : "transparent"} transparent
            ${isNegative ? "transparent" : theme.colors.green} transparent;
          display: inline-block;
          vertical-align: middle;
          margin-right: 0.3rem;
        }
      }
    }
  `}
`;

export const CardAsideRight = styled.div`
  width: 100%;
`;
