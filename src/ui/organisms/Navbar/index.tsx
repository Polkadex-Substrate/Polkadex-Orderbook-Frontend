import * as S from "./styles";

import { NavbarItem } from "@polkadex/orderbook-ui/molecules";
import { HeaderMarket } from "@polkadex/orderbook-ui/organisms";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";

export const Navbar = ({ onOpenMarkets }) => {
  const { selectGetAsset } = useAssetsProvider();
  const { currentMarket: currMarket, currentTicker } = useMarketsProvider();
  const quoteAsset = selectGetAsset(currMarket?.quoteAssetId);
  const currPrice = Number(currentTicker?.close).toFixed(2);
  const price_change_percent = Number(currentTicker?.priceChangePercent24Hr).toFixed(2) + "%";
  const isPriceChangeNegative = currentTicker?.priceChange24Hr < 0;
  const volume = Number(currentTicker?.volumeBase24hr).toFixed(2);
  const high = Number(currentTicker?.high).toFixed(2);
  const low = Number(currentTicker?.low).toFixed(2);

  return (
    <S.Wrapper>
      <S.WrapperInfo>
        <S.ContainerPair>
          <HeaderMarket
            id={currMarket?.id}
            pair={currMarket?.name}
            pairTicker={currMarket?.base_ticker}
            onOpenMarkets={onOpenMarkets}
          />
        </S.ContainerPair>
        <S.ContainerInfo>
          <NavbarItem
            label={`Price ${quoteAsset?.symbol?.length ? `(${quoteAsset?.symbol})` : ""}`}
            info={currPrice}
          />

          <NavbarItem
            label="Price % 24h"
            info={price_change_percent}
            color={isPriceChangeNegative ? "primary" : "green"}
          />
          <NavbarItem
            label={`Volume 24h ${quoteAsset?.symbol?.length ? `(${quoteAsset?.symbol})` : ""}`}
            info={volume}
          />

          <S.WrapperVolume>
            <S.ContainerVolume>
              <S.VolumeHigh>
                <span>24h High</span>
                <p>{high}</p>
              </S.VolumeHigh>
              <S.VolumeLow>
                <span>24h Low</span>
                <p>{low}</p>
              </S.VolumeLow>
            </S.ContainerVolume>
          </S.WrapperVolume>
        </S.ContainerInfo>
      </S.WrapperInfo>
    </S.Wrapper>
  );
};
