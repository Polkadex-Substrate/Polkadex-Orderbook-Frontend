import Icon from 'components/global/icon'

import * as S from './styles'
import Props from './types'

const TradeItem = ({ label = 'Label', text='~$92.54' }: Props) => {
  return (
    <S.Wrapper>
      <span>{label}</span>
      <span>{text}</span>
    </S.Wrapper>
  )
}

export default TradeItem
