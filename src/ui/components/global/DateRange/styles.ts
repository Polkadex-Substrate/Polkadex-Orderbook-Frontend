import styled, { css } from 'styled-components'

type Props = {
  position: 'right' | 'left'
}
const wrapperModifier = {
  right: () => css`
    right: 0;
  `,
  left: () => css`
  left:0;
  `,
}
export const Wrapper = styled.div`
  position: relative;
`
export const WrapperCalendar = styled.div<Props>`
  position: absolute;
  z-index: 10;
  ${({ position }) => css`
    ${wrapperModifier[position]}
  `}
`
