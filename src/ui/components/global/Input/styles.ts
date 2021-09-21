import styled, { css } from 'styled-components'

import Props from './types';


export const Wrapper = styled.div<Partial<Props>>`
  :not(:last-child) {
    margin-bottom: 2rem;
  }
  padding: 1.5rem;
  border-radius: 1.2rem;

  ${({ theme, fullWidth }) => css `
      background-color: ${theme.colors.darkGray};
      max-width: ${!fullWidth ? '35rem' : 'max-content'};
  `}

  & label, & input {
    color: white;
  }

  & input {
    font-size: 1.5rem;
    margin-top: 1rem;
    width: 100%;

    &:disabled {
      opacity: .2;
      cursor: not-allowed;
    }
  }

  & div {
    display: flex;
    align-items:center;
    justify-content: space-between;
  }
`

export const Span = styled.span`
  ${({theme}) => css `
    color: ${theme.colors.white};
  `}

`
