import { useState } from "react";

import DropdownItem from "../DropdownItem";

import * as S from "./styles";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";

type IPairs = {
  id: number;
  name: string;
};
export type NavbarPairProps = {
  coin?: string;
  pairs?: IPairs[];
};

const NavbarPair = ({ coin, pairs }: NavbarPairProps) => {
  const [state, setState] = useState("BTC");
  const handleChange = (select: string) => setState(select);

  return (
    <S.Wrapper>
      <S.WrapperCoin>
        <S.Label>Coin</S.Label>
        <S.Container>
          <S.Image src={`img/cryptocurrencies/${coin}.svg`} />
          <S.Name>{coin}</S.Name>
        </S.Container>
      </S.WrapperCoin>
      <S.WrapperExchange>
        <Icon name="Exchange" />
      </S.WrapperExchange>
      <S.WrapperCoin>
        <S.Label>Pair</S.Label>

        <Dropdown title={state}>
          <>
            {pairs.map(({ id, name }) => (
              <DropdownItem key={id} title={name} handleAction={handleChange} />
            ))}
          </>
        </Dropdown>
      </S.WrapperCoin>
    </S.Wrapper>
  );
};

export default NavbarPair;
