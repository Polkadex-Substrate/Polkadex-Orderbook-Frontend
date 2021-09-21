import * as S from './styles'

type CoinProps = {
  source: string
}
const CoinIcon = ({ source }: CoinProps) => (
  <S.Wrapper>
    <S.Image src={source} />
  </S.Wrapper>

)

export default CoinIcon
