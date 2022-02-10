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
  }
  span {
    display: block;
    font-size: 1.2rem;
    opacity: 0.7;
  }
`;

export const Content = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryBackgroundSolid};
    min-width: 35rem;
    border-radius: 1.5rem;
    transition: height 400ms ease;

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
      transition: all 400ms ease;
    }

    //Secondary
    .menu-secondary-enter-active {
      transform: translateX(0);
      transition: all 400ms ease;
    }

    .menu-secondary-exit-active {
      transform: translateX(110%);
      transition: all 400ms ease;
    }
  `}
`;
