import styled, { css } from "styled-components";

import { LogoText } from "../../molecules/Logo/styles";

import { Container as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
export const Logo = styled.div`
  @media screen and (max-width: 590px) {
    display: none;
  }
`;

export const WrapperIcon = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  ${Icon} {
    border-radius: 10rem;
  }
`;
export const Span = styled.span`
  margin-left: 0.8rem;
  font-size: 1.3rem;
  display: none;
`;

export const WrapperLinks = styled.div`
  ${({ theme }) => css`
    width: 100%;
    min-width: 4.5rem;
    display: flex;
    justify-content: space-between;
    background: ${theme.colors.tertiaryBackground};
    border-radius: 0 3rem 3rem 3rem;
    padding: 2rem 1rem 1rem 0.9rem;
    transition-duration: 0.8s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.075, 1);
    transition-delay: initial;
    transition-property: initial;
  `}
`;

export const Wrapper = styled.nav`
  ${({ theme }) => css`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    transition-duration: 0.8s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.075, 1);
    transition-delay: initial;
    transition-property: initial;
    z-index: 28;

    @media screen and (min-width: 590px) {
      position: sticky;
      top: 0;
      overflow: hidden;
      min-width: 4.5rem;
      height: 100vh;
      max-width: 4.5rem;
      display: grid;
      grid-template-rows: 1.5fr 1fr;
      ${Container} {
        display: grid;
        width: 100%;
      }
      ${WrapperIcon} {
        width: 100%;
      }
      ${Span} {
        display: block;
      }
      ${WrapperLinks} {
        flex-direction: column;
      }
      & :hover,
      :hover ${WrapperLinks} {
        min-width: 17rem;
        max-width: 17rem;
      }
      & :hover ${LogoText} {
        display: block;
        opacity: 1;
      }
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  width: fit-content;
`;

export const WrapperProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 1rem;
  @media screen and (max-width: 590px) {
    display: none;
  }
`;

export const Profile = styled.img`
  border-radius: 55rem;
  margin: 1.5rem 0;
  width: 2.5rem;
  height: 2.5rem;
`;
