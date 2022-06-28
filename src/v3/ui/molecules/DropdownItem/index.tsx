import * as S from "./styles";

export type DropdownItemProps = {
  title: number | string;
  handleAction: (select: number | string) => void;
};
const DropdownItem = ({ title, handleAction }: DropdownItemProps) => (
  <S.Wrapper onClick={() => handleAction(title)}>{title}</S.Wrapper>
);

export default DropdownItem;
