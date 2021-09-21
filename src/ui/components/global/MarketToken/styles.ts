import styled, { css } from 'styled-components'

type PricingProps = {
  negative: boolean
}

export const Tr = styled.tr`
  padding: 0.7rem 0 0.7rem 2rem;
  cursor:pointer;
  & :hover {
    background-color:#242633;
  }
`
export const Td = styled.td``

export const ContainerCoin = styled.div`
  display: flex;
  flex-direction:row;
  align-items:center;

`
export const ContainerCoinName = styled.div`
  display: flex;
  flex-direction:column;
`

export const ContainerPricing = styled.div`
  display:flex;
  flex-direction:column;
`
export const PricingPercent = styled.p``
export const PricingVolume = styled.p<PricingProps>`
${({ negative }) => css`
    color: ${negative ? "#E6007A" : "#0CA564" };
  `}
  font-weight: 600;
`
export const Span = styled.span`
  color:#8BA1BE;
`
