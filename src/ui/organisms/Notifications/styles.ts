import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  max-width: 35rem;
  padding: 2rem;
  border-radius: 2rem;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  height: fit-content;
`;

export const ContentWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 1rem;

    .notification-enter {
      transform: translate(100%, 0);
    }

    .notification-enter-active {
      transition: transform 300ms ease-out;
      transform: translate(0, 0);
    }

    .notification-exit {
      transform: translate(0, 0);
    }

    .notification-exit ~ ${CardWrapper} {
      transform: translate(0, -113%);
      transition: transform 200ms ease-out calc(300ms - 200ms);
    }

    .notification-exit-active {
      transition: transform 300ms ease-out;
      transform: translate(110%, 0);
    }
  `}
`;

export const CardWrapper = styled.div<{ borderColor: string }>`
  ${({ theme, borderColor }) => css`
    display: block;
    position: relative;
    background: ${theme.colors.primaryBackground};
    border: 1px solid ${theme.colors.secondaryBackground};
    box-shadow: ${theme.shadows.quaternary};
    /* transition: ${theme.transition.default}; */
    border-left: 2px solid ${theme.colors[borderColor]};
    :not(:last-child) {
      margin-bottom: 1.5rem;
    }
    /* :hover {
      transform: translateY(-0.3rem);
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.15);
    } */
  `}
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
`;

export const Container = styled.div`
  margin-left: 0.5rem;
  flex: 1;
  span {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 1.5rem;
  }
  p {
    opacity: 0.7;
  }
`;
export const Title = styled.div`
  margin-right: 2rem;
  span,
  p {
    word-wrap: anywhere;
  }
`;

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;
    small {
      display: block;
      font-size: 1.2rem;
      color: ${theme.colors.tertiaryText};
    }
    a {
      background: ${theme.colors.primary}33;
      color: ${theme.colors.primary};
      padding: 0.3rem 0.4rem;
      border-radius: 0.5rem;
      font-size: 1.2rem;
      border: 1px solid transparent;
      transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
      :hover {
        border-color: ${theme.colors.primary};
        background: transparent;
      }
    }
  `}
`;

export const Close = styled.button`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    padding: 0.6rem;
    border-radius: 5rem;
    transition: background-color 0.3s ease-in-out;

    :hover {
      background-color: ${theme.colors.secondaryBackgroundOpacity};
    }
  `}
`;
