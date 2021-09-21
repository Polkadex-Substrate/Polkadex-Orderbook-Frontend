import { BiChevronRight } from 'react-icons/bi';

import * as S from './styles'
import Props from "./types"

const MarketTypeContentItem = ({title = 'Example', action}:Props) => (
  <S.Wrapper onClick={action}>
      <span>{title}</span>
      <BiChevronRight />
  </S.Wrapper>
)

export default MarketTypeContentItem
