import { Wrapper as WrapperButton } from "src/components/CustomButton/styles";
import { WrapperIcon } from "src/components/CustomIcon/styles";
import styled, { css } from "styled-components";

import { Props } from "./types";


export const Wrapper = styled.div<Pick<Props, "background">>`
  ${({ theme, background }) => css`
    background: ${theme.colors[background]};
    border-radius: 1.5rem;
    padding: 1rem;
    label {
      opacity: 0.7;
      margin-bottom: 0.5rem;
    }
    input {
      font-weight: 500;
      color: ${theme.colors.text};
      font-size: ${theme.font.sizes.small};
    }
  `}
`;

export const Main = styled.div`
  label {
    opacity: 0.7;
    margin: 0 1rem 1rem 0;
  }
`

export const Box = styled.div<Pick<Props, "background">>`
   ${({ theme, background }) => css`
    background: ${theme.colors[background]};
    border-radius: 1.5rem;
    input {
      font-weight: 500;
      color: ${theme.colors.text};
      font-size: ${theme.font.sizes.small};
    }
  `}
`

export const Content = styled.div`
 ${({ theme }) => css`
  padding: 1.5rem;
  input {
      font-weight: 500;
      color: ${theme.colors.text};
      font-size: ${theme.font.sizes.small};
    }  
  `}  
`
export const Actions = styled.div`
 ${({ theme }) => css`
    display: flex; 
    align-items: center;
    button {
      margin-right: 0.5rem;
      font-size: ${theme.font.sizes.xxsmall};
      transition: ${theme.transition.default};
      opacity: 0.6;
      :hover {
        opacity: 1;
      }
    }

    span {
      font-size: ${theme.font.sizes.xsmall};

    }
    button, span {
      background: ${theme.colors.secondaryBackground};
      padding: 0.6rem;
      border-radius: 0.5rem;
      font-weight: 500;
    }
  `}  
`

export const Card = styled.div`
  ${({ theme }) => css`

    :nth-child(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        font-size: ${theme.font.sizes.xlarge};
        color: ${theme.colors.text};
        width: 100%;
      }
    }

    :nth-child(2) {
      display: flex;
      justify-content: space-between;
      span {
        display: block;
        opacity: 0.5;
        font-size: ${theme.font.sizes.xsmall};
      }
    }

    :nth-child(3) {
      margin-top: 1rem;
    }
  `}
`

export const Header = styled.div`
  padding-top: 1.5rem;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  ${WrapperIcon} {
    margin-right: 0.5rem;
    opacity: 0.5;
  }
`;

export const OrderInputHeader = styled.div`
  ${({ theme }) => css`
    text-align: right;

    font-size: ${theme.font.sizes.small};
    strong {
      font-size: ${theme.font.sizes.medium};
    }
  `}
`;

export const OrderInputContent = styled.div`
  label {
    opacity: 0.8;
    margin-bottom: 0.7rem;
  }
`;

export const OrderInputContentData = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      display: block;
    }
  `}
`;

export const OrderInputContentActions = styled.div`
  ${({ theme }) => css`
    input {
      margin-top: 0.5rem;
    }
    :first-child {
      opacity: 0.7;
      span {
        font-size: ${theme.font.sizes.xsmall};
        margin-top: 0.6rem;
      }
    }
    :last-child {
      display: flex;
      ${WrapperButton} {
        margin: 0.5rem 0.5rem 0 0;
      }
      div :last-child {
        span {
          font-weight: 600;
          font-size: ${theme.font.sizes.medium};
        }
        button {
          font-size: ${theme.font.sizes.xsmall};
          margin-top: 1rem;
          opacity: 0.5;
        }
      }
    }
  `}
`;
export const OrderInputContentBox = styled.div`
 ${({ theme }) => css`
    background: ${theme.colors.secondaryBackground};
    padding: 1rem;
    border-radius: 1.5rem;
    font-weight: 500;
    button {
      margin-top: 1rem;
      opacity: 0.6;
    }
  `}
`
export const OrderInputFooter = styled.div`
  margin-top: 1rem;
`;

// Slider
export const WrapperSlider = styled.div``;
export const WalletInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Amount
export const AmountWrapper = styled.div`
 ${({ theme }) => css`
    border: 0.2rem solid ${theme.colors.primaryBackground};
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1.2rem 0;
    padding: 1rem;
  `}
`;
export const AmountBox = styled.div``;
export const AmountContainer = styled.div`
 ${({ theme }) => css`
  display: flex;
  align-items: center;
  input {
    font-size: ${theme.font.sizes.xlarge};
    color: ${theme.colors.text};
    width: 100%;    
    max-width: 12rem ;
  }
`}
`;