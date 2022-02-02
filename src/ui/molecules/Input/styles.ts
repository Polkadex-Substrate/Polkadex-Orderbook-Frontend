import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 1rem;
    border-radius: 1rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    label {
      font-size: ${theme.font.sizes.xsmall};
      font-weight: 600;
      width: 100%;
    }
    input {
      margin-top: 1rem;
      display: block;
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.text};
      width: 100%;
    }
  `}
`;

export const Primary = styled.div`
  ${({ theme }) => css`
    padding: 1.2rem;
    border-radius: 1rem;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.secondaryBackground};
    label {
      font-size: ${theme.font.sizes.xsmall};
      width: 100%;
      color: ${theme.colors.black};
    }
    input {
      margin-top: 1rem;
      display: block;
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.black};
      width: 100%;
    }
  `}
`;

// Secondary Input

export const SecondaryWrapper = styled.div<{ hasLabel?: boolean }>`
  ${({ theme, hasLabel }) => css`
    background: ${theme.colors.primaryBackground};
    padding: 1.2rem 0.8rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${theme.colors.secondaryBackground};
    label {
      opacity: 0.6;
      font-weight: 500;
      white-space: nowrap;
    }

    div {
      display: flex;
      justify-content: ${hasLabel ? "flex-end" : "space-between"};
      flex: 1;
      text-align: ${hasLabel ? "end" : "start"};
    }
    input {
      color: ${theme.colors.text};
      text-align: ${hasLabel ? "end" : "start"};
      margin-right: 0.5rem;
      font-size: ${theme.font.sizes.small};
      line-height: 0;
      width: 100%;
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
