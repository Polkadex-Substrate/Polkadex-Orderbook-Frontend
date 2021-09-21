import styled, { css } from 'styled-components'

export const Wrapper = styled.a`
${({ theme }) => css`

font-size: 1.2rem;
  div {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.darkGray};
    color: ${theme.colors.white};
  }
`}

`
