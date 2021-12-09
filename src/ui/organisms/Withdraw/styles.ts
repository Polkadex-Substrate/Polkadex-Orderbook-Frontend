import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  padding: 2.5rem;
  form {
    width: 100%;
  }
`;

export const QrCode = styled.div`
  ${({ theme }) => css`
    text-align: center;
    margin-right: 1.5rem;
    p {
      margin-top: 1rem;
      font-weight: 500;
    }
    div {
      background: ${theme.colors.white};
      padding: 1rem;
      border-radius: 0.5rem;
      width: max-content;
    }
  `}
`;

export const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 1rem;
  align-items: center;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem;
`;

export const Container = styled.div`
  padding-left: 1.6rem;

  span {
    display: block;
    font-size: 1.5rem;
    font-weight: 550;
    margin-bottom: 1rem;
  }
`;

export const Input = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    span {
      opacity: 0.7;
    }
    p {
      font-size: 1.4rem;
      font-weight: 500;
    }
  `}
`;

export const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  span {
    font-weight: 500;
    line-height: 2;
  }
  p {
    opacity: 0.7;
    font-size: 1.2rem;
  }
`;
