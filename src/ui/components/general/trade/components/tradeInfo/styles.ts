import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display:flex;
    align-items:center;
    & div{
      margin-left: 1rem;
    }
    & span {
      display: block;
      color: ${theme.colors.white};
    }
    & span:first-child {
      font-size: 1.2rem;
      opacity: .6;
    }
    & span:last-child {
      font-size:2rem;
      font-weight: 600;
    }
  `}
`;
export const Container = styled.div``
