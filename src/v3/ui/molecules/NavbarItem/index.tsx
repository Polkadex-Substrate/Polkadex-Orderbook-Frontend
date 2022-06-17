import * as S from "./styles";

export type NavbarItemPops = {
  label?: string;
  info?: string | number;
  color?: "Red";
};
const NavbarItem = ({ label, info, color }: NavbarItemPops) => (
  <S.Wrapper>
    <S.Label>{label}</S.Label>
    <S.Info color={color}>{info}</S.Info>
  </S.Wrapper>
);

export default NavbarItem;
