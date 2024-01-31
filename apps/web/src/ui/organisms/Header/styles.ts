import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div<{ dark?: boolean }>`
  ${({ theme, dark }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    flex: 1;
    max-height: ${normalizeValue(5.5)};
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    backdrop-filter: blur(5px);

    ${!dark
      ? css`
          background: ${theme.colors.primaryBackground};
        `
      : css`
          svg {
            fill: ${theme.colors.white};
          }
        `}

    z-index: 9;
  `}
`;

export const Content = styled.div`
  display: flex;
  gap: ${normalizeValue(1)};
  padding: ${normalizeValue(1)};
  align-items: center;
  flex: 1;
`;
export const ContentFull = styled.div`
  flex: 1;
  padding: ${normalizeValue(1)};
`;

export const Logo = styled.div<{ borderActive: boolean; hideLogo?: boolean }>`
  ${({ theme, borderActive }) => css`
    padding-right: ${normalizeValue(1)};
    flex: 1;
    display: flex;
    align-items: start;
    gap: ${normalizeValue(0.5)};
    max-width: 121px;

    ${borderActive &&
    css`
      border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    `}
    svg {
      width: ${normalizeValue(13)};
      height: auto;
      margin-top: ${normalizeValue(1)};
    }
    span {
      font-weight: 500;
      font-size: ${normalizeValue(1.2)};
      display: inline-block;
      background: ${theme.colors.primary};
      padding: ${normalizeValue(0.2)} ${normalizeValue(0.3)};
      border-radius: ${normalizeValue(0.2)};
      color: ${theme.colors.white};
    }
  `}
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  padding: ${normalizeValue(1)};
`;
export const AccountContainer = styled.div`
  padding-left: ${normalizeValue(1)};
`;

export const ActionsWrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 ${normalizeValue(1)};
    border-right: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: ${normalizeValue(0.5)};
  cursor: pointer;
  span {
    font-size: ${normalizeValue(1.3)};
  }
`;
export const NotificationsActive = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    cursor: pointer;
    svg {
      width: ${normalizeValue(1.5)};
      height: 100%;
    }
    ${isActive &&
    css`
      div {
        position: absolute;
        top: ${normalizeValue(0.2)};
        right: ${normalizeValue(0.1)};
        width: ${normalizeValue(0.7)};
        height: ${normalizeValue(0.7)};
        border-radius: ${normalizeValue(5)};
        background: ${theme.colors.primary};
      }
    `}
  `}
`;
export const Profile = styled.div``;
export const Account = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(0.5)};
    cursor: pointer;
    span {
      color: ${theme.colors.secondaryText};
    }
  `}
`;

export const Avatar = styled.div`
  ${({ theme }) => css`
    max-width: ${normalizeValue(3)};
    max-height: ${normalizeValue(3)};
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: ${normalizeValue(0.5)};
    border-radius: ${normalizeValue(5)};
    svg {
      width: 100%;
      height: 100%;
    }
  `}
`;
export const AccountInfo = styled.div`
  p {
    font-size: ${normalizeValue(1.3)};
  }
  @media screen and (max-width: 650px) {
    display: none;
  }
`;
export const AccountMessage = styled.p`
  display: none;
  @media screen and (max-width: 650px) {
    display: block;
  }
`;

export const UserActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${normalizeValue(1)};
    a {
      font-size: ${normalizeValue(1.3)};
      padding: ${normalizeValue(0.5)} ${normalizeValue(0.6)};
      border-radius: ${normalizeValue(0.3)};
      transition: background-color ease 0.8s;
      &:first-child {
        &:hover {
          background-color: ${theme.colors.secondaryBackground};
        }
      }
      &:last-child {
        background: ${theme.colors.primary};
        &:hover {
          background: ${theme.colors.primary}99;
        }
      }
    }
  `}
`;
