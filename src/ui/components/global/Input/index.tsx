import * as S from './styles'
import Props from "./types"

const Input = ({ value, onChange, label = 'Label', labelFor, placeholder = 'Text..', disabled = false, type = "text", fullWidth = false, ...props }: Props) => {

  return (
    <S.Wrapper fullWidth={fullWidth}>
      <label htmlFor={labelFor}> {label} </label>
      <div>
        <input
          id={labelFor}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          disabled={disabled}
          value={value}
          {...props}
        />
      </div>
    </S.Wrapper>
  )
}

export default Input
