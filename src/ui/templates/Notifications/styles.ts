import styled, { css } from "styled-components";

import { NotificationCardProps } from "./types";
type Props = {
  notificationsActive: boolean;
};
export const Wrapper = styled.section<Props>`
  ${({ theme, notificationsActive }) => css`
    max-width: 35rem;
    padding: 2rem;
    border-radius: 2rem;
    margin-top: 1.5rem;
    margin-left: 1.5rem;
    height: fit-content;
    background: ${theme.colors.gradientBackground};
    box-shadow: ${theme.shadows.primary};
    border-radius: ${theme.border.radius.primary.medium};
    display: ${notificationsActive ? "block" : "none"};
  `}
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  & h3 {
    font-weight: 500;
  }
`;
export const ContentWrapper = styled.div`
  margin-top: 1rem;
`;

export const NotificationCard = styled.a<Pick<NotificationCardProps, "active">>`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-radius: 2rem;
  ${({ theme, active }) => css`
    background: ${theme.colors.secondaryBackground};
    opacity: ${active ? 1 : 0.5};
    transition: ${theme.transition.default};
  `}
  & :hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.15);
  }
  & :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;
export const Container = styled.div`
  & :last-child {
    margin-left: 1.5rem;
    & span {
      display: block;
      font-weight: 600;
      line-height: 2;
    }
    & p {
      opacity: 0.7;
    }
  }
`;
