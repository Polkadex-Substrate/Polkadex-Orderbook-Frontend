import * as S from "./styles";
import * as T from "./types";
export const SwitchFAQ = ({ checked, setChecked }: T.Props) => {
  return (
    <div>
      <S.CheckBoxWrapper onClick={setChecked}>
        <S.Checker checked={checked}></S.Checker>
        <S.Text checked={checked}>{checked ? "Yes" : "No"}</S.Text>
      </S.CheckBoxWrapper>
    </div>
  );
};
