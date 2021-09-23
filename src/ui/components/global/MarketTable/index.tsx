import MarketToken from "../MarketToken";

import * as S from "./styles";

const MarketTable = ({ coins }) => (
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
        {coins &&
          coins.map((item) => (
            <MarketToken
              key={item.id}
              name={item.name}
              quote={item.quote}
              symbol={item.symbol}
            />
          ))}
      </S.Tbody>
    </S.Table>
  </S.Wrapper>
);

export default MarketTable;
