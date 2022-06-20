import * as S from "./styles";

import { AvailableMessage } from "@polkadex/orderbook-ui/molecules";

export type NavbarItemPops = {
  label?: string;
  info?: string | number;
  color?: "Red";
};
const NavbarItem = ({ label, info, color }: NavbarItemPops) => (
  <S.Wrapper>
    <S.Label>{label}</S.Label>
    <AvailableMessage message="Soon" color="secondaryBackgroundSolid" isVisible>
      <S.Info color={color}>{info}</S.Info>
    </AvailableMessage>
  </S.Wrapper>
);

export default NavbarItem;
