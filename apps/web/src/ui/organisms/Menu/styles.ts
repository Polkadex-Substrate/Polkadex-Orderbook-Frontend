import styled, { css } from "styled-components";
import { Container as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

export const WrapperIcon = styled.div<{
  isDisabled?: boolean;
  open?: boolean;
}>`
  ${({ theme, open, isDisabled = false }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    cursor: pointer;
    pointer-events: ${isDisabled ? "none" : "auto"};
    opacity: ${isDisabled ? 0.4 : 1};
    a {
      display: flex;
      align-items: center;
    }

    @media screen and (max-width: 980px) {
      ${Span} {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        background: ${theme.colors.text};
        color: ${theme.colors.inverse};
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        transform: translateY(1rem);
        @media screen and (min-width: 590px) {
          left: 3.1rem;
        }
        @media screen and (max-width: 590px) {
          top: -4rem;
        }
      }
      &:hover {
        ${Span},${TermsLinks} {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        ${Span} {
          visibility: ${isDisabled ? "hidden" : "visible"};
        }
      }
    }
    ${!open &&
    css`
      @media screen and (min-width: 980px) {
        ${Span} {
          position: absolute;
          opacity: 0;
          visibility: hidden;
          background: ${theme.colors.text};
          color: ${theme.colors.inverse};
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          transform: translateY(1rem);
          @media screen and (min-width: 590px) {
            left: 3.1rem;
          }
          @media screen and (max-width: 590px) {
            top: -4rem;
          }
        }
      }

      &:hover {
        ${Span},${TermsLinks} {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        ${Span} {
          visibility: ${isDisabled ? "hidden" : "visible"};
        }
      }
    `}

    ${Icon} {
      border-radius: 10rem;
    }
    @media screen and (max-width: 590px) {
      flex-direction: column;
    }
  `}
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
`;

export const Text = styled.div`
  @media screen and (max-width: 980px) {
    display: none;
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Span = styled.span`
  ${({ theme }) => css`
    margin-left: 0.8rem;
    font-size: 1.3rem;
    white-space: nowrap;
    transition:
      transform 0.2s ease-out,
      visibility 0.2s ease-in,
      opacity 0.2s ease-in;
    user-select: none;
    top: 0.5rem;
  `}
`;
export const LineBorder = styled.span`
  position: absolute;
  height: 30px;
  width: 3px;
  background-color: #e6007a;
  border-radius: 99px;
  left: -8px;
  @media screen and (max-width: 590px) {
    width: 30px;
    height: 3px;
    position: relative;
    top: -11px;
  }
`;

export const SpanWrapper = styled.div``;

export const WrapperLinks = styled.div`
  width: 100%;
  display: flex;
  border-radius: 0 3rem 3rem 3rem;
  gap: 2rem;
  flex: 1;
  transition-duration: 0.8s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.075, 1);
  transition-delay: initial;
  transition-property: initial;
`;
export const BottomContainer = styled.div``;

export const Wrapper = styled.nav<{ open?: boolean }>`
  ${({ theme, open }) => css`
    position: sticky;
    top: 5.5rem;
    left: 0;
    display: flex;
    padding: 1rem;
    /* background: ${theme.colors.primaryBackground}; */
    z-index: 2;
    @media screen and (max-width: 590px) {
      border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    }
    ${open
      ? css`
          @media screen and (min-width: 980px) {
            max-width: 18rem;
            ${WrapperIcon} {
              justify-content: flex-start;
            }
            ${WrapperLinks} {
              align-items: flex-start;
            }
          }
          @media screen and (min-width: 590px) and (max-width: 980px) {
            max-width: 3.5rem;
            ${WrapperIcon} {
              justify-content: center;
            }
            ${WrapperLinks} {
              align-items: center;
            }
          }
          @media screen and (max-width: 980px) {
            ${TermsLinks} {
              margin-left: 1.4rem;
            }
          }
        `
      : css`
          ${TermsLinks} {
            margin-left: 1.4rem;
          }
        `}

    @media screen and (min-width: 590px) {
      max-width: ${open ? "auto" : "3.5rem"};
    }
    @media screen and (min-width: 590px) {
      flex: 1;
      position: sticky;
      left: 0;
      top: 0;
      border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      flex-direction: column;
      ${!open &&
      css`
        ${WrapperIcon} {
          justify-content: ${open ? "flex-start" : "center"};
        }
      `}
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

export const Terms = styled.div<{ open: boolean }>`
  ${({ open }) => css`
    width: ${open ? "100%" : "auto"};
  `}
`;

export const TermsLinks = styled.div`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background: ${theme.colors.text};
    opacity: 0;
    visibility: hidden;
    transform: translateY(1rem);
    transition:
      transform 0.2s ease-out,
      visibility 0.2s ease-in,
      opacity 0.2s ease-in;
    @media screen and (min-width: 590px) {
      left: 90%;
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
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
