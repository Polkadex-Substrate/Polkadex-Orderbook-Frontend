import * as S from "./styles";

import { AvailableMessage, NavbarItem } from "@polkadex/orderbook-ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectCurrentMarket, selectCurrentMarketTickers } from "@polkadex/orderbook-modules";
import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";
import { HeaderMarket } from "@polkadex/orderbook-ui/organisms";

const Navbar = ({ onOpenMarkets }) => {
  const getAsset = useReduxSelector(selectGetAsset);
  const currMarket = useReduxSelector(selectCurrentMarket);
  const currentTickers = useReduxSelector(selectCurrentMarketTickers);
  const quoteAsset = getAsset(currMarket?.assetIdArray[1]);
  const currPrice = Number(currentTickers?.close).toFixed(2);
  const price_change_percent = Number(currentTickers?.priceChangePercent24Hr).toFixed(2) + "%";
  const isPriceChangeNegative = Number(currentTickers?.priceChange24Hr) < 0;
  const volume = Number(currentTickers?.volumeBase24hr).toFixed(2);
  const high = Number(currentTickers?.high).toFixed(2);
  const low = Number(currentTickers?.low).toFixed(2);
  return (
    <S.Wrapper>
      <S.WrapperInfo>
        <S.ContainerPair>
          <HeaderMarket
            pair={currMarket?.name}
            pairTicker={currMarket?.base_ticker}
            onOpenMarkets={onOpenMarkets}
          />
        </S.ContainerPair>
        <S.ContainerInfo>
          <NavbarItem label={`Price (${quoteAsset?.symbol})`} info={currPrice} />
          <AvailableMessage message="Soon">
            <NavbarItem
              label="Price % 24h"
              info={price_change_percent}
              color={isPriceChangeNegative ? "primary" : "green"}
            />
          </AvailableMessage>
          <NavbarItem label={`Volume 24h (${quoteAsset?.symbol})`} info={volume} />
          <AvailableMessage message="Soon">
            <S.WrapperVolume>
              <S.VolumeHigh>
                <span>24h High</span>
                <p>{high}</p>
              </S.VolumeHigh>
              <S.VolumeLow>
                <span>24h Low</span>
                <p>{low}</p>
              </S.VolumeLow>
            </S.WrapperVolume>
          </AvailableMessage>
        </S.ContainerInfo>
      </S.WrapperInfo>
    </S.Wrapper>
  );
};

export default Navbar;
