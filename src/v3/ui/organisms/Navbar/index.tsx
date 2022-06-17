import Link from "../../molecules/Link";
import NavbarDropdown from "../../molecules/NavbarDropdown";
import NavbarItem from "../../molecules/NavbarItem";
import NavbarLanguage from "../../molecules/NavbarLanguage";
import NavbarPair from "../../molecules/NavbarPair";

import * as S from "./styles";
const testPairs = [
  {
    id: 1,
    name: "BTC",
  },
  {
    id: 2,
    name: "USDT",
  },
  {
    id: 3,
    name: "DOT",
  },
  {
    id: 4,
    name: "ETH",
  },
];
const Navbar = () => (
  <S.Wrapper>
    <S.WrapperInfo>
      <S.ContainerPair>
        <NavbarPair coin="BTC" pairs={testPairs} />
      </S.ContainerPair>
      <S.ContainerInfo>
        <NavbarItem label="Last Trade Price (BTC)" info="0.03209666" />
        <NavbarItem label="Price 24h" info="+52.47%" color="Red" />
        <NavbarItem label="Volume 24h (DOT)" info="71,459.80" />
        <S.WrapperVolume>
          <S.VolumeHigh>
            <S.Span>24h High</S.Span>
            <p>0.5020201</p>
          </S.VolumeHigh>
          <S.VolumeLow>
            <S.Span>24h High</S.Span>
            <p>0.5020201</p>
          </S.VolumeLow>
        </S.WrapperVolume>
      </S.ContainerInfo>
    </S.WrapperInfo>
    <S.WrapperLinks>
      <Link title="Market" href="#" />
      <NavbarDropdown title="Trade">
        <>
          <S.WrapperDropdownContent href="#">
            <S.DropdownTitle>Title here</S.DropdownTitle>
            <S.DropdownDescription>
              Neque porro quisquam est qui dolorem ipsum.
            </S.DropdownDescription>
          </S.WrapperDropdownContent>
          <S.WrapperDropdownContent href="#">
            <S.DropdownTitle>Title here</S.DropdownTitle>
            <S.DropdownDescription>
              Neque porro quisquam est qui dolorem ipsum.
            </S.DropdownDescription>
          </S.WrapperDropdownContent>
        </>
      </NavbarDropdown>
      <NavbarDropdown title="Derivatives">
        <>
          <S.WrapperDropdownContent href="#">
            <S.DropdownTitle>Title here</S.DropdownTitle>
            <S.DropdownDescription>
              Neque porro quisquam est qui dolorem ipsum.
            </S.DropdownDescription>
          </S.WrapperDropdownContent>
          <S.WrapperDropdownContent href="#">
            <S.DropdownTitle>Title here</S.DropdownTitle>
            <S.DropdownDescription>
              Neque porro quisquam est qui dolorem ipsum.
            </S.DropdownDescription>
          </S.WrapperDropdownContent>
        </>
      </NavbarDropdown>
      <NavbarDropdown title="Finance">
        <>
          <S.WrapperDropdownContent href="#">
            <S.DropdownTitle>Title here</S.DropdownTitle>
            <S.DropdownDescription>
              Neque porro quisquam est qui dolorem ipsum.
            </S.DropdownDescription>
          </S.WrapperDropdownContent>
          <S.WrapperDropdownContent href="#">
            <S.DropdownTitle>Title here</S.DropdownTitle>
            <S.DropdownDescription>
              Neque porro quisquam est qui dolorem ipsum.
            </S.DropdownDescription>
          </S.WrapperDropdownContent>
          <S.WrapperDropdownContent href="#">
            <S.DropdownTitle>Title here</S.DropdownTitle>
            <S.DropdownDescription>
              Neque porro quisquam est qui dolorem ipsum.
            </S.DropdownDescription>
          </S.WrapperDropdownContent>
        </>
      </NavbarDropdown>
      <NavbarLanguage />
    </S.WrapperLinks>
  </S.Wrapper>
);

export default Navbar;
