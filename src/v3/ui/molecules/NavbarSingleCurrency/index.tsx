import * as S from "./styles";
export type SingleCurrencyProps = {
  title: string;
};
const NavbarSingleCurrency = ({ title = "USD" }: SingleCurrencyProps) => (
  <S.WrapperSingleCurrency onClick={() => console.log("Change Currency to", title)}>
    {title}
  </S.WrapperSingleCurrency>
);

export default NavbarSingleCurrency;
