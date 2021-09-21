import * as S from './styles'

export type ListItemProps = {
  title?: string
  size?: 'Small' | 'Medium' | 'Large',
  darkMode?: boolean
  fullWidth?: boolean
}

const ListItemButton = ({ title, size = "Medium", darkMode = true, fullWidth = false}: ListItemProps) => (
  <S.Wrapper  size={size} darkMode={darkMode} fullWidth={fullWidth}  >
    {title}
</S.Wrapper>
)

export default ListItemButton
