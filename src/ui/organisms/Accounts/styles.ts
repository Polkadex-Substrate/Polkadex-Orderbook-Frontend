import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
      h3 {
        font-size: ${theme.font.sizes.small};
        font-weight: 600;
        margin-bottom: 1rem;
      }
  `}
`;
export const Container = styled.div`
 ${({ theme }) => css`

  `}
`;
export const Card = styled.div`
  ${({ theme }) => css`
      background: ${theme.colors.primaryBackground};
      border-radius: 0.8rem;
      padding: 1.2rem;
      :not(:last-child) {
        margin-bottom: 1rem;
      }
      span {
        font-weight: 600;
      }
  `}
`;

export const CardInformation = styled.div`
 ${({ theme }) => css`
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    :first-child {
      span {
        font-size: ${theme.font.sizes.small};
      }
      p {
        opacity: 0.7;
        font-size: ${theme.font.sizes.xxsmall};
      }
    }

  `}
`

export const CardAssets = styled.div`
 ${({ theme }) => css`
  text-align: center;
  opacity: 0.7;
  font-size: ${theme.font.sizes.xxsmall};
  cursor: pointer;
  transition: opacity 0.5s;
  :hover {
    opacity: 1;
  }
`}
`
