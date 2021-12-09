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
  }

  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Aside = styled.div`
  text-align: right;
`;
