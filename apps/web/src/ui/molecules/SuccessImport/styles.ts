import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  h3 {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const Card = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: 1.5rem;
    border-radius: 0.4rem;
    span {
      font-size: 1.3rem;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const DefaultAccount = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const Wallet = styled(Card)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    p {
      strong {
        font-size: 1.2rem;
        font-weight: normal;
        color: ${theme.colors.tertiaryText};
      }
    }
  `}
`;

export const WalletContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    button {
      width: 1.2rem;
      height: 1.2rem;

      svg {
        stroke: ${theme.colors.tertiaryText};
        fill: ${theme.colors.tertiaryText};
      }
    }
  `}
`;
