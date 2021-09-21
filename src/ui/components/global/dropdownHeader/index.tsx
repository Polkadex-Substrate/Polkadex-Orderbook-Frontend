import { BiChevronDown } from 'react-icons/bi';

import * as S from './styles'
import Props from './types'

const DropdownHeader = ({title = 'Title', icon }:Props) => (
  <S.Wrapper>
    {!!icon &&
    <S.WrapperIcon>
      <img src={`img/languages/${icon}.svg`} alt="Description"/>
    </S.WrapperIcon>}
    <span>{title}</span>
    <div>
      <BiChevronDown />
    </div>
</S.Wrapper>
)

export default DropdownHeader
