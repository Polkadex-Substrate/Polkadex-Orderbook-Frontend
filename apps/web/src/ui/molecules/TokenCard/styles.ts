import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 5rem;
    padding: 2rem;
    cursor: pointer;
    transition: background-color ease-in 0.2s;
    border-radius: 0.5rem;
    &:hover {
      background: ${theme.colors.tertiaryBackgroundOpacity};
    }
  `}
`;

export const AsideLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const TokenWrapper = styled.div`
  ${({ theme }) => css`
    width: 4.2rem;
    height: 4.2rem;
    padding: 0.7rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 10rem;
  `}
`;

export const TokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  p {
    font-size: 1.6rem;
    font-weight: 550;
  }
  span {
    opacity: 0.5;
  }
`;

export const AsideRight = styled.div`
  width: 1rem;
`;
