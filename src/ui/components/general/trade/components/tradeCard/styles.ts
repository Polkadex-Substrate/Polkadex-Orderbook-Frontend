import styled, { css } from "styled-components";

export const WrapperOrder = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    border-radius: 0 2.5rem 2.5rem 2.5rem;
    padding: 3rem;
  `}
`;

export const ContainerWallet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2.5rem;
`;
export const WrapperBalance = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;
export const Span = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;
export const ContainerForm = styled.div``;
export const WrapperActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
`;
