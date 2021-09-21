
import MarketTypeContentItem from '../marketTypeContentItem'
import * as S from './styles'

const MarketTypeContent = () => (
  <S.Wrapper >
    <MarketTypeContentItem title='Market Order' />
    <MarketTypeContentItem title='Limit Order' />
    <MarketTypeContentItem title='Stop Order'/>
  </S.Wrapper>
)

export default MarketTypeContent
