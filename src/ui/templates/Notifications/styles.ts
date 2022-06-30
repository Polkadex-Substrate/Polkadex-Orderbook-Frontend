import styled, { css } from "styled-components";

import { NotificationCardProps } from "./types";
type Props = {
  notificationsActive: boolean;
};
export const Wrapper = styled.section<Props>`
  ${({ theme, notificationsActive }) => css`
    position: absolute;
    z-index: 9999;
    top: 0;
    right: 0;
    max-width: 35rem;
    padding: 2rem;
    border-radius: 2rem;
    margin-top: 1.5rem;
    margin-left: 1.5rem;
    height: fit-content;

    /* display: ${notificationsActive ? "block" : "none"}; */
  `}
`;

export const ContentWrapper = styled.div`
  margin-top: 1rem;
`;

export const NotificationCard = styled.a<Pick<NotificationCardProps, "active">>`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: 1.5rem;
    border-radius: 1rem;
    background: ${theme.colors.tertiaryBackground};
    border: 1px solid ${theme.colors.secondaryBackground};
    box-shadow: ${theme.shadows.quaternary};
    transition: ${theme.transition.default};

    & :hover {
      transform: translateY(-0.3rem);
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.15);
    }
    & :not(:last-child) {
      margin-bottom: 1.5rem;
    }
  `}
`;
export const Container = styled.div<{ isActive?: boolean }>`
  ${({ isActive }) => css`
    opacity: ${isActive ? 1 : 0.5};
    & :last-child {
      margin-left: 1.5rem;
      & span {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        font-size: 1.5rem;
      }
      & p {
        opacity: 0.7;
      }
    }
  `}
`;
