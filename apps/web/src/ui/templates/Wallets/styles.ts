import styled, { css } from "styled-components";
import { Wrapper as Checkbox } from "@polkadex/orderbook-ui/molecules/Checkbox/styles";

import { normalizeValue } from "@/utils/normalize";

export const Main = styled.main`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.primaryBackground};
    height: 100vh;
    display: flex;
    box-shadow: 0px -36px 99px rgba(0, 0, 0, 0.15);
    flex-direction: column;
  `}
`;

export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  overflow: hidden;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex: 1;
    border-left: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (min-width: 590px) {
      margin-left: ${normalizeValue(2)};
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const ContainerMain = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    max-width: ${normalizeValue(140)};
    border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (max-width: 1100px) {
      flex-direction: column;
    }
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.6)};
    padding: ${normalizeValue(2)};
    h1 {
      font-size: ${normalizeValue(2.5)};
      font-weight: 500;
    }
    h2 {
      font-size: ${theme.font.sizes.small};
      font-weight: normal;
      opacity: 0.5;
    }
    @media screen and (min-width: 1110px) {
      padding: ${normalizeValue(4)};
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(3)};
  h2 {
    font-size: ${normalizeValue(1.6)};
    font-weight: 600;
  }
`;

export const Wallet = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    background: ${theme.colors.clearBackgroundOpacity};
  `}
`;

export const WalletTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: ${normalizeValue(1)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    padding: ${normalizeValue(1.5)} ${normalizeValue(2)};
    h2 {
      font-size: ${normalizeValue(1.7)};
      font-weight: 600;
    }
    @media screen and (min-width: 1110px) {
      padding: ${normalizeValue(1.5)} ${normalizeValue(4)};
    }
  `}
`;

export const WalletContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(2)};
    background: ${theme.colors.tertiaryBackgroundOpacity};
  `}
`;
export const Disclaimer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: ${normalizeValue(2)};
    @media screen and (min-width: 1110px) {
      padding: ${normalizeValue(2)} ${normalizeValue(4)};
    }
  `}
`;

export const WalletContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1.5)};
    max-height: ${normalizeValue(40)};
    padding: 0 ${normalizeValue(2)};
    overflow-y: auto;
    @media screen and (min-width: 1110px) {
      padding: 0 ${normalizeValue(4)};
    }
    &::-webkit-scrollbar-thumb {
      background: none;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.secondaryBackground};
      }

      &::-webkit-scrollbar-track {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;

export const WalletWrapper = styled.div``;
export const AccountHeaderFlex = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
`;

export const ButtonGroup = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${normalizeValue(1)};
    button {
      &:nth-child(1) {
        background: ${theme.colors.secondaryBackground} !important;
        &:hover {
          background: ${theme.colors.secondaryBackgroundOpacity} !important;
        }
      }
    }
  `}
`;

export const ButtonWallet = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border-radius: ${normalizeValue(0.8)};
    padding: ${normalizeValue(0.8)};
    font-weight: 600;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    transition: background-color 0.5s ease-in;
    &:hover {
      background: ${theme.colors.primary}33;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.8px solid ${theme.colors.white};
      border-radius: ${normalizeValue(0.4)};
      vertical-align: middle;
      margin-right: ${normalizeValue(0.5)};
      padding: ${normalizeValue(0.4)};
      width: ${normalizeValue(1.8)};
      height: ${normalizeValue(1.8)};
      svg {
        width: 100%;
        height: 100%;
      }
    }
  `}
`;

export const WalletTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.5)};
  span {
    white-space: nowrap;
  }
`;

export const TooltipHeader = styled.div`
  ${({ theme }) => css`
    width: ${normalizeValue(1.5)};
    background: ${theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(10)};
    padding: ${normalizeValue(0.3)};
  `}
`;

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${normalizeValue(2)};
`;

export const EmptyBox = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${normalizeValue(0.8)};
    max-width: ${normalizeValue(40)};
    margin: 0 auto;
    text-align: center;
    p {
      line-height: 1.5;
      margin-top: ${normalizeValue(0.5)};
      font-size: ${normalizeValue(1.3)};
      color: ${theme.colors.tertiaryText};
    }
    span {
      font-size: ${normalizeValue(1.5)};
      font-weight: 600;
    }
    div {
      background: ${theme.colors.secondaryBackground};
      border-radius: ${normalizeValue(0.5)};
      width: ${normalizeValue(4)};
      padding: ${normalizeValue(0.8)};
      border-radius: ${normalizeValue(1)};
    }
  `}
