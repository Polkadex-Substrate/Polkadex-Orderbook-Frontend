import styled, { css } from "styled-components";

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100rem;
  padding: 2rem;
  @media screen and (min-width: 1110px) {
    padding: 2rem 4rem 4rem 4rem;
  }
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Container = styled.div``;
