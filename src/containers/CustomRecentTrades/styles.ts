import styled, { css } from "styled-components";
import { Props } from "./types"

export const Wrapper = styled.div``;

const Template = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.5rem;
`
export const Header = styled(Template)`
  span {
    opacity: 0.5;
  }
`

export const Content = styled.div`
  max-height:49rem;
  overflow-y: auto;
`

export const ItemWrapper = styled(Template)<Partial<Props>>`
  ${({theme, isSell})=> css`
    span:nth-child(2){
      color:${isSell ? theme.colors.primary : theme.colors.green};
    }
  `}
`
