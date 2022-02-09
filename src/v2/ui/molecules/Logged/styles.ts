import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
export const Container = styled.div`
  text-align: center;
  ${({ theme }) => css`
    h2,
    p {
      color: ${theme.colors.inverse};
    }
    h2 {
      font-size: 1.8rem;
      margin-bottom: 0.4rem;
    }
    p {
      opacity: 0.6;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
      a {
        padding: 1rem;
        border-radius: 0.5rem;
        transition: background 0.2s ease-in-out;
        :first-child {
          background: ${theme.colors.primary}E5;
          :hover {
            background: ${theme.colors.primary};
          }
        }
        :last-child {
          color: ${theme.colors.inverse};
          background: ${theme.colors.secondaryBackgroundOpacity};
          :hover {
            background: ${theme.colors.secondaryBackground};
          }
        }
      }
    }
  `}
`;
