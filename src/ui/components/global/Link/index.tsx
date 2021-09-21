import { BiChevronDown } from 'react-icons/bi';

import * as S from './styles'
import Props from './types'

const Link = ({ title="Example", href="#", color='white', action, arrowIcon = false}: Props) => (
  <S.Wrapper href={href} color={color} >
    {title}
    {!!arrowIcon &&
      <div>
       <BiChevronRight />
      </div>
    }
  </S.Wrapper>
)

export default Link
