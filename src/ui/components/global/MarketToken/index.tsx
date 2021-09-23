import Dinero from "dinero.js";

import CoinIcon from "../CoinIcon";

import * as S from "./styles";

const MarketToken = ({ name, symbol, quote }) => {
  return (
    <S.Tr onClick={() => console.log("Change Coin")}>
      <S.Td>
        <S.ContainerCoin>
          <CoinIcon source={`/img/cryptocurrencies/${symbol}.png`} />
          <S.ContainerCoinName>
            <span> {name} </span>
            <S.Span> {symbol} </S.Span>
          </S.ContainerCoinName>
        </S.ContainerCoin>
      </S.Td>
      <S.Td>{Dinero({ amount: Math.round(quote.USD.price * 100) }).toFormat("$0,0.00")}</S.Td>

      <S.Td>
        <S.ContainerPricing>
          <S.PricingPercent>
            {Dinero({ amount: Math.round(quote.USD.volume_24h * 100) })
              .toFormat("$0,0")
              .toString()
              .slice(0, 6)}
          </S.PricingPercent>
          <S.PricingVolume negative={Math.sign(quote.USD.percent_change_24h) === -1}>
            {quote.USD.percent_change_24h.toString().slice(0, 4)}%
          </S.PricingVolume>
        </S.ContainerPricing>
      </S.Td>
    </S.Tr>
  );
};

export default MarketToken;
