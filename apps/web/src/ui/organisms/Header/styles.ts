import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ dark?: boolean }>`
  ${({ theme, dark }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    flex: 1;
    max-height: 5.5rem;
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
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  flex: 1;
`;
export const ContentFull = styled.div`
  flex: 1;
  padding: 1rem;
`;

export const Logo = styled.div<{ borderActive: boolean; hideLogo?: boolean }>`
  ${({ theme, borderActive }) => css`
    padding-right: 1rem;
    flex: 1;
    display: flex;
    align-items: start;
    gap: 0.5rem;
    max-width: 121px;

    ${borderActive &&
    css`
      border-right: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    `}
    svg {
      width: 13rem;
      height: auto;
    }
    span {
      font-weight: 500;
      font-size: 1.2rem;
      display: inline-block;
      background: ${theme.colors.primary};
      padding: 0.2rem 0.3rem;
      border-radius: 0.2rem;
      color: ${theme.colors.white};
    }
  `}
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;
export const AccountContainer = styled.div`
  padding-left: 1rem;
`;

export const ActionsWrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 1rem;
    border-right: 1px solid ${theme.colors.secondaryBackground};
  `}
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;
export const NotificationsActive = styled.div<{ isActive?: boolean }>`
  ${({ theme, isActive }) => css`
    cursor: pointer;
    svg {
      width: 1.5rem;
    }
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
export const Profile = styled.div``;
export const Account = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    span {
      color: ${theme.colors.secondaryText};
    }
  `}
`;

export const Avatar = styled.div`
  ${({ theme }) => css`
    max-width: 3rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    padding: 0.5rem;
    border-radius: 5rem;
    svg {
      width: 100%;
      height: 100%;
    }
  `}
`;
export const AccountInfo = styled.div`
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
    gap: 1rem;
    a {
      padding: 0.5rem 0.6rem;
      border-radius: 0.3rem;
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
