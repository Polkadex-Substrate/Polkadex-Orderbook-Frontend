import Icon from 'components/global/icon'
import Input from 'components/global/input'

import * as S from './styles'
import Props from './types'

const TradeForm = ({ label = 'Label', icon = 'Wallet', amount = 0.0000000, coin = 'DEX', }: Props) => {
  return (
    <S.Wrapper>
      <Input label='Price' />
      <Input label='Amount' />
      <S.Container>

      </S.Container>
    </S.Wrapper>
  )
}

export default TradeForm
