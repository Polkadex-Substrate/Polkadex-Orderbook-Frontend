import styled, { css } from "styled-components";

export const Main = styled.div``;

export const Header = styled.div<{ isFull: boolean }>`
  ${({ theme, isFull = false }) => css`
    display: flex;
    align-items: center;
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: 0.8rem;
    border-radius: 1.2rem 0 0 1.2rem;
    max-width: 23rem;
    cursor: pointer;
    ${isFull &&
    css`
      flex: 1;
    `}
  `}
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5rem;
  flex: 1;
  span {
    line-height: 1.1;
  }
`;

export const HeaderInfo = styled.div`
  margin-right: 1rem;
  p {
    font-weight: 600;
    display: inline-block;
    line-height: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 18rem;
    white-space: nowrap;
  }
  span {
    display: block;
    font-size: 1.2rem;
    opacity: 0.7;
  }
`;

export const Content = styled.div<{ hasUser?: boolean }>`
  ${({ theme, hasUser }) => css`
    ${hasUser &&
    css`
      background: ${theme.colors.secondaryBackgroundSolid};
      min-width: 35rem;
      border-radius: 1.5rem;
      transition: height 400ms ease;
      border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
    `}
    .menu-secondary-enter {
      transform: translateX(110%);
    }
    //Primary

    .menu-primary-enter {
      position: absolute;
      transform: translateX(-110%);
    }

    .menu-primary-enter-active {
      transform: translateX(0);
      transition: transform 400ms ease;
    }

    .menu-primary-exit {
      position: absolute;
    }

    .menu-primary-exit-active {
      transform: translateX(-110%);
      transition: transform 400ms ease;
    }

    //Secondary
    .menu-secondary-enter-active {
      transform: translateX(0);
      transition: transform 400ms ease;
    }

    .menu-secondary-exit-active {
      transform: translateX(110%);
      transition: transform 400ms ease;
    }
  `}
`;

export const Empty = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    border-radius: 1.5rem;
    padding: 1rem;
    max-width: 25rem;
  `}
`;
export const EmptyHeader = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.inverse};
    border-radius: 1.5rem;
    padding: 1rem;
    margin-bottom: 3rem;
    img {
      width: 100%;
    }
  `}
`;
export const EmptyContent = styled.div`
  ${({ theme }) => css`
    text-align: center;
    h2 {
      font-size: 1.8rem;
      font-weight: 550;
    }
    p {
      margin: 1.5rem 0 3rem 0;
      color: ${theme.colors.tertiaryText};
    }
  `}
`;
export const EmptyActions = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    background-color: ${theme.colors.primaryBackgroundOpacity};
    border-radius: 1rem;
    position: relative;

    :hover a {
      :nth-child(1) {
        :hover {
          color: ${theme.colors.white};
        }
        color: ${theme.colors.text};
      }
      :nth-child(2):hover {
        color: ${theme.colors.white};
        ~ div {
          left: 50%;
        }
      }
    }
    a {
      z-index: 1;
      padding: 1.5rem;
      :nth-child(1) {
        color: ${theme.colors.white};
      }
      transition: color 0.5s ease-in-out;
    }

    div {
      position: absolute;
      width: 48%;
      height: 80%;
      background-color: ${theme.colors.primary};
      border-radius: 0.8rem;
      left: 2%;
      z-index: 0;
      transition: left 0.5s ease-in-out, right 0.5s ease-in-out;
    }
  `}
`;
