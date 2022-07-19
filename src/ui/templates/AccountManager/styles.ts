import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    max-width: 160rem;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 4rem;
`;

export const Title = styled.div``;
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;
export const TitleBalance = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    align-items: center;
    div {
      :first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;
        border: 1px solid ${theme.colors.secondaryBackground};
        border-radius: 10rem;
      }
      :last-child {
        strong {
          display: block;
          margin-bottom: 0.3rem;
          font-weight: 500;
        }
        strong,
        small {
          color: ${theme.colors.secondaryText};
          font-size: 1.2rem;
        }
        span {
          font-size: 1.5rem;
          font-weight: 500;
        }
      }
    }
    svg {
      max-width: 1.5rem;
      stroke: ${theme.colors.secondaryText};
    }
  `}
`;
export const TitleActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    a {
      color: ${theme.colors.secondaryText};
      border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      padding: 1rem 2rem;
      border-radius: 1rem;
    }
  `}
`;
