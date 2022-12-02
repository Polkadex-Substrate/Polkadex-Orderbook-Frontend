import styled, { css } from "styled-components";

import { Container as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";
export const Logo = styled.div`
  @media screen and (max-width: 590px) {
    display: none;
  }
`;

export const WrapperIcon = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    cursor: pointer;
    :hover {
      ${Span},${TermsLinks} {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }
    ${Icon} {
      border-radius: 10rem;
    }
  `}
`;
export const SpanWrapper = styled.div``;

export const Span = styled.span`
  ${({ theme }) => css`
    position: absolute;
    background: ${theme.colors.text};
    color: ${theme.colors.inverse};
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-left: 0.8rem;
    font-size: 1.3rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transform: translateY(1rem);
    transition: transform 0.2s ease-out, visibility 0.2s ease-in, opacity 0.2s ease-in;
    user-select: none;
    /* top: -4rem; */
    @media screen and (min-width: 590px) {
      left: 2.5rem;
    }
    @media screen and (max-width: 590px) {
      top: -4rem;
    }
  `}
`;

export const WrapperLinks = styled.div`
  ${({ theme }) => css`
    width: 100%;
    min-width: 4.5rem;
    display: flex;
    justify-content: space-between;
    background: ${theme.colors.tertiaryBackground};
    border-radius: 0 3rem 3rem 3rem;
    padding: 1rem;
    transition-duration: 0.8s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.075, 1);
    transition-delay: initial;
    transition-property: initial;
    @media screen and (min-width: 590px) {
      padding: 2rem 1rem 1rem 0.9rem;
      min-height: 42rem;
    }
    @media screen and (max-width: 690px) {
      gap: 2rem;
      background: ${theme.colors.quaternaryBackground};
    }
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
    z-index: 33;

    @media screen and (min-width: 590px) {
      position: sticky;
      top: 0;
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
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  width: fit-content;
  @media screen and (max-width: 690px) {
    width: 100%;
    justify-content: space-around;
  }
`;

export const WrapperProfile = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding-left: 1rem;
    padding-bottom: 1.5rem;
    @media screen and (max-width: 590px) {
      display: none;
    }
  `}
`;
export const ContainerProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Notifications = styled.div`
  position: relative;
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;
export const NotificationsWrapper = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    ${isActive &&
    css`
      div {
        position: absolute;
        top: 0.2rem;
        right: 0.1rem;
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 5rem;
        background: ${theme.colors.primary};
      }
    `}
  `}
`;

export const Profile = styled.div`
  cursor: pointer;
`;

export const Avatar = styled.div`
  width: 3.5rem;
  height: 3.5rem;
`;
export const Terms = styled.div``;
export const TermsLinks = styled.div`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 1rem;
    margin-left: 0.8rem;
    border-radius: 0.5rem;
    background: ${theme.colors.text};
    opacity: 0;
    visibility: hidden;
    transform: translateY(1rem);
    transition: transform 0.2s ease-out, visibility 0.2s ease-in, opacity 0.2s ease-in;
    @media screen and (min-width: 590px) {
      left: 2.5rem;
      top: -1.5rem;
    }
    @media screen and (max-width: 590px) {
      bottom: 4.5rem;
      left: -5rem;
    }
    span {
      font-size: 1.3rem;
      white-space: nowrap;
      color: ${theme.colors.inverse};
    }
    a {
      padding: 0.5rem;
      border-radius: 0.4rem;
      transition: background-color 0.2s ease-in;
      :hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
