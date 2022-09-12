import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";

export type NavbarDropdownProps = {
  title: string;
  children?: JSX.Element;
};

const NavbarDropdown = ({ title = "NavbarDropdown", children }: NavbarDropdownProps) => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.Wrapper></S.Wrapper>
        <S.Title>{title}</S.Title>
        <S.WrapperImage>
          <Icons.ArrowBottom stroke="white" />
        </S.WrapperImage>
      </S.Header>
      <S.WrapperContent className="animation">
        <S.ContainerContent>{children}</S.ContainerContent>
      </S.WrapperContent>
    </S.Wrapper>
  );
};

export default NavbarDropdown;
