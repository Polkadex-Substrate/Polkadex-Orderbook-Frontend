import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: 1.2rem 0.8rem;
    border-radius: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
    span,
    label {
      opacity: 0.6;
      font-weight: 500;
    }
    span {
      font-size: ${theme.font.sizes.xxsmall};
    }
    div {
      flex: 1;
      text-align: end;
    }
    input {
      color: ${theme.colors.text};
      text-align: end;
      margin-right: 0.5rem;
      font-size: ${theme.font.sizes.small};
      line-height: 0;
    }
  `}
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
