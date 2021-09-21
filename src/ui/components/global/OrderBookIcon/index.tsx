import * as S from './styles'

export type OrderBookProps = {
  icon: string
  filterState?: string
  handleChange: (name: string) => void
  active?:boolean
}
const OrderBookIcon = ({ icon, filterState, handleChange }: OrderBookProps) => {
  return (
    <S.Wrapper active={filterState === icon} onClick={() => handleChange(icon)}>
      <S.Image src={`/img/icons/${icon}.svg`} />
    </S.Wrapper>
  )
}

export default OrderBookIcon
