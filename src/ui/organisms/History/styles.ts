import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    h2 {
      font-size: 1.6rem;
      font-weight: 550;
    }
  `}
`;

export const Content = styled.div`
  padding: 1rem;
`;

export const Card = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;

  span {
    font-weight: 550;
    line-height: 1.6;
  }
  p {
    opacity: 0.7;
    max-width: 24rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Aside = styled.div`
  text-align: right;
`;
export const HeaderFiltersContent = styled.div`
  ${({ theme }) => css`
    padding: 1rem;
    background: ${theme.colors.white};
    border-radius: 0.5rem;
  `}
`;

export const HeaderFilters = styled.div<{ isHeader?: boolean }>`
  ${({ theme, isHeader }) => css`
    display: flex;
    align-items: center;
    color: ${isHeader ? theme.colors.white : theme.colors.black};
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.5s;
    span {
      margin-right: 0.5rem;
    }
    ${!isHeader &&
    css`
      :hover {
        opacity: 0.5;
      }
      :not(:last-child) {
        margin-bottom: 1rem;
      }
    `}
  `}
`;
