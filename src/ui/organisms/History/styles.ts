import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.primaryBackground};
    border-radius: 1rem;
    box-shadow: ${theme.shadows.tertiary};
    max-height: -webkit-fill-available;
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    overflow: hidden;
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem 0 2rem;
    margin-bottom: 1rem;
    gap: 1rem;
    h2 {
      font-size: 1.6rem;
      font-weight: 550;
    }
  `}
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

export const TitleIconWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 3rem;
    max-width: 3rem;
    max-height: 3rem;
    min-height: 3rem;
    border-radius: 4rem;
    cursor: pointer;
    transition: background 0.2s ease-in-out border 0.2s ease-in-out;
    :not(:last-child) {
      background: ${theme.colors.secondaryBackground};
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }

    :last-child {
      border: 1px solid ${theme.colors.secondaryBackgroundOpacity};
      :hover {
        border-color: ${theme.colors.secondaryBackground};
      }
    }
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    position: relative;
    z-index: 0;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    ::-webkit-scrollbar-thumb {
      background: none;
    }
    ::-webkit-scrollbar-track {
      background: none;
    }
    :hover {
      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.secondaryBackground};
      }

      ::-webkit-scrollbar-track {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;

export const Card = styled.div`
  ${({ theme }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem;
    transition: box-shadow 0.2s ease-in-out;
    border-top: 1px solid ${theme.colors.secondaryBackgroundOpacity};

    :hover {
      box-shadow: ${theme.shadows.tertiary};
    }
    :last-child {
      margin-bottom: 20rem;
    }
  `}
`;

export const CardLeft = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    p {
      color: ${theme.colors.secondaryBackgroundDark};
    }
  `}
`;
export const CardIconWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background: ${theme.colors.secondaryBackgroundOpacity};
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 4rem;
  `}
`;

export const CardRight = styled.div`
  ${({ theme }) => css`
    p {
      color: ${theme.colors.secondaryBackgroundDark};
      text-align: right;
    }
  `}
`;
export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  strong {
    font-weight: normal;
  }
`;

export const HeaderFiltersContent = styled.div`
  ${({ theme }) => css`
    padding: 1rem;
    background: ${theme.colors.white};
    border-radius: 0.5rem;
  `}
`;

export const HeaderFilters = styled.div<{ isHeader?: boolean }>`
  ${({ theme, isHeader }) => css`
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.5s;
    span {
      color: ${isHeader ? theme.colors.text : theme.colors.black};
      margin-right: 0.5rem;
      text-transform: capitalize;
    }
    ${!isHeader &&
    css`
      :hover {
        opacity: 0.5;
      }
      :not(:last-child) {
        margin-bottom: 1rem;
      }
    `}
  `}
`;

export const Empty = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyContainer = styled.div`
  text-align: center;
  padding: 5rem 1rem;
  img {
    margin-bottom: 1rem;
    max-width: 10rem;
  }
`;

export const Actions = styled.div`
  padding: 0 2rem;
  margin-top: 1rem;
`;
