import * as S from './styles'
import Props from './types'

const Icon = ({ name = "Settings", background = "DarkGray", size = "Medium", text, action}:Props) => (
  <S.Wrapper background={background} size={size} onClick={action}>
    <div>
       <img src={`/img/icons/${name}.svg`} />
    </div>
    {text && <span> {text} </span>}
  </S.Wrapper>
)

export default Icon
