import * as S from "./styles";
import * as T from "./types";
export const SwitchFAQ = ({ id, name, checked, setChecked }: T.Props) => {
  return (
    <S.Label>
      <S.Input id={id} name={name} checked={checked} type="checkbox" onChange={setChecked} />
      <S.Switch>
        <S.Text checked={checked}>{checked ? "Yes" : "No"}</S.Text>
      </S.Switch>
    </S.Label>
  );
};
