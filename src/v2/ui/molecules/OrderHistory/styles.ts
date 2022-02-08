import styled, { css } from "styled-components";

// Card
export const Card = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 3fr fit-content(100%);
    border-radius: 1rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    color: ${theme.colors.black};
    margin: 0 0.5rem;
    transition: border 0.4s ease-in-out;
    user-select: none;
    cursor: pointer;
    span {
      font-weight: 550;
    }
    p {
      opacity: 0.6;
    }
    :not(:last-child) {
      margin-bottom: 0.7rem;
    }
    :hover {
      border-color: ${theme.colors.black};
      box-shadow: ${theme.shadows.quaternary};
    }

    /* @media screen and (max-width: 990px) {
      width: max-content;
    } */
    :hover ${Tag} {
      visibility: visible;
      opacity: 1;
    }
  `}
`;
export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  grid-gap: 2rem;

  overflow: overlay;
  ::-webkit-scrollbar {
    height: 0;
  }
`;

export const CardBox = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  padding: 0.5rem;
  min-width: 21rem;
`;

export const CardInfoToken = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    border: 1px solid ${theme.colors.secondaryBackground};
    border-radius: 10rem;
    margin-right: 0.5rem;
  `}
`;

export const Tag = styled.span<{ isSell?: boolean }>`
  ${({ theme, isSell = false }) => css`
    position: absolute;
    bottom: -0.5rem;
    right: 50%;
    transform: translate(50%, 0);
    color: ${theme.colors.white};
    background: ${isSell ? theme.colors.primary : theme.colors.green};
    padding: 0.2rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    width: fit-content;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  `}
`;

export const CardInfo = styled.div`
  padding: 1rem;
  align-self: center;
  min-width: 10rem;
`;

export const CardActions = styled.div`
  ${({ theme }) => css`
    position: sticky;
    right: 0;
    min-width: 15.3rem;
    background: ${theme.colors.white};
    height: 100%;
    padding: 1rem;
    border-left: 1px solid ${theme.colors.secondaryBackground};
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    ul {
      list-style: none;
      li {
        font-size: 1.1rem;
        font-weight: 500;
        text-transform: uppercase;
        cursor: pointer;
        padding: 0.5rem;
        display: inline-block;
        transition: opacity 0.4s ease-in-out;
        :not(:last-child) {
          margin-right: 0.3rem;
        }
        :hover {
          opacity: 0.5;
        }
      }
    }
  `}
`;

export const Deposit = styled.li`
  ${({ theme }) => css`
    color: ${theme.colors.green};
  `}
`;

export const Cancel = styled.li`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
  `}
`;
