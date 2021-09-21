import * as S from './styles'

export type HeadingProps = {
  title: string
}
const Heading = ({ title }: HeadingProps) => (
  <S.Wrapper>{title}</S.Wrapper>
)

export default Heading
