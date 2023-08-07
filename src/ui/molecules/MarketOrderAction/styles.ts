import styled, { css } from "styled-components";

// Order Box

export const WrapperOrder = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackground};
    border-radius: 0 2rem 2rem 2rem;
    padding: 1rem;
  `}
`;

export const ContainerWallet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
`;

export const WrapperBalance = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  small {
    font-size: 1.2rem;
    color: #8ba1be;
  }
`;
export const Span = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  word-break: break-word;
`;
export const ContainerForm = styled.div``;
export const WrapperActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
`;
export const RangeWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const SliderWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackground};
    display: grid;
    grid-template-columns: auto auto auto auto;
    padding: 0.2rem;
    column-gap: 0.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  `}
`;

export const Connect = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    display: block;
    background: ${theme.colors.primaryBackground};
    color: ${theme.colors.text};
    padding: 1rem;
    border-radius: 1rem;
    font-weight: 500;
    width: 100%;
    text-align: center;
    transition: background 0.2s ease;

    :hover {
      background: ${theme.colors.primaryBackgroundOpacity};
    }
  `}
`;

export const ProtectPassword = styled.div`
  padding: 0.5rem 0 1rem 0;
`;
export const ProtectPasswordTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  span {
    display: block;
    font-weight: 500;
  }
`;
export const ProtectPasswordContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  `}
`;

export const Show = styled.button`
  ${({ theme }) => css`
    width: 2.2rem;
    height: 2.2rem;
    padding: 0.3rem;
    transition: background 0.5s ease-in;
    border-radius: 10rem;
    :hover {
      background: ${theme.colors.secondaryBackground};
    }
    svg {
      stroke: ${theme.colors.text};
    }
  `}
`;

export const Error = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.primary} !important;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  `}
`;
