import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${theme.colors.white};
    max-width: 25rem;
    cursor: pointer;
    :not(:last-child) {
      margin-bottom: 1rem;
    }
    & span {
      display: block;
    }
    & svg {
      margin-left: 2rem;
    }
  `}
`

