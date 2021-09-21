import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.darkGray};
    padding: 2rem;
    border-radius: 1.5rem;
    width: max-content;
  `}
`

