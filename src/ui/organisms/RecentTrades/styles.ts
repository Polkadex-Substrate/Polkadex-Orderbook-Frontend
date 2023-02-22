import styled, { css } from "styled-components";
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top: 1.5rem;
`;

export const Main = styled.div<{ hasData?: boolean }>`
  ${({ theme, hasData }) => css`
    background: ${hasData ? theme.colors.inverse : theme.colors.tertiaryBackground};
    display: flex;
    flex-flow: column;
    flex: 1;
    border-radius: 0 3rem 3rem 0rem;
    /* min-width: 29rem; */
    width: 100%;
    height: 100%;
    min-height: 33rem;
    max-height: 70rem;
    /* @media screen and (min-width: 1290px) {
      max-width: 29rem;
    } */
    @media screen and (max-height: 800px) {
      max-height: 35rem;
    }
    @media screen and (min-height: 1200px) {
      max-height: 80rem;
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 0 2rem;
  margin-bottom: 1rem;
  h2 {
    font-size: 1.5rem;
    font-weight: 550;
  }
`;

export const DropdownTrigger = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border-radius: 0.7rem;
    padding: 0.4rem 0.6rem;
    user-select: none;
    text-transform: capitalize;
    transition: background 0.4s ease-in-out, opacity 0.4s ease-in-out;
    font-size: 1.2rem;
    svg {
      display: inline-block;
      vertical-align: middle;
      width: 0.8rem;
      height: 0.8rem;
    }
    :hover {
      background: ${theme.colors.secondaryBackground};
    }
  `}
`;
export const DropdownMenuItem = styled.div`
  text-transform: capitalize;
`;
export const Content = styled.div`
  ${({ theme }) => css`
    padding-bottom: 2rem;
    flex: 1;
    overflow: hidden;
    height: 100%;

    ::-webkit-scrollbar-thumb {
      background: none;
    }
    ::-webkit-scrollbar-track {
      background: none;
    }
    :hover {
      overflow: auto;
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.secondaryBackground};
      }

      ::-webkit-scrollbar-track {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;

export const Head = styled.div`
  ${({ theme }) => css`
    position: sticky;
    top: 0;
    z-index: 2;
    background: ${theme.colors.tertiaryBackground};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 2rem;
    margin-bottom: 0.5rem;
    span {
      opacity: 0.5;
    }
  `}
`;

export const CellHead = styled.span`
  font-size: 1.2rem;
  :not(:first-child) {
    justify-self: flex-end;
  }
`;

// Card
export const Card = styled.div<{ isSell?: boolean }>`
  ${({ theme, isSell }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    padding: 0 1.6rem 0 2rem;
    font-weight: 500;
    :not(:last-child) {
      margin-bottom: 0.1rem;
    }
    ${CardCell} {
      :first-child {
        color: ${isSell ? theme.colors.primary : theme.colors.green};
      }
    }
  `}
`;

export const CardCell = styled.span`
  padding: 0.4rem 0;
  font-size: 1.2rem;
  :not(:first-child) {
    justify-self: flex-end;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Empty = styled.div`
  text-align: center;
  padding: 5rem 1rem;
  img {
    margin-bottom: 1rem;
    max-width: 22rem;
  }
`;
