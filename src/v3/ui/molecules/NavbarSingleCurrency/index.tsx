import * as S from "./styles";
export type SingleCurrencyProps = {
  title: string;
};
const NavbarSingleCurrency = ({ title = "USD" }: SingleCurrencyProps) => (
  <S.WrapperSingleCurrency onClick={undefined}>{title}</S.WrapperSingleCurrency>
);

export default NavbarSingleCurrency;
