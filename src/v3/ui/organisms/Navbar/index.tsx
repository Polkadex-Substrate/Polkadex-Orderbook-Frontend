import NavbarItem from "../../molecules/NavbarItem";
import NavbarLanguage from "../../molecules/NavbarLanguage";

import * as S from "./styles";

import { HeaderMarket } from "@polkadex/orderbook/v2/ui/organisms";
import { AvailableMessage } from "@polkadex/orderbook-ui/molecules";

const Navbar = ({ onOpenMarkets }) => (
  <S.Wrapper>
    <S.WrapperInfo>
      <S.ContainerPair>
        <HeaderMarket pair="DOT" pairTicker="UDD" onOpenMarkets={onOpenMarkets} />
      </S.ContainerPair>
      <S.ContainerInfo>
        <NavbarItem label="Last Trade Price (BTC)" info="0.03209666" />
        <NavbarItem label="Price 24h" info="+52.47%" color="Red" />
        <NavbarItem label="Volume 24h (DOT)" info="71,459.80" />
        <S.WrapperVolume>
          <S.VolumeHigh isNegative>
            <span>24h High</span>
            <AvailableMessage message="Soon" color="secondaryBackgroundSolid" isVisible>
              <p>0.5020201</p>
            </AvailableMessage>
          </S.VolumeHigh>
          <S.VolumeLow>
            <span>24h High</span>
            <AvailableMessage message="Soon" color="secondaryBackgroundSolid" isVisible>
              <p>0.5020201</p>
            </AvailableMessage>
          </S.VolumeLow>
        </S.WrapperVolume>
      </S.ContainerInfo>
    </S.WrapperInfo>
    <S.WrapperLinks>
      <NavbarLanguage />
    </S.WrapperLinks>
  </S.Wrapper>
);

export default Navbar;
