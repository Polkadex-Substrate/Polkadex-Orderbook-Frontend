import NavbarSingleCurrency from "../NavbarSingleCurrency";
import NavbarSingleLanguage from "../NavbarSingleLanguage";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { AvailableMessage } from "@polkadex/orderbook-ui/molecules";

const NavbarLanguage = () => {
  return (
    <S.Wrapper>
      <AvailableMessage message="Soon">
        <S.Header>
          <S.WrapperFlag>
            <S.Image src="/img/EN.svg" />
          </S.WrapperFlag>
          <S.Title>EN/USD</S.Title>
          <S.WrapperImage>
            <Icons.ArrowBottom stroke="white" />
          </S.WrapperImage>
        </S.Header>
        {/* <S.WrapperContent className="animation">
          <S.ContainerContent>
            <S.WrapperCountry>
              <S.TitleLanguage>Language</S.TitleLanguage>
              <NavbarSingleLanguage title="English" flag="EN" />
              <NavbarSingleLanguage title="Français" flag="FR" />
              <NavbarSingleLanguage title="Español" flag="ES" />
              <NavbarSingleLanguage title="Deutsch" flag="DE" />
              <NavbarSingleLanguage title="Português" flag="PT" />
            </S.WrapperCountry>
            <S.WrapperCurrency>
              <S.TitleLanguage>Currency</S.TitleLanguage>
              <NavbarSingleCurrency title="USD" />
              <NavbarSingleCurrency title="EUR" />
              <NavbarSingleCurrency title="BRL" />
              <NavbarSingleCurrency title="CAD" />
            </S.WrapperCurrency>
          </S.ContainerContent>
        </S.WrapperContent> */}
      </AvailableMessage>
    </S.Wrapper>
  );
};

export default NavbarLanguage;
