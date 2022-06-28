import * as S from "./styles";
export type CheckboxPropx = {
  title: string;
  checked?: boolean;
  action?: () => void;
};

const Checkbox = ({ title, checked, action }: CheckboxPropx) => (
  <S.Label>
    <S.Input type="checkbox" checked={checked} onClick={action} />
    <S.Span></S.Span>
    <S.Title>{title}</S.Title>
  </S.Label>
);

export default Checkbox;
