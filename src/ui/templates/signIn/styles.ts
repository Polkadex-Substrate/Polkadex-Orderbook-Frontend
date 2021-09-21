import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
  height: 100vh;
  max-width: 192rem;
  margin: 0 auto;
  box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.5);
  display: flex;
  background: #2e303c;
`;

export const WrapperLeft = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  background: #1c2023;
`;
export const Header = styled.div`
  a {
    display: flex;
    align-items: center;
  }

  a:hover {
    opacity: 0.8;
  }

  img {
    margin-right: 1rem;
  }
`;
export const Footer = styled.div`
  p {
    font-size: 1.4rem;
    color: #8ba1be;
  }

  a {
    color: #e6007a;
  }

  a:hover {
    opacity: 0.7;
  }
`;
export const Form = styled.div``;
export const FormBox = styled.form``;
export const FormWrapperInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5rem;
  label {
    color: #e6007a;
  }
  input {
    color: white;
    border-bottom: 1px solid #c6d2e5;
    padding: 1rem 0;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: #8ba1be;
  }
  a:hover {
    opacity: 0.7;
  }
`;

export const FormHeader = styled.div`
  img {
    max-height: 3rem;
    margin-bottom: 2.5rem;
  }
`;
export const FormTitle = styled.div`
  margin-bottom: 3rem;
  h1 {
    font-size: 3.7rem;
  }
  p {
    font-size: 1.5rem;
    color: #8ba1be;
  }
`;
export const Button = styled.button`
  padding: 1.5rem;
  background: #e6007a;
  color: white;
  border-radius: 0.7rem;
  max-width: 25rem;
  width: 100%;
  &:hover {
    transform: translateY(-0.1rem);
  }
`;

export const WrapperRight = styled.div`
  flex: 1.4;
  h2 {
    font-size: 3.5rem;
    padding: 4rem 4rem 2rem 4rem;
  }
  strong {
    color: #e6007a;
  }
  img {
    width: 100%;
  }
`;
