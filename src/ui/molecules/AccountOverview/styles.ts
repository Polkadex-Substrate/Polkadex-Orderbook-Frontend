import styled, { css } from "styled-components";

export const ContentWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.colors.secondaryBackgroundSolid};
    border-radius: 1.5rem;
  `}
`;

export const ContentHeader = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.text};
    color: ${theme.colors.inverse};
    padding: 1.5rem;
    border-radius: 1.5rem;
    small {
      font-size: 1.2rem;
      font-weight: 500;
    }
  `}
`;
export const ContentEmail = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
    padding-top: 1rem;
    padding-bottom: 1rem;
  `}
`;

export const Input = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${theme.colors.inverse};
    padding: 1.2rem;
    margin-top: 0.5rem;
    border-radius: 0.8rem;
    input {
      width: 100%;
      color: ${theme.colors.text};
    }
    button {
      margin-left: 0.5rem;
      cursor: pointer;
      transition: opacity 0.3s ease-in-out;
      background: ${theme.colors.text};
      padding: 0.2rem;
      border-radius: 0.4rem;
      :hover {
        opacity: 0.7;
      }
    }
  `}
`;

export const ContentFeedback = styled.div`
  ${({ theme }) => css`
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const ContentContainer = styled.div``;
export const ContentBox = styled.div``;
export const Card = styled.div<{ isHoverable?: boolean }>`
  ${({ isHoverable = true }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    ${isHoverable &&
    css`
      cursor: pointer;
      transition: opacity 0.3s ease-in-out;
      :hover {
        opacity: 0.6;
      }
    `}
  `}
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CardTitle = styled.div`
  margin-left: 1rem;
  span {
    font-size: 1.3rem;
    font-weight: 500;
  }
  p {
    opacity: 0.6;
  }
`;

export const ContentFooter = styled.div`
  ${({ theme }) => css`
    padding: 1.5rem 2rem;
    margin-top: 1rem;
    border-top: 1px solid ${theme.colors.secondaryBackground};
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    a {
      position: relative;
      font-size: 1.2rem;
      opacity: 0.5;
      transition: opacity 0.3s ease-in-out;
      color: ${theme.colors.text};

      :hover {
        opacity: 1;
      }
    }
    a,
    p {
      white-space: nowrap;
    }
  `}
`;
