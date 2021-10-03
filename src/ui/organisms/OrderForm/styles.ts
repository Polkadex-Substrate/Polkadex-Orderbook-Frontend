import styled, { css } from "styled-components";

export const Wrapper = styled.div``;
export const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
`;

export const TabHeader = styled.div<{
  isActive?: boolean;
  isMarket?: boolean;
}>`
  ${({ theme, isMarket, isActive }) => css`
    border-bottom: 2px solid;
    border-bottom-color: ${isActive
      ? isMarket
        ? theme.colors.primary
        : theme.colors.green
      : "transparent"};
    opacity: ${isActive ? 1 : 0.7};
    padding: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    font-size: ${theme.font.sizes.xsmall};
  `}
`;
export const AvailableAmount = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.7rem;
    span {
      display: block;
      font-weight: 500;
      font-size: ${theme.font.sizes.xxsmall};
      :first-child {
        opacity: 0.7;
      }
    }
  `}
`;
