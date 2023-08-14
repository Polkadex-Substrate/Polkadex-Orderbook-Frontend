import { useTranslation } from "react-i18next";

import * as S from "./styles";

import { NavbarItem } from "@polkadex/orderbook-ui/molecules";
import { HeaderMarket } from "@polkadex/orderbook-ui/organisms";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";
import { useRecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";
import { hasOnlyZeros } from "@polkadex/web-helpers";

export const Navbar = ({ onOpenMarkets }) => {
  const { getCurrentTradePrice } = useRecentTradesProvider();
  const currTrade = getCurrentTradePrice();
  const { selectGetAsset } = useAssetsProvider();
  const { currentMarket: currMarket, currentTicker } = useMarketsProvider();
  const quoteAsset = selectGetAsset(currMarket?.quoteAssetId);
  const currPrice = currentTicker?.close;
  const priceChangePerCent = (currentTicker?.priceChangePercent24Hr).toFixed(2) + "%";
  const isPriceChangeNegative = currentTicker?.priceChange24Hr < 0;
  const volume = currentTicker?.volumeBase24hr;
  const high = currentTicker?.high;
  const low = currentTicker?.low;

  const price = hasOnlyZeros(currPrice.toString()) ? currTrade : currPrice.toPrecision(2);

  const { t: translation } = useTranslation("organisms");
  const t = (key: string, args = {}) => translation(`navbar.${key}`, args);

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
            label={t("price", {
              price: quoteAsset?.symbol?.length ? `(${quoteAsset?.symbol})` : "",
            })}
            info={price}
          />

          <NavbarItem
            label={t("price%24h")}
            info={priceChangePerCent}
            color={isPriceChangeNegative ? "primary" : "green"}
          />
          <NavbarItem
            label={t("volume24hr", {
              volume: quoteAsset?.symbol?.length ? `(${quoteAsset?.symbol})` : "",
            })}
            info={volume}
          />

          <S.WrapperVolume>
            <S.ContainerVolume>
              <S.VolumeHigh>
                <span>{t("24hrhigh")}</span>
                <p>{high}</p>
              </S.VolumeHigh>
              <S.VolumeLow>
                <span>{t("24hrlow")}</span>
                <p>{low}</p>
              </S.VolumeLow>
            </S.ContainerVolume>
          </S.WrapperVolume>
        </S.ContainerInfo>
      </S.WrapperInfo>
    </S.Wrapper>
  );
};
