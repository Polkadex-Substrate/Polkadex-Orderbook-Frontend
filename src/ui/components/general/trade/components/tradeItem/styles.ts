import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display:flex;
    align-items:center;
    & span {
      display: block;
      color: ${theme.colors.white};
      line-height: 1;
    }
    & span:first-child {
      font-size: 1.3rem;
      opacity: .6;
    }
    & span:last-child {
      font-size:1.3rem;
      font-weight: 600;
      margin-left: .5rem;
    }
  `}
`;
export const Container = styled.div``
