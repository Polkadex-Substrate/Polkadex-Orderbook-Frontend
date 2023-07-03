import styled, { css } from "styled-components";

import { Container as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const WrapperIcon = styled.div<{
  isDisabled?: boolean;
}>`
  ${({ isDisabled = false }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: fit-content;
    cursor: pointer;
    pointer-events: ${isDisabled ? "none" : "auto"};
    opacity: ${isDisabled ? 0.4 : 1};
    :hover {
      ${Span},${TermsLinks} {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      ${Span} {
        visibility: ${isDisabled ? "hidden" : "visible"};
      }
    }
    ${Icon} {
      border-radius: 10rem;
    }
    @media screen and (max-width: 590px) {
      flex-direction: column;
    }
  `}
`;

export const LineBorder = styled.span`
  height: 30px;
  width: 3px;
  background-color: #e6007a;
  border-radius: 99px;
  margin-right: -2px;
  @media screen and (max-width: 590px) {
    width: 30px;
    height: 3px;
    position: relative;
    top: -8px;
  }
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
    top: 0.5rem;
    /* top: -4rem; */
    @media screen and (min-width: 590px) {
      left: 3.1rem;
    }
    @media screen and (max-width: 590px) {
      top: -4rem;
    }
  `}
`;

export const WrapperLinks = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 0 3rem 3rem 3rem;
  gap: 2rem;
  flex: 1;
  transition-duration: 0.8s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.075, 1);
  transition-delay: initial;
  transition-property: initial;
`;
export const BottomContainer = styled.div``;

export const Wrapper = styled.nav`
  ${({ theme }) => css`
    position: sticky;
    top: 5.5rem;
    left: 0;
    display: flex;
    padding: 1rem;
    background: ${theme.colors.primaryBackground};
    max-height: 94vh;
    z-index: 2;
    @media screen and (max-width: 590px) {
      border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    }

    @media screen and (min-width: 590px) {
      flex: 1;
      position: sticky;
      left: 0;
      bottom: 0;
      max-width: 3.5rem;
      align-items: center;
      border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      flex-direction: column;
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

export const Terms = styled.div``;
export const TermsLinks = styled.div`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 1rem;
    margin-left: 1.4rem;
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