`;

export const Account = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    background: ${theme.colors.clearBackgroundOpacity};
  `}
`;
export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(0.4)};
`;

export const AccountCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${theme.colors.tertiaryBackgroundOpacity};
    padding: ${normalizeValue(2)};
    gap: ${normalizeValue(2)};
    @media screen and (min-width: 1110px) {
      padding: ${normalizeValue(2)} ${normalizeValue(4)};
    }
  `}
`;
export const AccountCardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
`;
export const AccountCardAvatar = styled.div`
  width: ${normalizeValue(4.5)};
  height: ${normalizeValue(4.5)};
`;

export const AccountCardContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.3)};
    font-size: ${normalizeValue(1.3)};
    span {
      font-weight: 500;
    }
    p {
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const AccountCardFlex = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    div {
      width: ${normalizeValue(1)};
      svg {
        fill: ${theme.colors.tertiaryText};
        stroke: ${theme.colors.tertiaryText};
        width: 100%;
        height: 100%;
      }
    }
  `}
`;
export const AccountCardActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1)};
`;
export const Badge = styled.div<{ isRegistered: boolean }>`
  ${({ theme, isRegistered }) => css`
    background: ${isRegistered
      ? `${theme.colors.green}33`
      : theme.colors.secondaryBackground};
    border-radius: ${normalizeValue(0.3)};
    padding: ${normalizeValue(0.5)} ${normalizeValue(0.7)};
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    border-radius: ${normalizeValue(10)};
    font-size: ${normalizeValue(1.2)};
    font-weight: 500;
    user-select: none;
    ${isRegistered &&
    css`
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${normalizeValue(1.3)};
        height: ${normalizeValue(1.3)};
        background: ${theme.colors.green};
        border-radius: ${normalizeValue(10)};
        padding: ${normalizeValue(0.2)};
        svg {
          fill: ${theme.colors.white};
          stroke: ${theme.colors.white};
          width: 100%;
          height: 100%;
        }
      }
    `}
  `}
`;

export const Registered = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(1)};
    border-left: 2px solid ${theme.colors.primary};
    border-right: 2px solid ${theme.colors.primary};
    background: ${theme.colors.primary}33;
    border-radius: ${normalizeValue(0.5)};
    padding: ${normalizeValue(2)};
    user-select: none;
    div {
      &:first-child {
        padding: ${normalizeValue(0.4)};
        border: 1px solid ${theme.colors.primary};
        border-radius: ${normalizeValue(10)};
        width: ${normalizeValue(2)};
        svg {
          fill: ${theme.colors.primary};
          width: 100%;
          height: 100%;
        }
      }
      &:last-child {
        display: flex;
        flex-direction: column;
        gap: ${normalizeValue(0.2)};
        span {
          font-size: ${normalizeValue(1.4)};
          display: block;
          font-weight: 600;
        }
        p {
          opacity: 0.8;
        }
      }
    }
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(2)};
    margin-bottom: ${normalizeValue(1.5)};
    padding: ${normalizeValue(2)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    @media screen and (min-width: 1110px) {
      padding: ${normalizeValue(2)} ${normalizeValue(4)};
    }
  `}
`;

export const AccountHeaderTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.5)};
  cursor: pointer;
  div {
    width: ${normalizeValue(0.8)};
  }
  svg {
    width: 100%;
    height: 100;
  }
`;

export const AccountHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(1.5)};
  label,
  span {
    white-space: nowrap;
    font-size: ${normalizeValue(1.2)};
  }
  ${Checkbox} {
    align-items: center;
  }
`;

export const Filters = styled.div``;

export const Using = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${normalizeValue(4)};
    height: ${normalizeValue(4)};
    background: ${theme.colors.green}33;
    color: ${theme.colors.green};
    font-size: ${normalizeValue(0.9)};
    text-transform: uppercase;
    font-weight: 600;
    border-radius: ${normalizeValue(10)};
  `}
`;

export const WalletCard = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${normalizeValue(0.5)};
    flex-wrap: wrap;
    min-height: ${normalizeValue(6)};
    padding-bottom: ${normalizeValue(2)};

    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    }
    ${!isActive &&
    css`
      opacity: 0.5;
      transition: opacity 0.2s ease-in;
      &:hover {
        opacity: 1;
      }
    `}
  `}
`;

export const WalletCardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.5)};
`;

export const WalletCardAside = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.5)};
`;

export const WalletCardContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(0.2)};
    span {
      font-weight: 600;
      font-size: ${normalizeValue(1.3)};
    }
    small {
      font-size: ${normalizeValue(1.2)};
      font-weight: normal;
    }
    p {
      color: ${theme.colors.tertiaryText};
      font-size: ${normalizeValue(1.3)};
    }
  `}
`;

