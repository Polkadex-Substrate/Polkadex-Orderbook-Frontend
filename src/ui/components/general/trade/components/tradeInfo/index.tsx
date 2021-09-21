import Icon from 'components/global/icon'

import * as S from './styles'
import Props from './types'

const TradeInfo = ({ label = 'Label', icon = 'Wallet', amount = 0.0000000, coin = 'DEX', }: Props) => {
  return (
    <S.Wrapper>
      <Icon name={icon} />
      <div>
        <span>{label}</span>
        <span>{amount} {coin}</span>
      </div>
    </S.Wrapper>
  )
}

export default TradeInfo
