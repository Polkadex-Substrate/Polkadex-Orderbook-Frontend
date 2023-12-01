import styled, { css } from "styled-components";
import { Container as Icon } from "@polkadex/orderbook-ui/molecules/Icon/styles";

import { normalizeValue } from "@/utils/normalize";

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
        border-radius: ${normalizeValue(0.5)};
        padding: ${normalizeValue(0.5)} ${normalizeValue(1)};
        transform: translateY(${normalizeValue(1)});
        @media screen and (min-width: 590px) {
          left: ${normalizeValue(3.1)};
        }
        @media screen and (max-width: 590px) {
          top: ${normalizeValue(-4)};
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
          border-radius: ${normalizeValue(0.5)};
          padding: ${normalizeValue(0.5)} ${normalizeValue(1)};
          transform: translateY(normalizeValue(1));
          @media screen and (min-width: 590px) {
            left: ${normalizeValue(3.1)};
          }
          @media screen and (max-width: 590px) {
            top: ${normalizeValue(-4)};
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
      border-radius: ${normalizeValue(10)};
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
  gap: ${normalizeValue(0.8)};
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
    margin-left: ${normalizeValue(0.8)};
    font-size: ${normalizeValue(1.3)};
    white-space: nowrap;
    transition:
      transform 0.2s ease-out,
      visibility 0.2s ease-in,
      opacity 0.2s ease-in;
    user-select: none;
    top: ${normalizeValue(0.5)};
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
  border-radius: 0 ${normalizeValue(3)} ${normalizeValue(3)}
    ${normalizeValue(3)};
  gap: ${normalizeValue(2)};
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
    top: ${normalizeValue(5.5)};
    left: 0;
    display: flex;
    padding: ${normalizeValue(1)};
    /* background: ${theme.colors.primaryBackground}; */
    z-index: 2;
    @media screen and (max-width: 590px) {
      border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    }
    ${open
      ? css`
          @media screen and (min-width: 980px) {
            max-width: ${normalizeValue(18)};
            ${WrapperIcon} {
              justify-content: flex-start;
            }
            ${WrapperLinks} {
              align-items: flex-start;
            }
          }
          @media screen and (min-width: 590px) and (max-width: 980px) {
            max-width: ${normalizeValue(3.5)};
            ${WrapperIcon} {
              justify-content: center;
            }
            ${WrapperLinks} {
              align-items: center;
            }
          }
          @media screen and (max-width: 980px) {
            ${TermsLinks} {
              margin-left: ${normalizeValue(1.4)};
            }
          }
        `
      : css`
          ${TermsLinks} {
            margin-left: ${normalizeValue(1.4)};
          }
        `}

    @media screen and (min-width: 590px) {
      max-width: ${open ? "auto" : normalizeValue(3.5)};
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
    gap: ${normalizeValue(0.1)};
    padding: ${normalizeValue(1)};
    border-radius: ${normalizeValue(0.5)};
    background: ${theme.colors.text};
    opacity: 0;
    visibility: hidden;
    transform: translateY(normalizeValue(1));
    transition:
      transform 0.2s ease-out,
      visibility 0.2s ease-in,
      opacity 0.2s ease-in;
    @media screen and (min-width: 590px) {
      left: 90%;
      top: ${normalizeValue(-1.5)};
    }
    @media screen and (max-width: 590px) {
      bottom: ${normalizeValue(4.5)};
      left: ${normalizeValue(-5)};
    }
    span {
      font-size: ${normalizeValue(1.3)};
      white-space: nowrap;
      color: ${theme.colors.inverse};
    }
    a {
      padding: ${normalizeValue(0.5)};
      border-radius: ${normalizeValue(0.4)};
      transition: background-color 0.2s ease-in;
      &:hover {
        background: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;