export const WalletCardCopy = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    button {
      width: ${normalizeValue(1)};
      svg {
        fill: ${theme.colors.tertiaryText};
        stroke: ${theme.colors.tertiaryText};
        width: 100%;
        height: 100%;
      }
    }
  `}
`;

export const WalletCardBadge = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundOpacity};
    color: ${theme.colors.tertiaryText};
    border-radius: ${normalizeValue(0.3)};
    padding: ${normalizeValue(0.5)} ${normalizeValue(0.8)};
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    border-radius: ${normalizeValue(10)};
    font-size: ${normalizeValue(1.2)};
    font-weight: 500;
    user-select: none;
  `}
`;

export const Button = styled.button<{ fill?: string }>`
  ${({ theme, fill = "secondaryBackground" }) => css`
    background: ${theme.colors[fill]};
    border-radius: ${normalizeValue(0.3)};
    padding: ${normalizeValue(0.5)};
    font-weight: 500;
    font-size: ${normalizeValue(1.3)};
    transition: background-color 0.4s ease-in-out;
    &:hover {
      background: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
export const Preview = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.4)};
    height: ${normalizeValue(2.6)};
    padding: ${normalizeValue(0.5)};
    border-radius: ${normalizeValue(10)};
    transition: 0.2s background-color ease;
    width: fit-content;
    span {
      display: none;
      width: 0;
    }
    div {
      height: ${normalizeValue(1.2)};
      svg {
        fill: ${theme.colors.text};
        stroke: ${theme.colors.text};
        width: auto;
      }
    }

    &:hover {
      background: ${theme.colors.secondaryBackground};
      span {
        display: block;
        width: auto;
      }
    }
  `}
`;

export const WalletActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(1)};
    transition: 0.2s ease;
    a {
      background: ${theme.colors.secondaryBackground};
      border-radius: ${normalizeValue(0.3)};
      padding: ${normalizeValue(0.3)} ${normalizeValue(0.5)};
      font-weight: 500;
      font-size: ${normalizeValue(1.3)};
      transition: background-color 0.4s ease-in-out;
      &:hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;
export const Dropdown = styled.div`
  small {
    font-size: ${normalizeValue(1.3)};
  }
`;

export const LoadingWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    z-index: 20;
    height: ${normalizeValue(38)};
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.tertiaryBackgroundOpacity};
  `}
`;

export const Support = styled.div`
  display: flex;
  @media screen and (min-width: 1100px) {
    flex-direction: column;
    max-width: ${normalizeValue(35)};
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const SupportCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${normalizeValue(2)};
    padding: ${normalizeValue(3)};
    @media screen and (max-width: 1100px) {
      flex: 1;
    }
    p {
      opacity: 0.6;
      line-height: 1.5;
      font-size: ${normalizeValue(1.3)};
    }
    h4 {
      font-size: ${normalizeValue(1.7)};
      font-weight: 500;
    }
    a,
    button {
      font-size: ${normalizeValue(1.3)};
      background: ${theme.colors.secondaryBackgroundOpacity};
      padding: ${normalizeValue(1)} ${normalizeValue(2)};
      border-radius: ${normalizeValue(0.5)};
      transition: background-color 0.5s ease;
      white-space: nowrap;
      width: fit-content;
      &:disabled {
        background: gray;
        cursor: not-allowed;
      }
      &:hover:not(:disabled) {
        background: ${theme.colors.secondaryBackground};
      }
      &:active:not(:disabled) {
        background: ${theme.colors.primary};
      }
    }
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};

    @media screen and (max-width: 600px) {
      flex-direction: column;
    }
    &:first-child {
      @media screen and (max-width: 1100px) {
        border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;

export const SupportCardContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1)};
    div {
      width: ${normalizeValue(3)};
      height: ${normalizeValue(3)};
      padding: ${normalizeValue(0.6)};
      border-radius: ${normalizeValue(50)};
      background: ${theme.colors.secondaryBackgroundOpacity};
      margin-bottom: ${normalizeValue(1)};
    }
  `}
`;

export const IntroCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(1)};
  div {
    display: flex;
    flex-direction: column;
    gap: ${normalizeValue(1.5)};
  }
  span {
    font-size: ${normalizeValue(1.8)};
    font-weight: 500;
  }
  p {
    line-height: 1.4;
    opacity: 0.7;
    font-size: ${normalizeValue(1.4)};
  }
`;
