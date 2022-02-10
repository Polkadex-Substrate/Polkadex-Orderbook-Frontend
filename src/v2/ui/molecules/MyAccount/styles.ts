import styled, { css } from "styled-components";

import { Wrapper as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const Main = styled.div``;

export const Header = styled.div<{ isFull: boolean }>`
  ${({ theme, isFull = false }) => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.white};
    padding: 0.8rem;
    border-radius: 1.2rem 0 0 1.2rem;
    max-width: 23rem;
    cursor: pointer;
    ${isFull &&
    css`
      flex: 1;
    `}
  `}
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5rem;
  flex: 1;
  span {
    line-height: 1.1;
  }
`;

export const HeaderInfo = styled.div`
  ${({ theme }) => css`
    margin-right: 1rem;
    p,
    span {
      color: ${theme.colors.black};
    }
    p {
      font-weight: 600;
      display: inline-block;
      line-height: 1;
    }
    span {
      display: block;
      font-size: 1.2rem;
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    min-width: 35rem;
    border-radius: 1.5rem;
    transition: height 400ms ease;

    .menu-secondary-enter {
      transform: translateX(110%);
    }
    //Primary

    .menu-primary-enter {
      position: absolute;
      transform: translateX(-110%);
    }

    .menu-primary-enter-active {
      transform: translateX(0);
      transition: transform 400ms ease;
    }

    .menu-primary-exit {
      position: absolute;
    }

    .menu-primary-exit-active {
      transform: translateX(-110%);
      transition: all 400ms ease;
    }

    //Secondary
    .menu-secondary-enter-active {
      transform: translateX(0);
      transition: all 400ms ease;
    }

    .menu-secondary-exit-active {
      transform: translateX(110%);
      transition: all 400ms ease;
    }
  `}
`;

export const ContentWrapper = styled.div`
  width: 100%;
`;

export const ContentHeader = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.black};
    padding: 2rem;
    border-radius: 1.5rem;
    small {
      font-size: 1.2rem;
      font-weight: 500;
      color: ${theme.colors.white};
    }
  `}
`;

export const Input = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    padding: 1.2rem;
    margin-top: 0.5rem;
    border-radius: 0.8rem;
    input {
      width: 100%;
    }
    ${Icon} {
      cursor: pointer;
      transition: opacity 0.3s ease-in-out;
      :hover {
        opacity: 0.7;
      }
    }
  `}
`;

export const ContentFeedback = styled.div`
  ${({ theme }) => css`
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
    border-bottom: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const ContentContainer = styled.div``;
export const ContentBox = styled.div``;
export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  :hover {
    opacity: 0.6;
  }
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CardTitle = styled.div`
  ${({ theme }) => css`
    margin-left: 1rem;
    span,
    p {
      color: ${theme.colors.black};
    }
    span {
      font-size: 1.3rem;
      font-weight: 500;
    }
    p {
      opacity: 0.4;
    }
  `}
`;

export const ContentFooter = styled.div`
  ${({ theme }) => css`
    padding: 1.5rem 2rem;
    margin-top: 1rem;
    border-top: 1px solid ${theme.colors.secondaryBackground};
    display: flex;
    justify-content: space-around;
    align-items: center;
    p,
    a {
      color: ${theme.colors.black};
    }
    a {
      position: relative;
      font-size: 1.2rem;
      opacity: 0.5;
      transition: opacity 0.3s ease-in-out;
      :hover {
        color: ${theme.colors.inverse};
        opacity: 0.5;
      }
    }
  `}
`;
