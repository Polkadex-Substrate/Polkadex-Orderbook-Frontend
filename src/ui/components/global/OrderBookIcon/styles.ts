import styled, { css } from 'styled-components'

import { OrderBookProps } from '.'

export const Wrapper = styled.div<Partial<OrderBookProps>>`
  ${({ active, theme }) => css`
    display: flex;
    align-items:center;
    justify-content: center;
    cursor: pointer;
    background: ${active ? theme.colors.white : theme.colors.darkGray };
    height: 2.5rem;
    width: 2.5rem;
    padding: ${theme.spacings.xxxsmall} ;
    border-radius: 0.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  `}
`


export const Image = styled.img`
  width:100%;
`
