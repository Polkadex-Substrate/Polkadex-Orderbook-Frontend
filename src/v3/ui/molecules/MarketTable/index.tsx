import MarketToken from "../MarketToken";

import * as S from "./styles";

const MarketTable = () => (
  <S.Wrapper>
    <S.Table>
      <S.Thead>
        <S.Tr>
          <S.Th>Coin</S.Th>
          <S.Th>Pricing</S.Th>
          <S.Th>Volume 24h</S.Th>
        </S.Tr>
      </S.Thead>
      <S.Tbody>
        <MarketToken
          name="Bitcoin"
          shortName="BTC"
          source="BTC"
          pricing={10.411}
          volume={7.1}
          percent={23.09}
        />
        <MarketToken
          name="Aragon"
          shortName="AR"
          source="aragon"
          pricing={10.411}
          volume={7.1}
          percent={23.09}
        />
        <MarketToken
          name="Ethereum"
          shortName="ETH"
          source="ether"
          pricing={10.411}
          volume={7.1}
          percent={23.09}
        />
        <MarketToken
          name="Dogecoin"
          shortName="DOGE"
          source="DOGE"
          pricing={10.411}
          volume={7.1}
          percent={23.09}
        />
        <MarketToken
          name="Emercoin"
          shortName="EMR"
          source="emercoin"
          pricing={10.411}
          volume={7.1}
          percent={23.09}
        />
      </S.Tbody>
    </S.Table>
  </S.Wrapper>
);

export default MarketTable;
