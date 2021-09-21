import * as S from './styles'

export type SearchInputProps = {
    placeholder: string
    type: string
}
const SearchInput = ({placeholder, type}:SearchInputProps) => (
<S.Wrapper>
    <S.Image src="/img/icons/Search.svg" />
    <S.Input type={type} placeholder={placeholder} />
</S.Wrapper>
)

export default SearchInput
