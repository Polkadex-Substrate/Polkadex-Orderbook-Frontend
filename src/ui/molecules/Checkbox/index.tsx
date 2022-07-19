import * as S from "./styles";
import Props from "./types";

export const Checkbox = ({ label, error, ...props }: Props) => {
  return (
    <S.Wrapper error={error}>
      <input type="checkbox" id={props.name} {...props} />
      {!!label && <label htmlFor={props.name}>{label}</label>}
    </S.Wrapper>
  );
};
