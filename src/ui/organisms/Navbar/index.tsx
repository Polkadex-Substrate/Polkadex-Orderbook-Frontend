import * as S from "./styles";

import { NavbarItem } from "@polkadex/orderbook-ui/molecules";
import { HeaderMarket } from "@polkadex/orderbook-ui/organisms";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";

export const Navbar = ({ onOpenMarkets }) => {
  const { selectGetAsset } = useAssetsProvider();
  const { currentMarket: currMarket, currentTicker } = useMarketsProvider();
  const quoteAsset = selectGetAsset(currMarket?.quoteAssetId);
  const currPrice = currentTicker?.close;
  const priceChangePerCent = currentTicker?.priceChangePercent24Hr + "%";
  const isPriceChangeNegative = currentTicker?.priceChange24Hr < 0;
  const volume = currentTicker?.volumeBase24hr;
  const high = currentTicker?.high;
  const low = currentTicker?.low;

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
            info={priceChangePerCent}
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
