import * as S from "./styles";
import Props from "./types";

export const Checkbox = ({ label, error, ...props }: Props) => {
  return (
    <S.Wrapper>
      <input id={props.name} {...props} />
      {!!label && <label htmlFor={props.name}>{label}</label>}
      {error && <span>{error}</span>}
    </S.Wrapper>
  );
};
