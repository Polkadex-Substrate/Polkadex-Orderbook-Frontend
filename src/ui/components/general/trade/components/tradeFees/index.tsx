import Dropdown from 'components/Dropdown'
import Icon from 'components/global/icon'

import * as S from './styles'
import Props from './types'

const TradeFees = ({ label = 'Label', value='0.00005' }: Props) => {
  return (
    <S.Wrapper>
      <span>{label}</span>
      <Dropdown title={`${label}: ${value}`}>
        <p>Example</p>
        <p>Example</p>
      </Dropdown>
    </S.Wrapper>
  )
}

export default TradeFees
